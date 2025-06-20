---
title: C++基础句法
date: 2022-04-10 21:42:41
tags:
    - C++基础
categories:
    - C++
---
# 三种基本结构

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/%E4%B8%89%E7%A7%8D%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84.png)

## 分支结构

### if分支语句

+ 单一语句：在任何一个表达式后面加上分号；
+ 符合语句：用一对花括号{}括起来的语句块，在语法上等效一个单一的语句；
+ if语句：if语句是最常用的一种分支语句，也称为条件语句。


if语句练习：实现一个函数：输入一个年号，判断是否是闰年。闰年判断：1、能够被400整除；2、能被4整除但不能被100整除。

```cpp
#include <iostream>
using namespace std;

bool isLeapYear(unsigned int year)
{
	// 双分支if
	//if ( (year % 400 == 0) ||  (year%4==0 && year%100 != 0) )
	//这里有个if的优化，因为||操作符，第一个条件满足不看后面的，&&操作符第一个条件不满足不看后面的
	//所以按下面的方式效率更高，因为涉及命中率问题，被4整除的概率更高
	if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
	{
		return true;
	}
	else
	{
		return false;
	}
}

int main()
{
    // 是否是闰年
	cout << isLeapYear(2000) << endl;
	cout << isLeapYear(2020) << endl;
	cout << isLeapYear(2021) << endl;
    return 0;
}
```

if语句练习：判断一个整数是否是另一个整数的倍数：

```cpp
#include <iostream>
using namespace std;

int main()
{
	// b是否是a的倍数
	int a = 0;
	int b = 4;
	//短路运算，除数不能为0。千万别写反了
	if ((a != 0) && b % a == 0)
	{
		cout << "b是a的倍数" << endl;
	}
	else
	{
		cout << "b不是a的倍数" << endl;
	}

	return 0;
}
```

### switch分支语句

```cpp
switch(表达式)
{
	case 常数1：语句1; break;
	case 常数2：语句2; break;
	case 常数3：语句3; break;
	default : 语句;
}
```

```cpp
#include <iostream>
using namespace std;

typedef enum __COLOR
{
	RED,
	GREEN,
	BLUE,
	UNKOWN
}COLOR;

int main()
{
	// 多分支条件的if
	// if, else if, else
	COLOR color0;
	color0 = BLUE;
	int c0 = 0;
	if (color0 == RED) {
		//cout << "red" << endl; 
		c0 += 1;
	}
	else if (color0 == GREEN) {
		//cout << "green" << endl; 
		c0 += 2;
	}
	else if (color0 == BLUE) {
		//cout << "blue" << endl;
		c0 += 3;
	}
	else {
		//cout << "unknown color" << endl; 
		c0 += 0;
	}

	// 多分支条件的switch
	// switch,case,default
	COLOR color1;
	color1 = GREEN;
	int c1 = 0;
	switch (color1)
	{
	case RED:
	{
		//cout << "red" << endl;
		c1 += 1;
		break;
	}
	case GREEN:
	{
		//cout << "green" << endl; 
		c1 += 2;
		break;
	}
	case BLUE:
	{
		//cout << "blue" << endl;
		c1 += 3;
		break;
	}
	default:
	{
		//cout << "unknown color" << endl;
		c1 += 0;
		break;
	}
	}


	return 0;
}
```

为了比较两种分支语句的区别，我们可以看更底层的汇编代码，拿上面例子举例：

