'use strict';

// 过滤器同步解析 HTML，遇到 &emsp; 等命名实体时无法等待 MathJax 按需加载。
// 从过滤器自身解析依赖，兼容 npm 和 cnpm 的 node_modules 布局。
const { createRequire } = require('module');
const requireFromFilter = createRequire(require.resolve('hexo-filter-mathjax'));
requireFromFilter('mathjax-full/js/util/entities/all.js');
