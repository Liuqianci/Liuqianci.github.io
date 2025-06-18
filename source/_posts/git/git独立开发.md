---
title: git独立开发
date: 2025-06-03 20:33:10
tags:
    - git
categories:
    - git
---


# 创建分支

```cmd
$ git branch 分支名
```


# 删除分支

```cmd
# -d必须要求该分支已经被合并
$ git branch -d 分支名

# -D强制删除
$ git branch -D 分支名
```

# 修改commit的message

```cmd
# 修改当前branch最新的commit的message:
$ git commit --amend
# 命令输入后可以修改message，linux命令行wq!退出编辑
```

```cmd
$ git rebase -i 需要变更的commit的上一次commit的hash

# 命令输入后进入交互界面，根据界面中的指令选择对应的命令，此处应该用r
```

# 把多个commit整理为一个

连续的commit整理为一个：

```cmd
$ git rebase -i 需要整理的最早的commit的hash

# 命令输入后进入交互界面，根据界面中的指令选择对应的命令
# 多个分支选择一个用pick命令，其余用squash指令
```

# 比较暂存区和HEAD所含文件

&emsp;&emsp;省事的做法是，修改完文件后直接把暂存区文件commit提交，这是个不好的习惯。一个比较好的做法是，在执行commit之前，需要先比较一下当前暂存区的文件是否合适提交到当前分支。

```cmd
# 比较暂存区和HEAD
$ git diff --cached 
```

# 比较工作区和暂存区

```cmd
$ git diff 

$ git diff --文件名
```

# 暂存区恢复为HEAD

```cmd
# 恢复所有暂存区文件
$ git reset HEAD

# 恢复暂存区部分文件
$ git reset HEAD -- 文件名
```

# 工作区恢复为暂存区

```cmd
$ git checkout --文件名
```

# commit回退

这个命令直接操作了head指针，把工作区和暂存区的东西都修改了，轻易不要使用。

```cmd
$ git reset --hard 指定的commit的hash
```

# 比较不同branch之间的差异

```cmd
$ git diff 分支1 分支2

$ git diff 分支1 分支2 -- 具体文件名

$ git diff hash1 hash2
```

# 删除文件

```cmd
# 暂存区里删除文件
$ git rm 文件名
```

# 暂存修改内容

一般用于开发过程中出现紧急任务，当前分支需要做修改。

```cmd
# 暂存当前工作区内容
$ git stash

# 查看所有暂存内容
$ git stash list


# 暂存区内容恢复，但不清空stash堆栈
$ git stash apply  

# 暂存区内容恢复，且清空stash堆栈
$ git stash pop
```

# 指定不需要git管理的文件

对于一些代码生成过程中产生的构建文件，是不需要参与git管理的，每次生成都可以重新产生。

github中有一个文件".gitignore"可以指定，这个文件由github自动生成，不同语言的内容不一样。

```
*.d     //所有.d后缀的文件都不纳入管理

*.dsYM/     //dsYM文件夹下的任何文件都不纳入git管理，但如果有文件是.dsYM后缀仍然需要掌控
```


# git备份

|常用协议|语法格式|说明|
|:---|:---|:---:|
|本地协议|/path/to/repo.git|哑协议|
|本地协议|file://path/to/repo.git|智能协议|
|http/https协议|http://git-server.com:port/path/to/repo.git<br>https://git-server.com:port/path/to/repo.git|平时经常接触的智能协议|
|ssh协议|user@git-server.com:path/to/repo/git|工作中常用的智能协议|

哑协议和智能协议的区别：

1. 哑协议传输进度不可见、智能协议传输可见；
2. 智能协议传输速度更快；

```cmd
$ git clone 协议地址 本地路径  //远程仓库拉取到本地

$ git remote add <file> <远端地址>
```