```
// 多分支条件的if
// if, else if, else
	COLOR color0;
	color0 = BLUE;
001A5D85  mov         dword ptr [color0],2  
	int c0 = 0;
001A5D8C  mov         dword ptr [c0],0  
	if (color0 == RED) { 
001A5D93  cmp         dword ptr [color0],0  
001A5D97  jne         main+164h (01A5DA4h)  
		//cout << "red" << endl; 
		c0 += 1;
001A5D99  mov         eax,dword ptr [c0]  
001A5D9C  add         eax,1  
001A5D9F  mov         dword ptr [c0],eax  
001A5DA2  jmp         main+18Ch (01A5DCCh)  
	}
	else if (color0 == GREEN) { 
001A5DA4  cmp         dword ptr [color0],1  
001A5DA8  jne         main+175h (01A5DB5h)  
		//cout << "green" << endl; 
		c0 += 2;
001A5DAA  mov         eax,dword ptr [c0]  
001A5DAD  add         eax,2  
001A5DB0  mov         dword ptr [c0],eax  
001A5DB3  jmp         main+18Ch (01A5DCCh)  
	}
	else if (color0 == BLUE) {
001A5DB5  cmp         dword ptr [color0],2  
001A5DB9  jne         main+186h (01A5DC6h)  
		//cout << "blue" << endl;
		c0 += 3;
001A5DBB  mov         eax,dword ptr [c0]  
001A5DBE  add         eax,3  
		//cout << "blue" << endl;
		c0 += 3;
001A5DC1  mov         dword ptr [c0],eax  
	}
	else { 
001A5DC4  jmp         main+18Ch (01A5DCCh)  
		//cout << "unknown color" << endl; 
		c0 += 0;
001A5DC6  mov         eax,dword ptr [c0]  
001A5DC9  mov         dword ptr [c0],eax  
	}

// 多分支条件的switch
// switch,case,default
	COLOR color1;
	color1 = GREEN;
001A5DCC  mov         dword ptr [color1],1  
	int c1 = 0;
001A5DD3  mov         dword ptr [c1],0  
	switch (color1) 
001A5DDA  mov         eax,dword ptr [color1]  
001A5DDD  mov         dword ptr [ebp-10Ch],eax  
001A5DE3  cmp         dword ptr [ebp-10Ch],0  
001A5DEA  je          main+1C0h (01A5E00h)  
001A5DEC  cmp         dword ptr [ebp-10Ch],1  
001A5DF3  je          main+1CBh (01A5E0Bh)  
001A5DF5  cmp         dword ptr [ebp-10Ch],2  
001A5DFC  je          main+1D6h (01A5E16h)  
001A5DFE  jmp         main+1E1h (01A5E21h)  
	{
		case RED:
		{	
			//cout << "red" << endl;
			c1 += 1;
001A5E00  mov         eax,dword ptr [c1]  
001A5E03  add         eax,1  
001A5E06  mov         dword ptr [c1],eax  
			break;
001A5E09  jmp         main+1E7h (01A5E27h)  
		}
		case GREEN:
		{	
			//cout << "green" << endl; 
			c1 += 2;
001A5E0B  mov         eax,dword ptr [c1]  
001A5E0E  add         eax,2  
001A5E11  mov         dword ptr [c1],eax  
			break;
001A5E14  jmp         main+1E7h (01A5E27h)  
		}
		case BLUE:
		{	
			//cout << "blue" << endl;
			c1 += 3;
001A5E16  mov         eax,dword ptr [c1]  
001A5E19  add         eax,3  
001A5E1C  mov         dword ptr [c1],eax  
			break;
001A5E1F  jmp         main+1E7h (01A5E27h)  
		}
		default:
		{	
			//cout << "unknown color" << endl;
			c1 += 0;
001A5E21  mov         eax,dword ptr [c1]  
001A5E24  mov         dword ptr [c1],eax  
			break;
		}
	}
    return 0;
001A5E27  xor         eax,eax  
}
```

在分支不是很多的情况下，两者差异不大，但如果分支很多的话，switch的效率更高。从汇编看switch更像一个表结构，if是个树结构。

使用场景的区别：

1. switch只支持常量值固定相等的分支判断；
2. if可以做区间范围判断；
3. switch能做的if都可以，但反之不行。

性能比较：

1. 分支少的时候，差别不是很大，分支多时，switch性能较高；
2. if开始处的几个分支效率高，之后效率递减；
3. switch的所有case速度几乎一样。


## 循环结构

C++中一共提供了三种循环语句：while、do while、for

### 三种循环结构

```cpp
//计算1 + 2 + …… + 99 + 100的和

#include <iostream>
using namespace std;
int main()
{   // TODO: 1+2+3+4...+100
	// while语句
	int sum = 0;
	int index = 1;
	while (index <= 100)
	{
		sum += index;
		index += 1;
	}
	cout << sum << endl;

	// for语句
	index = 1;
	sum = 0;
	for (index = 1; index <= 100; ++index)
	{
		sum += index;
	}
	cout << sum << endl;

	// do-while语句
	sum = 0;
	index = 1;
	do
	{
		sum += index;
		index += 1;
	} while (index <= 100);
	cout << sum << endl;

	return 0;
}

```

