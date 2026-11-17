'use strict';

const { createRequire } = require('module');
const requireFromIndex = createRequire(require.resolve('hexo-generator-index'));
const pagination = requireFromIndex('hexo-pagination');

// 插件加载完成后统一注册，让输出路径随仓库同步，不依赖 node_modules 中的旧置顶改动。
hexo.extend.filter.register('after_init', () => {
  hexo.extend.generator.register('index', function(locals) {
    const config = this.config;
    const options = config.index_generator;
    // 文章列表按配置的日期顺序排列，忽略旧文章中的 top 置顶字段。
    const posts = locals.posts.sort(options.order_by || '-date');

    return pagination(options.path || '', posts, {
      perPage: options.per_page,
      layout: ['index', 'archive'],
      format: (config.pagination_dir || 'page') + '/%d/',
      data: { __index: true }
    });
  });
});
