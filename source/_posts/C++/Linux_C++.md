---
title: Linux_CPP
date: 2025-05-27 16:34:02
tags:
    - C++进阶
    - Linux
categories:
    - C++
mathjax: true
---

# Linux开发环境搭建

## gcc、g++的安装

gcc和g++是GUN的C&C++编译器，这两个本质上区别不大，gcc默认下使用C编译器，g++默认使用C++编译器。

```
yum install gcc

yum install gcc-c++
```

## 编译流程

+ 源文件生存可执行程序：

```
>$ g++ helloworld.cpp -o helloworld


// 如果用gcc编译器，不会包含标准库信息，需要在命令行中包含
>$ gcc -lstdc++ helloworld.cpp -o helloworld

//-wall可以看到警告信息
>$ g++ -Wall helloworld.cpp -o helloworld
```

&emsp;

GCC命令的编译选项：

|参数|解释|
|:--|:--|
|-ansi|只支持ANSI标准的C语法。这一选项将进制GNU C的某些特色，例如asm或者typeof关键字|
|-S|只激活预处理和编译，就是指把文件编译成为汇编代码|
|-c|只编译并生成目标文件|
|-g|生成调试信息。GNU调试器可利用该信息|
|-o FILENAME|生成指定的输出文件。用在生成可执行文件时|
|-O0|不进行优化处理|
|-O或-O1|优化生成代码|
|-O2或-O3|进一步优化|
|-shared|生成共享目标文件。通常用在建立共享库时|
|-static|禁止使用共享连接|
|-w|不生成任何警告信息|
|-Wall|生成所有警告信息|
|-IDIRECTORY|指定额外的头文件搜索路径DIRECTORY|
|-LDIRECTORY|指定额外的函数库搜索路径DIRECTORY|
|-ILIBRARY|链接时搜索指定的函数库LIBRARY|
|-m486|针对486进行代码优化|
|-E|只运行C预编译器|


&emsp;

# make和Makefile

&emsp;&emsp;make是一个批处理工具，本身其实没什么功能。make工具就根据Makefile中的命令进行编译和链接。其实Windows系统中也有这些步骤，只不过微软已经把这些嵌入到了编译器中，不需要程序员去关心。Linux系统也有一些IDE可以帮助我们完成这些工作，比如CMake。


## makefile的作用

工程中可执行文件的产生过程如下：

1. 配置环境(系统环境)
2. 确定标准库和头文件的位置
3. 确定依赖关系（源代码之间编译的依赖关系）
4. 头文件预编译
5. 预处理
6. 编译
7. 链接
8. 安装
9. 和操作系统建立联系
10. 生成安装包

&emsp;&emsp;大型工程中需要确定代码之间的依赖关系(第三步)，当依赖关系复杂的时候，make命令工具诞生了，而Makefile文件正是为make工具所使用的。<u>**Makefile描述了整个工程文件的编译顺序、编译规则。**</u>

## make流程

&emsp;&emsp;假设我们有一个简单的demo，reply.h、reply.cpp两个文件定义了一个类，输出“helloworld”，main.cpp是主函数文件，生成类对象。这三个文件有依赖关系。我们编译的步骤如下：

1. **写Makefile文件**

```
main: reply.o main.o    //左侧main是目标，依赖右侧的两个文件
    g++ reply.o main.o -o main  //使用g++命令，用reply.o、main.o生成main
reply.o: reply.cpp  //reply.o,依赖reply.cpp
    g++ -c reply.cpp  -o reply.o  //用g++命令生成reply.o,只编译
main.o: main.cpp  //main.o,依赖main.cpp
    g++ -c main.cpp  -o main.o  //用g++命令生成main.o,只编译
```

&emsp;&emsp;可以看到，先表明最终生成文件的依赖关系，然后生成。其次挨个写被依赖文件自身的依赖关系。从上往下是倒置的依赖关系。

&emsp;

2. **用make命令**

`$ make `

&emsp;&emsp;类似于批处理，make命令会去调用makefile文件，完成Makefile文件中的各项命令。

&emsp;

## makefile文件格式

+ makefile的基本规则：

```
目标(target)...: 依赖(prerequisites)
    命令(command)
```

注意：每个命令前必须是Tab字符。

&emsp;