```
三种汇编代码的底层逻辑：
	// while语句
	int sum = 0;
002A17BE  mov         dword ptr [sum],0  
	int index = 1;
002A17C5  mov         dword ptr [index],1  
	while (index <= 100)
002A17CC  cmp         dword ptr [index],64h  
002A17D0  jg          main+46h (02A17E6h)  
	{
		sum += index;
002A17D2  mov         eax,dword ptr [sum]  
002A17D5  add         eax,dword ptr [index]  
002A17D8  mov         dword ptr [sum],eax  
		index += 1;
002A17DB  mov         eax,dword ptr [index]  
002A17DE  add         eax,1  
002A17E1  mov         dword ptr [index],eax  
	}
002A17E4  jmp         main+2Ch (02A17CCh)  
	//cout << sum << endl;

	// for语句
	//index = 1;
	sum = 0;
002A17E6  mov         dword ptr [sum],0  
	for (index = 1; index <= 100; ++index)
002A17ED  mov         dword ptr [index],1  
002A17F4  jmp         main+5Fh (02A17FFh)  
002A17F6  mov         eax,dword ptr [index]  
002A17F9  add         eax,1  
002A17FC  mov         dword ptr [index],eax  
002A17FF  cmp         dword ptr [index],64h  
002A1803  jg          main+70h (02A1810h)  
	{
		sum += index;
002A1805  mov         eax,dword ptr [sum]  
	{
		sum += index;
002A1808  add         eax,dword ptr [index]  
002A180B  mov         dword ptr [sum],eax  
	}
002A180E  jmp         main+56h (02A17F6h)  
	//cout << sum << endl;

	// do-while语句
	sum = 0;
002A1810  mov         dword ptr [sum],0  
	index = 1;
002A1817  mov         dword ptr [index],1  
	do 
	{
		sum += index;
002A181E  mov         eax,dword ptr [sum]  
002A1821  add         eax,dword ptr [index]  
002A1824  mov         dword ptr [sum],eax  
		index += 1;
002A1827  mov         eax,dword ptr [index]  
002A182A  add         eax,1  
002A182D  mov         dword ptr [index],eax  
	} while (index <= 100);
002A1830  cmp         dword ptr [index],64h  
002A1834  jle         main+7Eh (02A181Eh)  
	//cout << sum << endl;
```

从底层逻辑上看，do while循环的效率最高，for循环的效率最低。


### 多层循环与循环优化

请输出所有形如aabb的四位完全平方数：

```cpp
#include <iostream>
using namespace std;
#include <math.h>

int main()
{
	// aabb的完全平方数

	//方法一：一个显而易见的方法
	int n = 0;
	double m = 0;
	for (size_t a = 1; a < 10; a++)
	{// for1
		for (size_t b = 0; b < 10; b++)
		{// for 2
			n = a * 1100 + b * 11; //aabb
			//求平方根，看是否是整数
			m = sqrt(n);          
			if (m - int(m) < 0.00000001)  //当差值小于一个极小值即可，这个值和浮点数的精度有关
			{
				cout << n << endl;
			}
		}// for 2
	}// for1


	//方法二：逆向思维
	//先保证是平方根，再看是否是aabb类型
	//这样做第一不需要双层循环，第二避免了开平方根造成的精度丢失和低速运算
	int high, low;

	//不需要从1开始，31*31=961，32*32=1024
	for (size_t index = 31; ; index++)
	{
		n = index * index; //n就是我们要构造的完全平方数
		if (n < 1000)
			continue;   // 继续下一次循环
		if (n > 9999)
			break;        // 退出循环
		high = n / 100;   // 4567/100 = 45
		low = n % 100;   // 4567%100 = 67
		if ((high / 10 == high % 10) && (low / 10 == low % 10))   // 判断aa， bb
		{
			cout << n << endl;
		}
	}

	return 0;
}
```

&emsp;

# 函数

&emsp;&emsp;一个C++程序是由若干个源程序文件构成，一个源程序是由若干函数构成，函数将一段逻辑封装起来，便于复用；

&emsp;&emsp;从用户角度看，函数分成：

+ 库函数：标准函数，由C++系统提供；
+ 用户自定义函数：需要用户自定义后使用

&emsp;

&emsp;&emsp;函数的组成部分：

1. 返回类型：一个函数可以返回一个值；
2. 函数名称：函数的实际名称，函数名和参数列表一起构成了函数签名，函数签名才是被调用的真正名字；
3. 参数：参数列表包括函数参数的类型、顺序、数量。参数是可选的，可以不包含参数；
4. 函数主体：函数主体包含一组定义函数执行任务的语句。

