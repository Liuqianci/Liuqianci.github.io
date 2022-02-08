---
title: Markdown格式
date: 2022-02-06 16:21:09
tags:
    - Hexo
categories:
    - Hexo
---

Hexo博客要求必须使用Github风格的Markdown语言编辑。所以需要了解具体的编写格式。

# 一、编辑器
市面上有很多的Markdown编辑器，之前很多人喜欢用Typora，但目前这个已经没有免费版可以用了。干脆直接用VSCode。

使用VSCode需要下载两个插件，第一个是【Markdown All in One】，是一个组合包，把最常用的markdown优化都安装好；第二个是【Markdown Preview Github Styling】,是Github使用的Markdown渲染样式。使用这个样式，在本地就能预览Markdown文件最终在Github Pages中显示的效果。

# 二、常用语法

## 标题
利用`#`设置标题，一个表示一级，两个表示二级，依次类推
```
#      一级标题
##     二级标题
……………… 以此类推
``` 

## 引用
利用`>`可以创建引用块

## 文本高亮
利用一组反引号`来把文本包起来。
```
`这里面是需要高亮的字符`
```

## 代码块
利用三个反引号`把内容扩起来即可。在上面的那个反引号后面还可以加上语言名称来进行自适应。

## 斜体
可以用一组`*`号来把文字包起来，也可以直接用快捷键`Ctrl+I`。

## 加粗
k可以用一组`**`来把文字包起来，也可以用快捷键`Ctrl+B`。

## 删除线
用一组`~~`把文字~~包起来~~。

## 下划线
下划线可以用`<u>  </u>`<u>把文字包起来</u>。

## 按键效果
<kbd>可以用一组</kbd>`<kbd>  </kbd>`把文字包起来，实现按键效果。

## 列表
列表分为有序列表和无序列表
```
无序列表：用-加空格
- 第一
- 第二

有序列表：用数字加.加空格
1. 第一
2. 第二
```

# 三、链接与图片
图片其实是一种超链接，所以把图片归类为链接里面。

## 1、跳转链接
普通的网站跳转都属于跳转链接，语法很简单：
```
[网站说明](跳转链接)
```

## 2、图片链接
图片链接的markdown语法和跳转链接类似：
```
![](图片链接)
```

## 3、图片存储
网上很多教程都是利用相对路径来存储图片，操作如下：
1. 安装图片插件
```
npm install hexo-asset-image --save
```

2. _config.yml配置文件中，修改为 post_asset_folder: true

其中第二步可以忽略，第二步的意义在于我们新建文章的时候，会在soruce目录下生成文章同名文件夹供我们存储图片，我们也可以手动创建文件夹。

但是对于GitPages或者云服务器来说，其提供的免费存储空间都是有上限的，这样操作只适用于图片较少的情况。我们可以利用云服务器对象存储功能实现图床。

我的域名使用的是腾讯的，那就用腾讯的COS来操作，并且腾讯提供可视化工具COSBrowser，很方便。
参考博客：
[Hexo 博客图片添加至图床---腾讯云COS图床使用](https://blog.csdn.net/as403045314/article/details/101337257)

一个图片测试：

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/Hexo%E5%8D%9A%E5%AE%A2/0880c08b0110e397da10.jpg)

# 四、公式
公式使用的是Latex语法。但需要注意，Hexo并不支持Laxte语法，所以我们需要开启相关的开关。有些主题就自带这个功能。
Markdown使用&#36;包裹实现行内公式，使用&#36;&#36;包裹实现行间公式。
Latex语法可以不掌握，借助工具即可：
[HostMath](http://www.hostmath.com/)

# 五、表格
```
|     1   |      T2       |  T3   |
|----------|:-------------:|------:|
|   1      |  1            |  1    |
|   22     |  22           | 22    |
|   333    |  333          | 333   |

```

|     1   |      T2       |  T3   |
|----------|:-------------:|------:|
|   1      |  1            |  1    |
|   22     |  22           | 22    |
|   333    |  333          | 333   |

`------`表示左对齐，`:------：`表示居中，`-----:`表示右对齐
Hexo的表格必须和正文之间有空行，否则不能正常显示

# 六、流程图
Hexo里流程图限制多多，直接在其他软件画完截图吧。我也懒得学了。【流汗黄豆】

# 特殊字符
常见转义如下：

```
! &#33; — 惊叹号 Exclamation mark
” &#34; &quot; 双引号 Quotation mark
# &#35; — 数字标志 Number sign
$ &#36; — 美元标志 Dollar sign
% &#37; — 百分号 Percent sign
& &#38; &amp; Ampersand
‘ &#39; — 单引号 Apostrophe
( &#40; — 小括号左边部分 Left parenthesis
) &#41; — 小括号右边部分 Right parenthesis
* &#42; — 星号 Asterisk
+ &#43; — 加号 Plus sign
< &#60; &lt; 小于号 Less than
= &#61; — 等于符号 Equals sign
- &#45; &minus; — 减号
> &#62; &gt; 大于号 Greater than
? &#63; — 问号 Question mark
@ &#64; — Commercial at
[ &#91; --- 中括号左边部分 Left square bracket
\ &#92; --- 反斜杠 Reverse solidus (backslash)
] &#93; — 中括号右边部分 Right square bracket
{ &#123; — 大括号左边部分 Left curly brace
| &#124; — 竖线Vertical bar
} &#125; — 大括号右边部分 Right curly brace
```