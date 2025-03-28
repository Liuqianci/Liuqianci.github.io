---
title: git基础
date: 2025-03-27 10:46:36
tags:
    - git
categories:
    - git
---

# git安装

[git手册](https://git-scm.com/book/zh/v2)提供了完整的安装步骤。

安装成功后，命令行输入git命令可以检查是否安装成功：

```cmd
#查看git版本
git --version 
```

# 最小配置

使用git之前需要配置user.name和user.email，可以方便绑定每次操作的用户信息。

```
$ git config --global user.name 'your_name'
$ git config --global user.email 'your_email@domain.com'
```

上面的'--global'是git的作用域，git一共有三个作用域：

+ --local :只对某个仓库有效
+ --global ：对当前用户的所有仓库有效
+ --system ：对系统的所有登录用户有效

显示config的配置，可以加--list：

```cmd
$ git config --list --local
$ git config --list --global
$ git config --list --system
```

# 创建仓库并配置local用户信息

建立git仓库有两种使用场景：

第一种场景：把已经有的项目代码列入git管理

```cmd
$ cd 项目代码目录
$ git init
```

&emsp;

第二种场景：新建的项目直接用git管理：

```cmd
$ cd 某个目录
$ git init your_project  #会在当前路径下创建和项目名称同名的文件夹
$ cd your_project
```

&emsp;

以第二种方式为例，执行完命令后，会在目录下生成一个'.git'的隐藏目录。

如果此时在这个目录下配置local的用户名和邮箱，且和global配置的不同，那么在这个仓库中执行的操作会以local配置为准生效。

# 工作区和暂存区

```cmd
$ git add files  #把工作目录中的内容添加暂存区

$ git commit     #把暂存区中的内容添加到正式版本历史
```

git标准的操作是每次在工作目录中修改的文件，都先添加入暂存区。为了某个功能而做的修改都添加入暂存区后，可以统一把这批文件commit到git版本库中。

```cmd
$ git reset --hard
#这个命令可以重置暂存区，轻易不要使用

$ git status #查看工作目录修改状态
```


&emsp;

如果想要在git中修改某个文件的文件名，可以有两种方式：

```cmd
# 方式1：工作目录中修改文件名，然后重新add、commit
$ mv old new   #修改文件名
$ git add new
$ git commit

# 方式2：直接调用git命令
$ git mv old new
$ git commit 
```

# 查看版本历史和分支

```cmd
# 查看每次提交的细节
$ git log

# 只查看提交备注
$ git log --oneline

# 只查看最近的某几次提交
$ git log -n2 --oneline  #只查看2次

# 查看本地有多少分支
$ git branch -v

# 查看所有分支的提交记录
$ git log --all

# 图形化查看所有分支的提交记录
$ git log --all --graph
```
&emsp;

对于Windows用户来说，可能更习惯图形化操作，可以使用git自带的图形化工具：

```cmd
$ gitk  # 打开图形化界面
```

# ".git"目录

新建仓库后，工作目录下会生成一个隐藏的".git"目录，这里面就是git最核心的内容。

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/git/git%E7%9B%AE%E5%BD%95.png)

常用的文件如下：

+ HEAD文件：记录当前工作在哪个分支上；
+ config文件：当前工作目录的一些配置，比如user.name和user.email；
+ refs/heads目录：各个分支指向的提交hash；
+ refs/tags目录：各个tag指向的提交hash；
+ objects目录：存放文件和更改，内部的对象可以分为commit、tree和blob三种类型；这个是git版本管理的底层目录；

# git文件类型（commit、tree和blob）

&emsp;&emsp;数据存储是git的核心技术点；git的目标是项目管理，而项目管理中的文件变更很频繁，如果没有一个好的数据管理技术，git的存储信息会越来越大，性能会越来越差。所以设计一个良好的数据存储机制是很关键的。 

&emsp;&emsp;.git的object中就是git存储的核心目录，下面的文件共有三种类型：commit、tree和blob。

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/git/git%E6%96%87%E4%BB%B6%E7%B1%BB%E5%9E%8B.png)

&emsp;&emsp;上图是git官网文档的实例，每次执行commit操作都会创建一个commit对象出来；一个commit对应唯一一棵树，是这个commit的快照，存放所有的文件夹和文件；blob就是其中具体的文件；要注意每个blob和文件名毫无关系，在git中只要这个文件的内容相同，那对应的就是一个blob，这样可以大大减少存储代价。