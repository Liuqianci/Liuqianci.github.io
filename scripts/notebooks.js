'use strict';

const fs = require('fs');
const path = require('path');
const { escapeHTML } = require('hexo-util');
const collator = new Intl.Collator('zh-CN', { numeric: true });

// 使用 NexT 的布局与组件，自定义模板留在站点目录，避免修改主题源码。
hexo.extend.filter.register('before_generate', () => {
  hexo.theme.setView('notebook.swig', fs.readFileSync(
    path.join(hexo.base_dir, 'layouts/notebook.swig'), 'utf8'
  ));
});

function relativeSource(post) {
  return post.source.replace(/\\/g, '/').replace(/^_posts\//, '').replace(/\.[^.]+$/, '');
}

function matchIndex(post, paths) {
  const source = relativeSource(post);
  return paths.findIndex(item => item.endsWith('/') ? source.startsWith(item) : source === item);
}

hexo.extend.generator.register('notebooks', function(locals) {
  // 直接读取配置，兼容旧缓存中残留的同名样式数据及旧文件删除时的数据清理。
  const settings = this.render.renderSync({ path: path.join(this.source_dir, '_data/notebooks.yml') });
  if (!settings || !Array.isArray(settings.topics)) {
    throw new Error('笔记导航缺少 source/_data/notebooks.yml 中的 topics 配置');
  }

  const posts = locals.posts.toArray().filter(post => post.published !== false);
  const included = new Set();
  const topics = settings.topics.map(topic => {
    const topicPosts = posts.filter(post => matchIndex(post, topic.paths) >= 0);
    const remaining = new Set(topicPosts);
    const sections = topic.sections.map(section => {
      const selected = topicPosts.filter(post => remaining.has(post) && matchIndex(post, section.paths) >= 0 &&
        (!section.exclude || matchIndex(post, section.exclude) < 0));
      selected.sort((a, b) => matchIndex(a, section.paths) - matchIndex(b, section.paths) || collator.compare(a.title, b.title));
      selected.forEach(post => remaining.delete(post));
      return { id: section.id, title: section.title, posts: selected };
    }).filter(section => section.posts.length);

    // 专题目录中新增的文件即使还没分小节，也不会从目录漏掉。
    if (remaining.size) {
      sections.push({ id: 'other', title: '其他笔记', posts: [...remaining].sort((a, b) => collator.compare(a.title, b.title)) });
    }
    topicPosts.forEach(post => included.add(post));
    return { ...topic, path: `topics/${topic.id}/`, count: topicPosts.length, sections, shortcuts: sections.slice(0, 3) };
  });

  const unlisted = posts.filter(post => !included.has(post));
  if (unlisted.length) {
    hexo.log.warn(`以下文章尚未归入首页专题，仍可在文章时间线中访问：${unlisted.map(post => post.source).join('、')}`);
  }

  const common = { __page: true, comments: false, toc: { enable: false }, notebooks: topics };
  const routes = [{
    path: 'index.html',
    layout: 'notebook',
    // NexT 和 MathJax 的首页钩子会读取 posts；导航页不展开任何文章。
    data: { ...common, __index: true, current: 1, posts: locals.posts.limit(0), title: '笔记导航', description: '按专题查找技术笔记与生活备忘。' }
  }];
  topics.forEach(topic => routes.push({
    path: `${topic.path}index.html`,
    layout: 'notebook',
    data: { ...common, title: topic.title, description: topic.description, notebook: topic }
  }));

  // 旧技术索引和原首页分页保留跳转；文章自身的 path 完全不变。
  const redirect = (from, target) => {
    const href = escapeHTML(this.config.root + target);
    const canonical = escapeHTML(this.config.url.replace(/\/$/, '') + '/' + target);
    routes.push({ path: from, data: `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${href}"><link rel="canonical" href="${canonical}"><title>页面已迁移</title></head><body><p>页面已迁移，<a href="${href}">点击继续访问</a>。</p></body></html>` });
  };
  redirect('notes/index.html', '');
  const perPage = this.config.index_generator.per_page;
  const paginationDir = this.config.pagination_dir || 'page';
  for (let page = 2; perPage > 0 && page <= Math.ceil(posts.length / perPage); page++) {
    redirect(`${paginationDir}/${page}/index.html`, `posts/${paginationDir}/${page}/`);
  }
  return routes;
});
