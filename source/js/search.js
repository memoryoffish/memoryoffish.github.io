(() => {
  const input = document.getElementById('search-input');
  const status = document.getElementById('search-status');
  const list = document.getElementById('search-results');
  let entries;
  const search = () => {
    if (!entries) return;
    list.replaceChildren();
    const terms = input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) { status.textContent = '输入关键词，搜索研究项目与个人介绍。'; return; }
    const matches = entries.filter(entry => terms.every(term => (entry.title + ' ' + entry.content).toLocaleLowerCase().includes(term))).slice(0, 30);
    status.textContent = matches.length ? `找到 ${matches.length} 个结果。` : '没有找到相关内容，试试其他关键词。';
    for (const entry of matches) {
      const item = document.createElement('li'); const link = document.createElement('a');
      link.textContent = entry.title; link.href = entry.url;
      item.appendChild(link); list.appendChild(item);
    }
  };
  input.addEventListener('input', search);
  input.addEventListener('keydown', event => { if (event.key === 'Escape') { input.value = ''; search(); } });
  fetch('/search.json').then(response => {
    if (!response.ok) throw new Error('Search unavailable');
    return response.json();
  }).then(data => {
    if (!Array.isArray(data)) throw new Error('Invalid search data');
    entries = data; input.disabled = false; search();
  }).catch(() => { status.textContent = '搜索暂时不可用，请刷新页面重试，或浏览项目页。'; });
})();
