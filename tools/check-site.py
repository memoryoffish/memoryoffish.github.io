#!/usr/bin/env python3
"""Check published research content, withdrawn routes and local assets."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import gzip
import json

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
HOST = 'memoryoffish.github.io'
# Independently published GitHub Pages project, verified outside this blog repo.
PROJECT_SITES = {'https://memoryoffish.github.io/atas_demo/'}


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.resources = []
        self.ids = set()
        self.audio = 0
        self.math = 0
        self.unresolved_images = 0
        self.encoded_links = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        self.audio += tag == 'audio'
        self.math += tag == 'math'
        self.unresolved_images += tag == 'img' and not attrs.get('src')
        self.encoded_links += tag == 'span' and 'exturl' in attrs.get('class', '').split()
        if tag == 'a' and attrs.get('href'):
            self.links.append(attrs['href'])
        if tag in ('script', 'img', 'iframe', 'source', 'video') and attrs.get('src'):
            self.resources.append(attrs['src'])
        if tag == 'link' and set(attrs.get('rel', '').split()) & {'stylesheet', 'icon', 'preload', 'apple-touch-icon', 'mask-icon'}:
            self.resources.append(attrs.get('href', ''))


def local_target(url, page):
    if url in PROJECT_SITES:
        return None
    parts = urlsplit(url)
    if parts.scheme and parts.scheme not in ('http', 'https'):
        return None
    if parts.netloc and parts.netloc != HOST:
        return None
    path = unquote(parts.path)
    target = PUBLIC / path.lstrip('/') if path.startswith('/') else page.parent / path
    if not path:
        return page
    return target / 'index.html' if target.is_dir() else target


def main():
    errors = []
    pages = {}
    for path in PUBLIC.rglob('*.html'):
        parser = Page()
        parser.feed(path.read_text())
        pages[path] = parser
        if parser.audio:
            errors.append(f'Audio player: {path.relative_to(PUBLIC)}')
        if parser.unresolved_images or parser.encoded_links:
            errors.append(f'Legacy JavaScript-only images/links: {path.relative_to(PUBLIC)}')
        for url in parser.resources:
            if urlsplit(url).netloc and urlsplit(url).netloc != HOST:
                errors.append(f'External resource: {path.relative_to(PUBLIC)} -> {url}')
        for url in parser.links + parser.resources:
            target = local_target(url, path)
            if target is not None and not target.exists():
                errors.append(f'Broken local link: {path.relative_to(PUBLIC)} -> {url}')
    required = ['index.html', 'projects/index.html', 'about/index.html', 'search/index.html',
                'search.json', 'feed.json', 'projects/gen-rsi.svg']
    for name in required:
        if not (PUBLIC / name).is_file():
            errors.append(f'Missing published route or asset: {name}')
    withdrawn = ['2024/04/28/mips', '2025/02/18/数据库', 'pdfs/mips.pdf',
                 'images/mips-cover.svg', 'images/mips-floating-range.png', 'images/sql-cover.svg',
                 'projects/game24-grpo.svg', 'archive']
    for name in withdrawn:
        if (PUBLIC / name).exists():
            errors.append(f'Withdrawn content is still published: {name}')
    forbidden = ('计原笔记', 'SQL 基础笔记', '用 GRPO 训练模型解 24 点',
                 'nlp_grpo', 'game24-grpo', '/2024/04/28/mips/', '/2025/02/18/数据库/', '/pdfs/mips.pdf')
    for path in PUBLIC.rglob('*'):
        if path.is_file() and path.suffix in ('.html', '.json', '.xml'):
            content = path.read_text()
            for term in forbidden:
                if term in content:
                    errors.append(f'Withdrawn content reference: {path.relative_to(PUBLIC)} -> {term}')
    for name in ('index.html', 'projects/index.html', 'about/index.html'):
        page = pages.get(PUBLIC / name)
        if page is None or 'https://openreview.net/forum?id=noC2O6ZFgM' not in page.links:
            errors.append(f'Gen-RSI OpenReview link missing from {name}')
        if page is not None and not all(term in (PUBLIC / name).read_text() for term in ('ATAS', 'ReCA', 'Gen-RSI')):
            errors.append(f'Research project missing from {name}')
    stylesheet = PUBLIC / 'css/app.css'
    if not stylesheet.exists() or stylesheet.stat().st_size < 1000:
        errors.append('Shoka stylesheet was not compiled successfully')
    home = pages[PUBLIC / 'index.html']
    if any('fuse' in url.lower() or 'search' in url.lower() for url in home.resources):
        errors.append('Home page loads the search bundle')
    for css in PUBLIC.rglob('*.css'):
        text = css.read_text()
        if '@import' in text or '@font-face' in text:
            errors.append(f'Unexpected font/import dependency: {css.relative_to(PUBLIC)}')
    index = json.loads((PUBLIC / 'search.json').read_text())
    if not any(item.get('url') == '/projects/' and 'Gen-RSI' in item.get('content', '') for item in index):
        errors.append('Gen-RSI project missing from search index')
    if not any(item.get('url') == '/about/' for item in index):
        errors.append('Personal introduction missing from search index')
    initial = {PUBLIC / 'index.html'}
    for url in home.resources:
        target = local_target(url, PUBLIC / 'index.html')
        if target and target.is_file():
            initial.add(target)
    bytes_raw = sum(p.stat().st_size for p in initial)
    bytes_gzip = sum(len(gzip.compress(p.read_bytes())) for p in initial)
    if bytes_gzip > 80_000:
        errors.append(f'Initial HTML/CSS/icons exceed 80 kB gzip budget: {bytes_gzip}')
    if errors:
        raise SystemExit('\n'.join(errors))
    print(f'PASS: {len(pages)} HTML pages; Gen-RSI links; withdrawn course content absent; search; local assets; no audio.')
    print(f'Home resource files: {len(initial)}, {bytes_raw:,} bytes raw, {bytes_gzip:,} bytes gzip estimate.')
    print('Browser behavior, actual transfer sizes, mobile layout and deployed latency require separate verification.')


if __name__ == '__main__':
    main()
