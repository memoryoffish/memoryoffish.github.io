'use strict';
// Modern build-time Markdown, Prism and MathML. No browser rendering libraries.
const moduleMD = require('markdown-it');
const MarkdownIt = moduleMD.default || moduleMD;
const attrsModule = require('markdown-it-attrs');
const katex = require('katex');
const Prism = require('prismjs');
require('prismjs/components/')( ['nasm', 'sql', 'python', 'bash'] );

const md = new MarkdownIt({
  html: false, breaks: false, linkify: true,
  highlight(code, language) {
    const lang = language === 'asm' ? 'nasm' : language;
    return Prism.languages[lang] ? Prism.highlight(code, Prism.languages[lang], lang) : '';
  }
}).use(attrsModule.default || attrsModule);

function math(text, displayMode) {
  return katex.renderToString(text, { output: 'mathml', displayMode, throwOnError: true, strict: 'error', trust: false });
}

md.inline.ruler.before('escape', 'inline_math', (state, silent) => {
  if (!state.src.startsWith('\\(', state.pos)) return false;
  const end = state.src.indexOf('\\)', state.pos + 2);
  if (end < 0) return false;
  if (!silent) {
    const token = state.push('math_inline', '', 0);
    token.content = state.src.slice(state.pos + 2, end);
  }
  state.pos = end + 2;
  return true;
});
md.renderer.rules.math_inline = (tokens, index) => math(tokens[index].content, false);
md.block.ruler.before('fence', 'block_math', (state, start, end, silent) => {
  const first = state.src.slice(state.bMarks[start] + state.tShift[start], state.eMarks[start]).trim();
  const open = first.startsWith('$$') ? '$$' : first.startsWith('\\[') ? '\\[' : null;
  if (!open) return false;
  const close = open === '$$' ? '$$' : '\\]';
  if (silent) return true;
  const parts = [first.slice(2)];
  let line = start;
  if (!parts[0].endsWith(close)) {
    for (line = start + 1; line < end; line++) {
      const text = state.src.slice(state.bMarks[line], state.eMarks[line]).trimEnd();
      parts.push(text);
      if (text.endsWith(close)) break;
    }
  }
  if (line >= end) throw new Error('Unclosed block math delimiter');
  parts[parts.length - 1] = parts.at(-1).slice(0, -2);
  const token = state.push('math_block', 'div', 0);
  token.content = parts.join('\n');
  token.map = [start, line + 1];
  state.line = line + 1;
  return true;
});
md.renderer.rules.math_block = (tokens, index) => '<div class="math-block">' + math(tokens[index].content, true) + '</div>\n';
md.core.ruler.push('heading_ids', state => {
  const ids = new Set();
  for (let i = 0; i < state.tokens.length; i++) {
    const token = state.tokens[i];
    if (token.type !== 'heading_open' || token.attrGet('id')) continue;
    const label = state.tokens[i + 1].content;
    const base = label.trim().replace(/\s+/g, '-').replace(/[<>"']/g, '') || 'section';
    let id = base, number = 2;
    while (ids.has(id)) id = base + '-' + number++;
    ids.add(id);
    token.attrSet('id', id);
  }
});
const defaultImage = md.renderer.rules.image;
md.renderer.rules.image = (tokens, index, options, env, renderer) => {
  tokens[index].attrSet('loading', 'lazy');
  tokens[index].attrSet('decoding', 'async');
  return defaultImage(tokens, index, options, env, renderer);
};
hexo.extend.renderer.register('md', 'html', data => md.render(data.text), true);
hexo.extend.renderer.register('markdown', 'html', data => md.render(data.text), true);
