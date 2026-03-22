---
title: VSCode配置C/C++
date: 2026-03-16 21:04:17
tags:
    - vscode
categories:
    - apps
---

# VSCode的下载和安装

+ 下载VSCode：[vscode官网](https://code.visualstudio.com/)

&ensp;&ensp;安装时有选项，推荐选择“添加到PATH”、“通过Code打开”、“添加到右键菜单”；

&ensp;&ensp;安装完成后是英文版本，可以安装汉化插件。点击左侧扩展按钮，搜索安装&#91;Chinese(Simplified)&#93;，安装完成后右下角弹窗，点击重启后即可生效。


# C++环境配置

&ensp;&ensp;VSCode本质上就是一个轻量级文本编辑器，是不能够直接运行代码的，还需要额外进行配置。

## 方案一：安装MinGW

1. 下载MinGW-w64:[MinGW](https://sourceforge.net/projects/mingw-w64/files/);
2. 点击<kbd>Toolchains targetting Win64</kbd>--<kbd>Personal Builds</kbd>--<kbd>mingw-builds</kbd>--<kbd>8.1.0</kbd>--<kbd>threads-posix</kbd>--<kbd>seh</kbd>，单击下载里面的压缩包文件。
3. 解压到一个目录后，我们需要配置环境变量，在系统的环境变量中编辑Path，把“X:&#92;mingw64&#92;bin”的路径添加进去。

&ensp;&ensp;上述操作完成后，我们的环境就配置完成了，VSCode会自动识别g++编译器。

## 方案二：复用Visual Studio的MSVC编译器

如果熟悉Visual Studio的话，可以直接复用MSVC编译器。

1、找到MSVC编译器路径，通常在

>C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.x.x\bin\Hostx64\x64

2、配置VSCode使用MSVC：在VSCode中按<kbd>Ctrl+Shift+P</kbd>，输入“Edit Configurations”。在生成的c_cpp_properties.json中配置：

```json
{
    "configurations": [
        {
            "name": "Win32",
            "includePath": [
                "${workspaceFolder}/**",
                "C:/Program Files/Microsoft Visual Studio/2022/Community/VC/Tools/MSVC/14.x.x/include/**"
            ],
            "defines": ["_DEBUG", "UNICODE", "_UNICODE"],
            "windowsSdkVersion": "10.0.22000.0",
            "compilerPath": "C:/Program Files/Microsoft Visual Studio/2022/Community/VC/Tools/MSVC/14.x.x/bin/Hostx64/x64/cl.exe",
            "cStandard": "c17",
            "cppStandard": "c++17",
            "intelliSenseMode": "windows-msvc-x64"
        }
    ],
    "version": 4
}
```

# 配置编译环境

需要安装如下的扩展：

+ C/C++：提供语法高亮、智能感知、调试支持；
+ C++ Themes：优化C++语法高亮；
+ CMake Tools：如果使用CMake的话，需要安装这个；
+ Code Runner：一键运行代码片段；

&emsp;

推荐安装以下扩展：

+ GitLens：增强Git功能；
+ Bracket Pair Colorizer：彩虹括号；
+ Todo Tree：管理TODO注释；

&emsp;

# 创建和编译C++程序

+ 在本地资源管理器中新建一个文件夹用来存放代码，然后用VSCode打开这个文件夹；
+ 左边工作区中点击<kbd>新建文件</kbd>，新建一个C语言文件，例如“test.c”；
+ 编写我们的程序，如hello world。
+ 点击<kbd>Ctrl+Shift+P</kbd>，搜索“C/C++”，选择<kbd>编辑配置(UI)</kbd>。可以看到其中【编译器配置】中默认的是"cl.exe"，我们需要修改为之前安装的mingw64里的gcc.exe；同时【IntelliSense】模式需要修改为"Windows-gcc-x64"；
+ 在代码页点击菜单栏的<kbd>终端</kbd>、<kbd>配置任务</kbd>，选择“C/c++:gcc.exe生成活动文件”，会生成一个"task.json"文件，此时就可以生成我们的代码了；
+ 在代码页点击菜单栏<kbd>终端</kbd>、<kbd>运行生成任务</kbd>，使用gcc.exe生成活动文件。
+ 我们可以在终端中运行，在菜单栏点击<kbd>终端</kbd>、<kbd>新建终端</kbd>，在窗口中输出".&#92;test.exe"，回车后就可以运行了。