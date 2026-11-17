'use strict';

const assert = require('assert').strict;
const path = require('path');
const { createRequire } = require('module');
const Hexo = require('hexo');
const requireFromIndex = createRequire(require.resolve('hexo-generator-index'));
const pagination = requireFromIndex('hexo-pagination');

async function check(legacyPlugin) {
  const hexo = new Hexo(path.resolve(__dirname, '..'), { silent: true });
  if (legacyPlugin) {
    // 模拟主力机的旧插件在加载阶段注册了写死根目录的生成器，不修改 node_modules。
    hexo.extend.filter.register('after_init', () => {
      hexo.extend.generator.register('index', function(locals) {
        return pagination('', locals.posts, { perPage: this.config.index_generator.per_page });
      });
    }, 5);
  }
  await hexo.init();
  hexo.config.index_generator = { path: 'posts', per_page: 2, order_by: '-date' };

  const entries = [
    { slug: 'latest', date: '2024-03-01' },
    { slug: 'top-old', date: '2021-01-01', top: 5 },
    { slug: 'top-new', date: '2022-01-01', top: 5 },
    { slug: 'sticky', date: '2020-01-01', sticky: 10 },
    { slug: 'regular', date: '2024-02-01', top: 100, sticky: 0 },
    { slug: 'draft', date: '2024-04-01', top: 100, published: false }
  ];
  await hexo.model('Post').insert(entries.map(post => ({
    ...post, title: post.slug, source: `_posts/AI/${post.slug}.md`
  })));
  hexo.locals.invalidate();
  const locals = hexo.locals.toObject();
  const before = locals.posts.map(post => post.path).sort();
  const routes = await hexo.extend.generator.get('index').call(hexo, locals);

  assert.deepEqual(routes.map(route => route.path), ['posts/', 'posts/page/2/', 'posts/page/3/']);
  assert.equal(routes[0].data.next_link, 'posts/page/2/');
  assert.equal(routes[1].data.prev_link, 'posts/');
  const listed = routes.flatMap(route => route.data.posts.toArray());
  assert.deepEqual(listed.map(post => post.slug), ['latest', 'regular', 'top-new', 'top-old', 'sticky']);
  assert.deepEqual(listed.map(post => post.path).sort(), before);

  const navigation = await hexo.extend.generator.get('notebooks').call(hexo, locals);
  assert(navigation.some(route => route.path === 'index.html'));
  assert(navigation.some(route => route.path === 'page/2/index.html' && route.data.includes('posts')));
  const routePaths = routes.concat(navigation).map(route => hexo.route.format(route.path));
  assert.equal(new Set(routePaths).size, routePaths.length, '导航、原分页跳转与文章列表不能覆盖彼此');
  console.log(`PASS: ${legacyPlugin ? '旧置顶插件' : '官方插件'}下的列表路径、分页、日期排序、草稿过滤及文章地址`);
}

(async () => {
  await check(false);
  await check(true);
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
