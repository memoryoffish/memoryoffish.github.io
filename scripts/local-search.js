'use strict';
const { stripHTML } = require('hexo-util');
hexo.extend.generator.register('local-search', locals => ({
  path: 'search.json',
  data: JSON.stringify(locals.posts.sort('-date').map(post => ({
    title: post.title,
    url: '/' + post.path.replace(/index\.html$/, ''),
    content: stripHTML(post.content)
  })))
}));
hexo.extend.generator.register('json-feed', locals => ({
  path: 'feed.json',
  data: JSON.stringify({
    version: 'https://jsonfeed.org/version/1.1',
    title: hexo.config.title, home_page_url: hexo.config.url,
    feed_url: hexo.config.url + '/feed.json',
    items: locals.posts.sort('-date').map(post => ({
      id: post.permalink, url: post.permalink, title: post.title,
      content_html: post.content, date_published: post.date.toISOString(),
      date_modified: post.updated.toISOString()
    }))
  })
}));