## 参数传递

&emsp;&emsp;函数的参数传递分为形参和实参。形参出现在函数定义中，在整个函数体内都可以使用，离开函数体则不能使用。实参出现在主调函数中，进入被调函数中，实参变量也不可以使用。形参和实参的功能是做数据传送。发生函数调用时，主调函数把实参的值传送给被调函数的形参，从而实现主调函数向被调函数的数据传送。

&emsp;&emsp;C语言的传递方式有两种：值传递和指针传递；C++新增了引用传递。

&emsp;&emsp;给函数传递实参遵循变量初始化的规则。非引用类型的形参以相应实参的**副本**初始化，需要给形参分配存储单元，对形参的任何修改仅作用于副本，并不影响实参本身。如果传递的是对象，还将调用拷贝构造函数。

&emsp;&emsp;为了避免传递副本的开销，可以将形参指定为引用类型。传递引用不会再内存中产生实参的副本，是直接对实参操作。因此当传递的参数数据较大时，用引用比普通参数传递的效率和空间占用都要好。对引用形参的任何修改会直接影响实参本身，所以如果不需要修改相应实参，可以将引用形参定义为const。

&emsp;&emsp;使用指针作为函数的实参虽然也能达到使用引用的效果，但在被调函数中同样要给形参分配存储单元，且需要重复使用“*指针变量名”进行运算。这很容易产生错误且程序阅读性较差。且在主调函数的调用点必须传递实参的地址，相比较引用更复杂不清晰。

&emsp;&emsp;不过我们可以传递指针的引用：

```cpp
//两个数交换：
int swap(int& p, int& q)
{
	int temp = p;
	p = q;
	q = temp;
}


//两个指针交换：
int ptrswap(int* &v1. int* &v2) //v1是个引用，于指向int型对象的指针关联
{
	int* tmp = v2;
	v2 = v1;
	v1 = tmp;
}
```

## 默认参数

&emsp;&emsp;在函数声明或定义时，直接对参数赋值就是默认参数。在函数调用时没有指定与形参相对应的实参时就自动使用默认参数。

```cpp
int mal(int a, int b = 3, int c = 6, int d = 8)；

int mal(1); //b、c、d使用默认参数
```

&emsp;&emsp;默认参数只可以在函数声明中设定一次。只有在无函数声明时，才可以在函数定义中设定。

&emsp;&emsp;默认参数定义的顺序为自右到左。如果一个参数设定了默认值，那么其右边的参数都要有默认值。

&emsp;&emsp;默认值可以是全局变量、全局常量，甚至是一个函数，但不可以是局部变量。因为默认参数的调用是在编译器确定的，局部变量的位置与默认值在编译时无法确定。

## 可变参数

&emsp;&emsp;编程时可能会遇到一些参数可变的函数，比如printf()函数，原型如下，除了有一个参数format固定外，后面跟的参数的个数和类型是可变的，用三个点“...”做参数占位符

```cpp
int printf(const char* format, ...);
```

```cpp
//接受可变参数的函数实现多个数相加
int add(int num, ...)
{
	int sum = 0;
	int index = 0;
	int* p = (int*)&num + 1;
	for(; index < num; ++index){
		sum += *p++;
	}
}

int main()
{
	int i = 1, j = 2, k = 3;
	cout << add(3, i, j, k);
	return 0;
}
```

## 函数重载与Name Mangling

函数重载Overload，函数的名称一样，但参数列表不同：

```
int test(int a);
int test(double a);
int test(int a,double b);
```

程序是怎么选择调用哪个函数的呢？这就引入了Name Mangling，给重载的函数不同的签名，以避免调用时的二义性调用。

```cpp
#include <iostream>
using namespace std;
#include <math.h>

int test(int a)
{
	return a;
}

int test(double a)
{
	return int(a);
}

int test(int a, double b)
{
	return a + b;
}

int main()
{
	int result = test(1);
	result = test(2.0);
	result = test(1, 2.0);

	return 0;
}
```

观察编译生成的.obj中间代码，可以看到有三个test函数：

```
//?test@@YAHH@Z 
//?test@@YAHN@Z 
//?test@@YAHHN@Z
```

我们用VS自带的undname.exe工具，观察其中的一个可以看到：

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/undname.jpg)

