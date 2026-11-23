/* global hexo */
'use strict';
// {% friendlinks %} -> Shoka's .links cards from source/_data/friends.yml, with plain <a> links and
// CSS background avatars (Shoka's own {% links %} emits JavaScript-only exturl spans, which this site disables).
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const esc = value => String(value ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

hexo.extend.tag.register('friendlinks', () => {
  const list = yaml.load(fs.readFileSync(path.join(hexo.source_dir, '_data/friends.yml'), 'utf8')) || [];
  const items = list.map(f =>
    `<div class="item" title="${esc(f.site)}" style="--block-color:${esc(f.color || '#666')}">` +
    `<a href="${esc(f.url)}" class="image" aria-label="${esc(f.site)}" style="background-image:url('${esc(f.image)}')"></a>` +
    `<div class="info"><a href="${esc(f.url)}" class="title">${esc(f.site)}</a><p class="desc">${esc(f.desc || f.url)}</p></div></div>`);
  return `<div class="links">${items.join('')}</div>`;
});
