---
title: 调试技巧——assert()
date: 2022-02-08 12:50:17
tags:
    - C++基础
categories:
    - C++
---

&emsp;&emsp;编写代码时，我们总会做出一些假设，断言就是用在代码中捕获这些假设。断言表示为一些布尔表达式，我们相信在程序中的某个特定点该表达式的值为真，可以在任意时刻启用和禁用断言来验证。

&emsp;&emsp;举个例子，在离散数学中有个德摩根定律，我们在C++语言中可以验证：
$$
\overline{A\cup B} = \overline{A}\cap \overline{B} 
$$
$$
\overline{A\cap B} = \overline{A}\cup\overline{B}
$$

```cpp
#include<iostream>
using namespace std;
int main()
{
	bool A = false;
	bool B= true;
	//德摩根率：
	cout<<(!(A || B) == (!A && !B))<<endl;  //输出1
	cout<<(!(A && B) == (!A || !B))<<endl;  //输出1
}
```

这种代码方式在开发中并不常见，而是使用以下断言的方式：

```cpp
#include<iostream>
#include<assert.h>
using namespace std;
int main()
{
	bool A = false;
	bool B= true;
	//德摩根率：
	assert( !(A || B) == (!A && !B) );  
	assert( !(A && B) == (!A || !B) );  
}
```

在这个程序中，并不会有任何输出结果，但是程序正常运行。

假如assert()函数中表达式出错，整个程序在运行的时候就会报错，并指出哪里出了问题。


所以今后在我们开发的时候可以运用这一特性，完成开发测试用例的编写：

```cpp
assert(函数返回值 == 预期结果);
```
只要函数运行符合预期结果，程序正常运行，一旦不符合就会出错。

注意assert()不是函数，而是一个宏定义。