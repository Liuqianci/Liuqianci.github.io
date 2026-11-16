'use strict';

const assert = require('assert').strict;
const path = require('path');
const Hexo = require('hexo');
const dataProcessor = require('hexo/lib/plugins/processor/data');

async function main() {
  const hexo = new Hexo(path.resolve(__dirname, '..'), { silent: true });
  await hexo.init();
  const processor = dataProcessor(hexo);
  const settings = hexo.render.renderSync({ path: path.join(hexo.source_dir, '_data/notebooks.yml') });

  async function processFile(name, type = 'update') {
    await processor.process({
      type,
      params: { path: name },
      render: () => hexo.render.render({ path: path.join(hexo.source_dir, '_data', name) })
    });
    hexo.locals.invalidate();
  }

  function assertConfigLoaded() {
    assert.deepEqual(hexo.locals.get('data').notebooks, settings);
  }

  async function assertNavigationGenerated() {
    const routes = await hexo.extend.generator.list().notebooks.call(hexo, hexo.locals.toObject());
    assert(routes.some(route => route.path === 'index.html'));
    const topics = routes.filter(route => route.data && route.data.notebook);
    assert.deepEqual(topics.map(route => route.data.notebook.id), settings.topics.map(topic => topic.id));
  }

  // 使用真实的 Hexo 数据处理器，验证两种文件加载顺序都不再互相覆盖。
  await processFile('notebooks.yml');
  await processFile('notebook-navigation.styl');
  assertConfigLoaded();
  await assertNavigationGenerated();
  await processFile('notebook-navigation.styl');
  await processFile('notebooks.yml');
  assertConfigLoaded();

  // 模拟旧版本把样式写入 notebooks 缓存；更新后无需先执行 hexo clean。
  await hexo.model('Data').save({ _id: 'notebooks', data: '.notebook-page { display: block; }' });
  hexo.locals.invalidate();
  assert.equal(typeof hexo.locals.get('data').notebooks, 'string');
  await assertNavigationGenerated();

  // 旧样式文件删除时，Hexo 会删除同名数据记录，也不能影响导航生成。
  await processFile('notebooks.styl', 'delete');
  assert.equal(hexo.locals.get('data').notebooks, undefined);
  await assertNavigationGenerated();

  console.log('PASS: 两种加载顺序、旧样式缓存及旧文件删除均不影响导航生成');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
