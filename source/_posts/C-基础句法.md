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

## if分支语句
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

if语句练习：判断一个整数是否是另一个整数的倍数
```cpp
#include <iostream>
using namespace std;

int main()
{
	// b是否是a的倍数
	int a = 0;
	int b = 4;
    //短路运算，除数不能为0
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

## switch分支语句

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
2. if开始处几个分支效率高，之后效率递减；
3. switch的所有case速度几乎一样。