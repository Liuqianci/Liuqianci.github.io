---
title: Hexo博客搭建与部署
date: 2022-02-04 20:06:58
tags:
    - Hexo
categories:
    - Hexo
---

Hexo是一个快速，简单而强大的博客框架，使用Markdown语言编写文章，Hexo可以在几秒钟内生成具有美丽主题的静态页面文件。

# 一、环境搭建

## 1、Node.js
Node.js是基于Chrome JavaScript运行时建立的一个平台，npm是node.js的包管理工具。Hexo是基于Node.js的，使用Hexo搭建博客，就需要本地有Node.js环境。Node.js环境点击[这里](https://nodejs.org/zh-cn/)，一路next。安装完成后可以用命令行查看版本号。

```C
node -v //查看node.js的版本

npm -v  //查看包管理器的版本
```

由于国内环境使用npm速度感人，可以安装cnpm，把镜像源换成淘宝的
```C
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

之后可以命令行输入cnpm，如果能打出帮助界面表示安装成功。


## 2、Git
git的相关配置不在此赘述。hexo的很多操作都要依赖于git

## 3、Hexo
Hexo依托于npm包管理器，我们可以直接下载
```C
cnpm install -g hexo-cli
```
-g命令是在全局安装Hexo命令行工具。当安装完成后，我们可以查看hexo版本来检查是否安装成功
```C
hexo -v    //查看Hexo版本
```

# 二、博客搭建
首先我们新建一个存放博客的文件目录。之后我们的操作全部在此目录下。如果之后我们搭建错误想要从头再来，直接删掉这个目录新建一个即可。

然后我们初始化hexo
```C
hexo init
```
初始化后，文件目录下面就会自动生成hexo的基础框架，后续博客都是基于这个框架来做。

之后安装hexo的依赖组件
```C
cnpm install
```

目前目录下面有如下几个部分：
- node_modules：存的是利用【npm install --save】下载安装的组件
- scaffolds：存放模板文件，可以创建post、page、draft三种页面
- source：存放用户资源，即我们的待发布文档
- themes：存放主题文件夹，默认landspace
- _config.yml：此文件很重要，是我们网站的配置信息
- package.json：应用程序的信息

此时会自动生成一篇Helloworld的博客，我们可以启动博客来看看效果。
```C
hexo clean      //清空缓存，即清空我们的public文件夹
hexo g          //hexo generate命令，在本地生成静态页面，即pubilc文件夹
hexo s          //hexo server命令，开启本地服务器，可供我们本地预览
```
本地服务器开启后，我们可以访问localhost:4000来本地预览，输入Ctrl+C关闭本地服务器

# 三、写博客

```C
hexo n "第一篇文章"
//hexo new命令，会在source\\_posts目录下生成一篇博客文章
```

生成博客还是老三样
```C
hexo clean
hexo g
hexo s
```


# 四、部署到github
执行完上述步骤，我们的博客只能在本地看，我们必须部署到网上才能通过网络来看。Github提供GitPages免费站点服务，自带域名和1G免费空间，存放博客资源和网页信息足够。

git本地配置和ssh公钥配不再赘述

## 1、新建git仓库
要注意仓库名必须要符合规则，即【用户名.github.io】格式。git会跟进这个仓库来创建域名。

## 2、hexo配置git插件
```C
cnpm install --save hexo-deployer-git
```

安装完成后我们需要修改_config.yml文件中的Deployment信息（最下面）
```
deploy:
    type: git
    repo: git@github.com:Liuqianci/Liuqianci.github.io.git
    branch: master
```

## 3、部署远端
在之前的基础上，可以把本地文章部署到远端了
```C
hexo clean
hexo g
hexo s

hexo d   //hexo deploy命令，部署远端
```

此时我们的github仓库就有内容了，我们也可以输入域名直接访问我们的博客。

# 五、自定义域名
虽然gitpages给我们提供了一个域名，但是我们还可以自己申请一个属于自己的域名。我绑定的是腾讯的域名。

在腾讯云里申请域名，此流程很快。

域名申请下来后，需要绑定我们的博客网站。在腾讯云的控制台上进行域名解析。一般解析两条，A对应IP，CNAME对应域名。我们博客的IP，直接ping我们博客的域名即可。

域名解析完成后，我们要进行域名绑定，在source目录下新建一个CNAME文件，写入自己的域名。然后在GitPages上也进行配置，进入Github的settings中，添加GitPages的Custom Domain为我们的自定义域名。我们可以勾选Enforce HTTPS来开启https


最后在_config.yml的url选项中填写我们的自定义域名。完成发布。