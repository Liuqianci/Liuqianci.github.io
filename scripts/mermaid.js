'use strict';

// Hexo 6 puts the language on <code>. NexT 7 looks for <pre class="mermaid">.
hexo.extend.filter.register('after_post_render', function (post) {
  post.content = post.content.replace(
    /<pre><code class="highlight mermaid">([\s\S]*?)<\/code><\/pre>/g,
    '<pre class="mermaid">$1</pre>'
  );
  return post;
}, 8);
