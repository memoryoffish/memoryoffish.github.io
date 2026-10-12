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