即在程序中存储的是程序的签名。需要注意函数重载和函数的返回值无关，只和参数列表有关，返回值类型不影响函数的重载。如果参数类型相同，返回值不同，编译器会报错，这不是重载。

&emsp;

&emsp;&emsp;函数重载减少了函数命名的数量，避免了名字空间的污染。C++中类的构造函数全同名，如果没有重载机制实例化不同对象将非常麻烦。操作符重载本质上也是函数重载，大大丰富了已有操作符的含义。  

## 函数与指针

指针的功能很强大，我们可以让指针指向任意的地址空间，所以我们可以让指针指向一个函数。

```cpp
#include <iostream>

int test(int a)
{
	return a;
}

int test(double a)
{
	return int(a);
}

int test(int a, double b = 2.0)
{
	return a + b;
}

int main()
{
	//int test(int a)和int test(int a, double b = 2.0)都满足下面这个调用方法
	int result = test(1);

	//为了解决重载问题，可以使用函数指针调用
	int(*p)(int);  //定义一个指针p，表示参数是int，返回值是int的一个函数
	p = test;   //指针变量赋值，此时虽然有三个同名函数，但明确指向的是参数为int的函数
	int result = (*p)(1); //函数指针的使用，此时*p是间接引用


	return 0;
}
```

要注意区别指向函数的指针和返回指针的函数：

+ 每一个函数都占用一段内存单元，我们可以通过内存访问到函数，它们有个起始地址，我们可以用一个指针指向起始地址。指向函数入口地址的指针称为**函数指针**;


函数指针一般形式：数据类型(*指针变量名)(参数表)


+ 区分与返回指针的函数的区别
  + int(*p)(int);  //是指针，指向一个函数的入口地址
  + int* p(int);   //是函数，返回的值是int指针


```cpp
#include <iostream>
using namespace std;

int MaxValue(int x, int y)
{
	return (x > y) ? x : y;
}

int MinValue(int x, int y)
{
	return (x < y) ? x : y;
}

int Add(int x, int y)
{
	return x + y;
}

bool ProcessNum(int x, int y, int(*p)(int a, int b)) //参数中有函数指针
{
	cout << p(x, y) << endl;
	return true;
}

int main()
{
	int x = 10, y = 20;

	//直接用函数名做参数，只要保证函数的参数列表是两个int，返回值是int就可以
	ProcessNum(x, y, MaxValue);
	ProcessNum(x, y, MinValue);
	ProcessNum(x, y, Add);

	return 0;
}
```

&emsp;&emsp;上文的例子中，bool ProcessNum(int x, int y, int(*p)(int a, int b))参数有函数指针，我们把函数名传递进去，真正的调用是在这个函数体内部的。我们把这样的调用方式称为<u>**回调函数**</u>。

## 命名空间

&emsp;&emsp;开发过程中，可能会出现相同的函数签名，但内部实现不一样的情况。为了解决这个问题，可以使用命名空间。

&emsp;&emsp;命名空间这个概念，可作为附加信息来区分不同库中相同名称的函数、类、变量等，命名空间即定义了上下文。本质上，命名空间就是定义了一个范围。

&emsp;&emsp;关键词：using和namespace的使用。

```cpp
#include <iostream>
using namespace std;

int test(int a)
{
	return a;
}

namespace AA
{
	int test(int a)
	{
		return a + 1;
	}
}

int main()
{
	cout << test(1) << endl; //全局的

	cout << AA::test(1) << endl; //AA中的

	return 0;
}
```

&emsp;&emsp;在开发中，命名空间的使用非常广泛，尤其是使用第三方库的时候。程序中常用的cout就属于std命名空间。

## 内联函数

&emsp;&emsp;内联函数用inline修饰，分为两种：

1. **成员函数为内联**：

&emsp;&emsp;类中定义的成员函数默认全是内联的，可以显式的加上inline标识符，也可以不加。如果类中声明的函数没加inline，但类外定义时加了inline，该成员函数也是内联函数。

2. **普通函数为内联**：

&emsp;&emsp;通常在编译时，调用内联函数的地方将不使用函数调用，而是使用函数体直接替换调用处的函数名，形式类似宏替换，这种替换称为内联扩展。内联扩展可以消除函数调用时的时间开销。inline对编译器来说只是一个建议，编译器可以选择忽略。一般来说内联机制适用于优化小的、只有几行的但被经常调用的函数。大多数的编译器都不支持递归函数的内联。


