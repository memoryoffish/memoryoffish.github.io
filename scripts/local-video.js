/* global hexo */
'use strict';
// {% localvideo /path/to.mp4 /path/to/poster.jpg %} -> native <video>: controls, no autoplay, no preload.
const attr = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

hexo.extend.tag.register('localvideo', ([src, poster]) =>
  `<video controls preload="none" playsinline style="width:100%;height:auto" src="${attr(src)}"` +
  (poster ? ` poster="${attr(poster)}"` : '') + '></video>');
