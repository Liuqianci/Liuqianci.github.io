本人的电子笔记

## 在 Windows 新电脑上写博客

用 Git 克隆本仓库的 `Hexo` 分支后，在仓库根目录的 CMD 运行一次：

```bat
setup-blog.cmd
```

脚本优先使用已有的 Node.js 和 Pandoc。缺少工具时通过 WinGet 安装 Node.js 24.14.1（含 npm）或 Pandoc 3.2，然后用 `npm ci` 按仓库的锁文件安装依赖并生成博客。首次安装需要联网。没有 WinGet 的电脑可先手动安装这两项工具，再运行同一脚本。

日常在 `source/_posts` 写 Markdown，运行 `npm run server` 即可在 <http://localhost:4000> 预览。运行 `npm run build` 可重新生成 `public`。这些命令使用项目自带的 Hexo。已有全局 Hexo 的机器也可以继续使用 `hexo g` 和 `hexo s`。

源码提交到 `Hexo` 分支。发布时运行 `npm run deploy`，部署目标为 `master` 分支，首次发布前需在该电脑配置有仓库写权限的 GitHub SSH 密钥。