+ makefile的简化规则：
  
  1. 变量定义： 变量 = 字符串
  2. 变量使用： $(变量名)

```
//上面的makefile文件可以做如下简化：

TARGET = main
OBJS = reply.o main.o
$(TARGET): $(OBJS)
    g++ $(OBJS) -o $(TARGET)
reply.o: reply.cpp  
main.o: main.cpp  

clean:
    rm $(TARGET) $(OBJS)   //生成完成后
```

&emsp;

+ 清空操作

```
//在makefile文件中可以加上清理操作：

TARGET = main
OBJS = reply.o main.o

.PHONY: clean  //.PHONY关键字，表示clean不存在，否则目录下存在"clean"同名文件的话，clean会失败

clean:
    rm $(TARGET) $(OBJS)   
```

执行`$ make clean`命令后，可以根据makefile中定义的删除操作把文件删掉。

## makefile的扩展用法

1. make工程的安装和卸载

```
TARGET = main
OBJS = reply.o main.o

//安装可以简化为拷贝操作
//把main拷贝到/user/local/bin/mainTest 
install:
    cp ./main /user/local/bin/mainTest 

uninstall:
    rm /user/local/bin/mainTest 
```

&emsp;

2. Makefile中的变量

```
一、用户自定义变量
 变量 = 字符串，使用的时候就用$()括起来。就类似于C++中的宏定义。注意变量的大小写敏感。



二、变量中的变量
  变量可以先使用再声明：
foo = $(bar)  //还没声明bar，但可以先直接用
bar = $(ugh)
ugh = Hug   

  这样可以使变量定义更加灵活，但如果工程过于复杂不建议用，因为这样定义需要make来推导
  定义的层级过多，会导致编译速度很慢。

  如果希望只能使用声明过的变量，那么可以使用":="来替换"="
  ":="如果使用了还没有声明的变量，会失效



三、追加变量
  可以使用"+="来追加变量



四、多行变量
  define two-lines
  第一行命令
  第二行命令
  endif



五、环境变量
  就是操作系统的环境变量，Windows和Linux下都有


六、自动变量(目标变量)
  上面说的变量都是全局变量，整个makefile文件的运行过程中都可以被访问。
  自动变量和上面的不一样，这是一种规则变量，设定好规则后，只有makefile运行过程中符合规则时才生效
  $< : 表示第一个匹配的依赖
  $@ : 表示目标
  $^ : 表示所有依赖
  $? : 表示所有依赖中更新的文件
  $+ : 表示所有依赖文件不去重
  $(@D) : 表示目标文件路径
  $(@F) : 表示目标文件名称


七、模式变量
  模式变量就是符号'%',比较类似在搜索时使用的通配符，可以表示任何一个字符


八、自动匹配
    
```

&emsp;

# Makefile自动生成部署——CMake

&emsp;&emsp;一般来说，项目的目录结构来说起码要包含如下目录：src目录下是头文件的实现文件；include目录下是包含的头文件；bin目录下是可运行文件；build目录下是临时构建的文件。当我们把文件分门别类后，可以让整个项目的层次分明。但对于大型工程来说，这么复杂的目录结构会导致makefile的编写极其困难。

&emsp;&emsp;为了解决这两个问题，有几个非常好用的工具：[automake/autocinfig](https://cmake.org/documentation/)、[CMake](https://cmake.org/documentation/)。

&emsp;&emsp;生成CMake工程不需要写makefile文件，又CMake自动生成，我们只需要写CMakeList.txt这样的文本文件即可，这个文件是有模板的：

```
# CMakeList.txt
# 设置cmake最低版本
cmake_minimum_required(VERSION 2.8.0)
# 设置C++标准
set(CMAKE_CXX_STANDARD 11)
# 项目名称
project(cmake_test)
# 包含的头文件目录
include_directories(./include)
set(SRC_DIR ./src)
# 指定生成链接库
add_library(XXX ${SRC_DIR}/XXX.cpp)
add_library(YYY ${SRC_DIR}/YYY.cpp)
# 设置变量
set(LIBRARIES XXX YYY)
set(OBJECT XXX_test)
# 生成可执行文件
add_executable(${OBJECT} ${SRC_DIR}/main.cpp)
# 为可执行文件链接目标库
target_link_libraries(${OBJECT} ${LIBRARIES})
```