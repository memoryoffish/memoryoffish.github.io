(() => {
  document.body.classList.add('js-enabled');
  const toggle = document.getElementById('sidebar-toggle');
  const setSidebar = open => {
    document.body.classList.toggle('sidebar-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? '关闭侧栏' : '打开侧栏');
  };
  toggle?.addEventListener('click', () => setSidebar(!document.body.classList.contains('sidebar-open')));
  document.querySelector('.dimmer')?.addEventListener('click', () => setSidebar(false));
  document.querySelectorAll('#sidebar a').forEach(link => link.addEventListener('click', () => setSidebar(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setSidebar(false); });
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const html = document.documentElement;
    const dark = html.getAttribute('data-theme') !== 'dark';
    if (dark) html.setAttribute('data-theme', 'dark');
    else html.removeAttribute('data-theme');
    try { localStorage.setItem('shoka-theme', dark ? 'dark' : 'light'); } catch (_) {}
  });
  document.querySelectorAll('.post pre').forEach(pre => {
    if (pre.closest('.gutter')) return;
    const code = pre.querySelector('code') || pre;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'copy-code'; button.textContent = '复制'; button.setAttribute('aria-label', '复制代码');
    button.addEventListener('click', async () => {
      const text = code === pre ? [...pre.childNodes].filter(node => node !== button).map(node => node.textContent).join('') : code.textContent;
      try { await navigator.clipboard.writeText(text); button.textContent = '已复制'; }
      catch (_) { button.textContent = '请手动复制'; }
      setTimeout(() => { button.textContent = '复制'; }, 2000);
    });
    pre.appendChild(button);
  });
})();
// Promo card under the introduction: the video is created only when clicked (nothing loads before that).
document.querySelectorAll('.promo-card button').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.parentElement;
    const video = document.createElement('video');
    video.src = card.dataset.src;
    video.controls = true;
    video.playsInline = true;
    card.replaceChildren(video);
    video.play().catch(() => {});
  });
});
// Giscus comments under posts: client.js loads only when the comment area comes near the viewport,
// and the widget follows the site's light / dark toggle.
(() => {
  const box = document.querySelector('#comments[data-repo-id]');
  if (!box) return;
  const theme = () => (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  const load = () => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    const attrs = {
      repo: box.dataset.repo, 'repo-id': box.dataset.repoId,
      category: box.dataset.category, 'category-id': box.dataset.categoryId,
      mapping: 'pathname', strict: '1', 'reactions-enabled': '1', 'emit-metadata': '0',
      'input-position': 'top', theme: theme(), lang: 'zh-CN', loading: 'lazy',
    };
    Object.entries(attrs).forEach(([key, value]) => script.setAttribute('data-' + key, value));
    box.appendChild(script);
  };
  new IntersectionObserver((entries, observer) => {
    if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); load(); }
  }, { rootMargin: '600px 0px' }).observe(box);
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    box.querySelector('iframe.giscus-frame')?.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme() } } }, 'https://giscus.app');
  });
})();
