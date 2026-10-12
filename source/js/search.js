(() => {
  const input = document.getElementById('search-input');
  const status = document.getElementById('search-status');
  const list = document.getElementById('search-results');
  let articles;
  const search = () => {
    if (!articles) return;
    list.replaceChildren();
    const terms = input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) { status.textContent = '输入关键词，搜索文章标题与正文。'; return; }
    const matches = articles.filter(article => terms.every(term => (article.title + ' ' + article.content).toLocaleLowerCase().includes(term))).slice(0, 30);
    status.textContent = matches.length ? `找到 ${matches.length} 篇文章。` : '没有找到相关文章，试试其他关键词。';
    for (const article of matches) {
      const item = document.createElement('li'); const link = document.createElement('a');
      link.textContent = article.title; link.href = article.url;
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
    articles = data; input.disabled = false; search();
  }).catch(() => { status.textContent = '搜索暂时不可用，请刷新页面重试，或按归档浏览。'; });
})();
