#!/usr/bin/env python3
"""Check the generated site's reading, migration and local-asset contracts."""
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
    required = ['index.html', 'search/index.html', 'archives/index.html', 'search.json', 'atom.xml', 'rss.xml',
                '2024/04/28/mips/index.html', '2025/02/18/数据库/index.html', 'pdfs/mips.pdf']
    for name in required:
        if not (PUBLIC / name).is_file():
            errors.append(f'Missing migrated route or asset: {name}')
    mips = pages.get(PUBLIC / '2024/04/28/mips/index.html')
    if not mips or mips.math != 15:
        errors.append(f'Expected 15 rendered formulas, got {mips.math if mips else 0}')
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
    if not any('SQL 基础笔记' == item.get('title') for item in index):
        errors.append('SQL article missing from search index')
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
    print(f'PASS: {len(pages)} HTML pages; old routes and PDF; 15 MathML formulas; local assets; no audio.')
    print(f'Home resource files: {len(initial)}, {bytes_raw:,} bytes raw, {bytes_gzip:,} bytes gzip estimate.')
    print('Browser behavior, actual transfer sizes, mobile layout and deployed latency require separate verification.')


if __name__ == '__main__':
    main()
