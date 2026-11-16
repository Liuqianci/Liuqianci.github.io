'use strict';

// 从 NexT 的邮箱链接读取地址，配置中只需维护一份邮箱。
(() => {
  document.querySelectorAll('.links-of-author a[href^="mailto:"]').forEach((link, index) => {
    const address = decodeURIComponent(link.getAttribute('href').slice(7).split('?')[0]);
    if (!address) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'email-copy-button';
    button.title = `复制邮箱：${address}`;

    const icon = link.querySelector('i');
    if (icon) {
      const copyIcon = icon.cloneNode(true);
      copyIcon.setAttribute('aria-hidden', 'true');
      button.append(copyIcon);
    }
    const text = document.createElement('span');
    text.textContent = '复制邮箱';
    text.setAttribute('aria-live', 'polite');
    button.append(text);

    const fallback = document.createElement('div');
    fallback.className = 'email-copy-fallback';
    fallback.id = `email-copy-fallback-${index}`;
    fallback.hidden = true;
    const label = document.createElement('label');
    label.textContent = '未能自动复制，请手动复制：';
    const input = document.createElement('input');
    input.type = 'text';
    input.readOnly = true;
    input.value = address;
    input.id = `email-copy-address-${index}`;
    label.htmlFor = input.id;
    fallback.append(label, input);
    button.setAttribute('aria-controls', fallback.id);
    button.setAttribute('aria-expanded', 'false');
    link.closest('.links-of-author').append(fallback);
    link.replaceWith(button);

    let copying = false;
    let resetTimer;
    button.addEventListener('click', async () => {
      if (copying) return;
      copying = true;
      clearTimeout(resetTimer);
      text.textContent = '复制中…';
      delete button.dataset.copyState;
      try {
        // 不读取剪贴板；只有写入成功后才提示“已复制”。
        await navigator.clipboard.writeText(address);
        fallback.hidden = true;
        button.setAttribute('aria-expanded', 'false');
        text.textContent = '已复制';
        button.dataset.copyState = 'copied';
        resetTimer = setTimeout(() => {
          text.textContent = '复制邮箱';
          delete button.dataset.copyState;
        }, 2000);
      } catch (_) {
        text.textContent = '复制邮箱';
        fallback.hidden = false;
        button.setAttribute('aria-expanded', 'true');
        input.focus({preventScroll: true});
        input.select();
      } finally {
        copying = false;
      }
    });
  });
})();
