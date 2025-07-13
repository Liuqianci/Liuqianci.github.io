---
title: 0、windbg安装
date: 2025-02-05 20:19:00
tags:
    - 软件调试
categories:
    - 软件调试
---

# windbg下载

[WindowsSDK](https://developer.microsoft.com/zh-cn/windows/downloads/windows-sdk/)，中选择下载安装程序，下载下来一个【winsdksetup.exe】，选择第二种Download下载方式，以安装包的形式下载(第一种是在线安装，无法保留安装包)。

点击两次next以后会出现一个界面，这里是选择下载哪些工具，只需要选择第二个【Debugging Tools for Windows】,这个就是需要的windbg。

下载完成后在下载目录中会出现一个文件夹，找到【x64 Debuggers And Tools-x64】和【x86 Debuggers And Tools-x64】点击安装即可。

# windbg preview下载

Windbg Preview的功能和windbg的功能是一样的，但是安装更加方便，只需要在Microsoft Store商店中搜索即可。

# 配置环境变量

1. WinDbg访问符号需要使用 symsrv.dll 和 symstore.exe 这两个文件，它们存在与 WinDbg 的执行文件目录下。由于它们直接在执行文件的目录下，所以不需要进行任何的路径配置；
2. 在系统环境变量中添加一个新的环境变量 "_NT_SYMBOL_PATH"，并将其值设置为``` "SRV*c:\mysymbol* http://msdl.microsoft.com/download/symbols" ```，其中“c:\mysymbol”是我们自定义的文件夹路径，windbg在加载符号的时候，会把符号下载到这个目录。

[引用博客园](https://www.cnblogs.com/Jeffrey-Chou/articles/11894907.html)