```cpp
inline int MaxValue(int x,int y)
{
	return (x > y) ? x : y;
}
```

## 递归函数

&emsp;&emsp;递归是重要的程序设计方法。如果在一个函数、过程或数据结构的定义中又调用了它自身，那么这个函数、过程或数据结构称为是递归定义的。

### 数学归纳法

数学归纳法是证明当n等于任意一个自然数时某命题成立。证明步骤分两步：

1. 证明当n=1时命题成立；
2. 假设n=m时成立，那么可以推导出在n=m+1时命题也成立（m为任意自然数）

递归背后的数学逻辑就是数学归纳法。

```
斐波那契数列：1，1，2，3，5，8，13，21，34，……

1                                      n=1,2
Fib(n) = Fib(n-1)+Fib(n-2)             n>2

程序实现：
int Fib(int n)
{
	if(n == 0)
		return 0;
	else if(n == 1)
		return 1;
	else
		return Fib(n-1) + Fib(n-2);
}
```

### 递归的基本法则

1. 基准情形：必须存在无需递归就能解决的场景；
2. 不断推进：每一次递归调用都必须使求解状况朝着接近基准情形的方向推进；
3. 设计法则：假设所有的递归调用都能运行；
4. 合成效益法则：求解一个问题的同一个实例时，切勿在不同的递归调用中做重复性的工作；

### 递归的优化

&emsp;&emsp;递归是一种重要的编程思想，很多重要的算法都包含递归的思想；但递归在时间和空间上都有很大的缺陷：空间上需要开辟大量的栈空间；时间上可能需要大量的重复运算。

&emsp;

递归优化思路：

1. 尾递归：所有递归形式的调用都出现在函数的末尾；
2. 使用循环替代；
3. 使用动态规划，空间换时间；

```cpp
// 使用循环来代替递归调用
int Fib3(int n)
{
	if (n < 2)
	{
		return n;
	}
	int n0 = 0, n1 = 1;
	int temp;
	for (int i = 2; i <= n; i++)
	{
		temp = n0;
		n0 = n1;
		n1 = temp + n1;
	}
	return n1;
}

//循环调用避免了每次递归创建的函数入栈操作，减小空间使用
//也减少了重复运算
```

```cpp
//尾递归
int Fib2(int n, int ret0,  int ret1) //ret0和ret1入参是斐波那契的第一个值和第二个值
{
	if (n == 0)
	{
		return ret0;
	}
	else if (n == 1)
	{
		return ret1;
	}
	return Fib2(n - 1, ret1, ret0 + ret1);
}

//使用普通递归，return Fib(n-1) + Fib(n-2)是一个表达式，函数堆栈很复杂
// 每次递归调用都需要保存多个函数调用堆栈


//尾递归直接Fib2(n - 1, ret1, ret0 + ret1)，只是简单的函数调用，编译器会帮我们做优化
```

```cpp
//动态规划
int g_a[1000]; // 全局的数组，记录斐波那契数列的前1000个值

int Fib4(int n)
{
	//assert(n >= 0);
	g_a[0] = 0;
	g_a[1] = 1;
	for (int i = 2; i <= n; i++)
	{
		if (g_a[i] == 0) //全局变量初始化值为0，g_a[i]==0代表没计算过
		{
			g_a[i] = g_a[i - 1] + g_a[i - 2];
		}
	}
	return g_a[n];
}


//动态规划的思想就是空间换时间
//把曾经计算过的信息保存下来，不需要重复计算
```

&emsp;

## extern "C"

&emsp;&emsp;在C++程序中调用被C编译器编译后的函数，需要加extern "C"。

&emsp;&emsp;C++语言是一种面向对象编程语言，为了支持重载机制，在编译器生成的汇编代码中，要对函数的名字进行一些处理，加入比如函数的返回类型等信息。在C语言中，值是简单的函数名字而已，不会加入其他的信息，也就是说：C++和C语言对产生的函数名字的处理是不一样的。这样在链接阶段若是按照C++的函数命名规则去查找C编译器编译的函数，就会出现链接错误，

&emsp;&emsp;extern "C"告诉编译器该函数是用C编译器编译的，请用C的方式来链接它们，从而解决了此问题。

```c
//用法1：
extern "C" void fun();


//用法2：
extern "C"
{
	void fun();
}


//用法3，将这些函数放在头文件中:
extern "C"{
	#include "head.h"
}
```