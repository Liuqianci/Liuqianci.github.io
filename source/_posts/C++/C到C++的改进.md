---
title: C到C++的改进
date: 2025-04-02 15:51:49
tags:
    - C++基础
categories:
    - C++
mathjax: true
---

# C语言字符的语法陷阱

先看C语言中常见的词法、语法问题：

```cpp
char c1 = 'yes';
/*
* 不符合常理，但这样定义没有错误
* 编译器会截断
* 至于是保留第一个还是最后一个，这个和编译器有关
* 虽然没报错，但编译器会有warning
*/

	
char c2 = "yes";
/*
* 编译器报错
* "yes"是一个字符串，c2只是一个字符变量，不能存储字符串
*/

const char* slash = "/";
/*
字符串的正确定义方法
slash中存放两个字符：'/'、'\0'
这样其实就是把字符串的首地址给了指针变量
*/

const char* slash2 = '/';
/*
编译器报错
字符的类型不能给指针，两个变量类型不匹配
*/

const char* slash3 = &c1;
/*
正确
slash3指针变量存放c1单个字符的地址
*/
```
&emsp;&emsp;从上面的例子可以看到，C语言是高级语言中的低级语言，优点是小巧、高效、接近底层，比如上面的例子就把字符和字符串区分的很细，但缺点就是细节和陷阱比较多。为了更好的解决这个问题，C++在兼容C语言的同时，推出了既高效又易于大规模开发的机制：string类的使用:

```cpp
#include <string>

string s1(1,'yes');  //s
string s2(3,'yes');  //sss
string s3(1,'y');    //y
string s4("/");      // /
string s5(1,'/');    // /
string s6("yes");    //yes
```

# C语言指针和数组的关系问题

c语言数组在作为参数时的退化行为，退化为一个指针。

给定一个数组，计算数组中的数据的平均数，有以下代码：

```cpp
//计算平均数
double average1(int arr[10])
{
	double result = 0.0;
	int len = sizeof(arr) / sizeof(arr[0]);
	std::cout << "In average1 : " << len << std::endl;
	for (int i = 0; i < len; i++)
	{
		result += arr[i];
	}

	return result / len;
}

int main()
{
	int array1[] = { 10,20,30,40,50,60,70,80,90,100 };

	//数组长度最好是用变量这样来求，不要写成常量
	//这样方便扩展
	int len = sizeof(array1) / sizeof(array1[0]);
	std::cout << "len : " << len << std::endl;

	std::cout << average1(array1) << std::endl;

	return 0;
}
```

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/c%E9%99%B7%E9%98%B11.png)

&emsp;&emsp;可以看到输出的值并不是平均数，通过输出中间数据可以知道，main函数中的长度是10，而average1中的数组长度是1；

&emsp;&emsp;出现这个的原因就是C预言数组在作为函数参数传递时会退化为一个指针，average1中的入参实际上只是函数的首地址，sizeof(arr)输出的只是单个元素的长度。

&emsp;&emsp;可以进行如下优化，通过外部把数组长度先行计算出来然后传递给函数。需要注意，如果传递的是字符数组的话就不需要这么麻烦了，因为字符数组往往是通过'\0'结尾的，函数内部有办法知道数组的长度。

```cpp
//直接把数组长度传递进来
double average2(int arr[10], int len)
{
	double result = 0.0;

	for (int i = 0; i < len; i++)
	{
		result += arr[i];
	}

	return result / len;
}

int main()
{
	int array1[] = { 10,20,30,40,50,60,70,80,90,100 };

	int len = sizeof(array1) / sizeof(array1[0]);

	std::cout << average2(array1,len) << std::endl;

	return 0;
}
```
&emsp;&emsp;

&emsp;&emsp;其实知道数组当作函数参数传递时会发生退化时，就可以不传递数组，而是只传递指针：

```cpp
double average2(int* arr, int len)
{
	double result = 0.0;

	for (int i = 0; i < len; i++)
	{
		result += arr[i];
	}

	return result / len;
}
```
&emsp;&emsp;

&emsp;&emsp;C语言之所以要这么做，是和c语言发展分不开的。c语言早期是伴随着unix操作系统，是非常底层的，对空间要求非常高的语言。如果函数传参时传递了一个非常大的数据容器，空间转移的效率是非常低的。所以C语言设计者就通过传递指针和容器尺寸这样一种传递方式从而达到节省空间的目的。

&emsp;&emsp;

&emsp;&emsp;C++的解决方案就是引入STL容器，实现底层包装，保证效率的同时也保证简单安全。

```cpp
#include <vector>

//这里传递的是引用
//如果传递的是vector本身，c++这里会产生一个副本，如果容器很大会得不偿失
double average3(std::vector<int>& v)
{
	double result = 0.0;
	std::vector<int>::iterator it = v.begin();
	for (;it!=v.end();++it)
	{
		result += *it;
	}

	return result / v.size();
}

int main()
{
    std::vector<int> vt = { 10,20,30,40,50,60,70,80,90,100 };
	std::cout << average3(vt) << std::endl;

    return 0;
}
```

&emsp;&emsp;使用stl容器后，哪怕是二维数组，处理起来也很方便了：

```cpp
double average2DV(vector<vector<int> >& vv)
{
	double result = 0.0;
	unsigned int size = 0;

	for (unsigned int i = 0; i < vv.size(); ++i)
	{
		for (unsigned int j = 0; j < vv[i].size(); ++j)
		{
			result += vv[i][j];
			size += 1;
			cout << vv[i][j] << " ";
		}
		cout << endl;
	}

	return result / size;
}

int main()
{
    vector<vector<int> > vv2D{8, vector<int>(12,3) }; //8个vector，每个包含12个3
    cout << average2DV(vv2D);
    return 0;
}
```


# C语言的移位问题

问题一：右移操作：无法区分是逻辑右移还是算术右移。

```cpp
#include<cstdio>

#include <bitset>
#include <iostream>
using namespace std;

int main()
{
	
	char a1 = 0x63;       // 0110 0011
	a1 = (a1 << 4);        // 0011 0000
	printf("0x%x\n", a1);  //左移操作，末位补0

	a1 = 0x63;                // 0110 0011
	a1 = (a1 >> 4);        //  0000 0110 逻辑右移
	printf("0x%x\n", a1);  // 逻辑右移自动补0


	char a2 = 0x95;       // 1001 0101
	a2 = (a2 << 4);        // 0101 0000
	printf("0x%x\n", a2);  //左移操作，末位补0

	a2 = 0x95;                // 1001 0101
	a2 = (a2 >> 4);        //  1111 1001 算术右移
	printf("0x%x\n", a2);   //这里执行的是算数右移操作，补1了

	return 0;
}
```

&emsp;&emsp;上面可以看到，C语言在执行右移操作时表现不同，而不同的编译器输出的结果可能都不一样，C语言并没有做统一标准。C语言官方的做法是在做右移操作时，把操作数都变为无符号的数，这样可以保证执行的是逻辑右移操作（补0）。原因是无符号数首位都是0，可以保证补位的数也是0。

```c
int main()
{
	
	unsigned char a3 = 0x63;       // 0110 0011
	a3 = (a3 << 4);        // 0011 0000
	printf("0x%x\n", a3);

	a3 = 0x63;                // 0110 0011
	a3 = (a3 >> 4);        //  0000 0110 逻辑右移
	printf("0x%x\n", a3);


	unsigned char a4 = 0x95;       // 1001 0101
	a4 = (a4 << 4);        // 0101 0000
	printf("0x%x\n", a4);

	a4 = 0x95;                // 1001 0101
	a4 = (a4 >> 4);        //  0000 1001 逻辑右移
	printf("0x%x\n", a4);

	return 0;
}
```
&emsp;&emsp;

&emsp;&emsp;

问题二：移位操作位数的限制。

```c
int main()
{
    //示例常见与权限控制，每一位代表不同的权限
	//0000 0000
	const unsigned char priv = 0xFF;  //初始化权限
	const unsigned char P_BAKCUP = (1<<7);  //备份权限
	const unsigned char P_ADMIN = (1<<8);   //最高权限

	printf("0x%x\n", P_BAKCUP);
	printf("0x%x\n", P_ADMIN);
	if (priv & P_BAKCUP)
	{
		cout << "BAKUP" << endl;
	}
	if (priv & P_ADMIN)
	{
		cout << "ADMIN" << endl;
	}
	return 0;
}
```

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/c%E9%99%B7%E9%98%B12.png)

&emsp;&emsp;由运行结果可以看到，char本身就只有8位，P_ADMIN的移位操作已经超过了8位，这时候所有的8位都被清零了。这是C语言编码常见错误，移位操作一定要注意操作位数上限，移位数大于0，小于位数；


&emsp;&emsp;

&emsp;&emsp;出现上面两个问题的原因就是，C语言设计移位操作时需要考虑操作数表示的上下文环境。C++为了对这个问题做改进，引入了bitset：

```cpp
#include <bitset>

int main()
{
    // bitset
	bitset<10> priv = 0xFF;  //手动控制，这里就只有10位
	bitset<10> P_BAKCUP = (1 << 6);
	bitset<10> P_ADMIN = (1 << 7);

    //这里可以直接输出
	cout << priv << endl;
	cout << P_BAKCUP << endl;
	cout << P_ADMIN << endl;

	if ((priv & P_BAKCUP) == P_BAKCUP)
	{
		cout << "BAKUP" << endl;
	}
	if ((priv & P_ADMIN) == P_ADMIN)
	{
		cout << "ADMIN" << endl;
	}

	return 0;
}
```

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/c%E9%99%B7%E9%98%B13.png)


# C语言强制类型转换问题

C语言中强制类型转换隐藏了很多bug和陷阱：

```c
#include <iostream>
using  namespace std;

int main()
{
	int array[] = { 1,2,3 };
	cout << sizeof(array) / sizeof(array[0]) << endl;
	int threshold = -1;
	
	if (sizeof(array) / sizeof(array[0]) > threshold)
	{
		cout << "positive number array" << endl;
	}
	else
	{
		cout << "negative number array" << endl;
	}

	return 0;
}
```

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/c%E9%99%B7%E9%98%B14.png)

&emsp;&emsp;上面的代码当数组长度大于0时，需要输出“positive number array”，否则输出“negative number array”。可以通过编译运行后，长度输出为3是正确的，但判断逻辑里却输出了“negative number array”。

&emsp;&emsp;发生这个问题的原因是sizeof的返回值是unsigned int,是无符号数，但threshold却是一个有符号数，在执行比较判断语句时，C语言的机制把threshold转换为了一个无符号数，然后才进行的比较。这里发生的是**隐式类型转换**。-1转换为unsigned int时会变为4294967295，是个很大的正整数（这里涉及到了补码转换）。

&emsp;&emsp;C语言在编写时，可以先用一个有符号的数把数据先取出来。今后编码时也需要注意，尽量避免用无符号的数据来进行数据比较：

```c
#include <iostream>
using  namespace std;

int main()
{
	int array[] = { 1,2,3 };
	cout << sizeof(array) / sizeof(array[0]) << endl;
	int threshold = -1;
	int len = sizeof(array) / sizeof(array[0]);  //用一个有符号的变量先把数据拿出来
	
	if (len > threshold)
	{
		cout << "positive number array" << endl;
	}
	else
	{
		cout << "negative number array" << endl;
	}

	return 0;
}
```

&emsp;&emsp;

&emsp;&emsp;

类型转换还可能会发生在以下情况：假设要计算1+1/2+1/3+……+1/n，如果代码是这么写的：

```c
// 1+1/2+1/3+1/4+... +1/n
double getSum(int n)
{
	double result = 0.0;
	for (int i = 1; i < n + 1; i++)
	{
		result += 1 / i;
	}
	return result;
}

int main()
{
	int n = 0;
	cin >> n;
	cout << getSum(n) << endl;

	return 0;
}
```

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/c%E9%99%B7%E9%98%B15.png)

可以看到，计算出的结果是1。这里的问题出在“result += 1/n”这句中，被除数是整形，除数也是整形，那么计算结果也是整型值。result虽然会转换为浮点数，但整形计算中已经丢失了精度。

c语言中的一个解决方法是把被除数先转换为浮点数：

```c
// 1+1/2+1/3+1/4+... +1/n
double getSum(int n)
{
	double result = 0.0;
	for (int i = 1; i < n + 1; i++)
	{
		result += 1.0 / i;  //把被除数换成浮点数，那么结果会被转换为浮点数
	}
	return result;
}

int main()
{
	int n = 0;
	cin >> n;
	cout << getSum(n) << endl;

	return 0;
}
```
&emsp;&emsp;

&emsp;&emsp;

&emsp;&emsp;上面两个例子可以看到，有时候我们会忽略C语言的隐式类型转换，导致出现程序bug；但有时候我们又需要这种隐式类型转换来得到我们想要的结果。c语言中滥用类型转换可能导致灾难性的后果，且很难排查。C语言之所以这么设计，是因为类型转换在底层语言中的运用非常广泛，且灵活方便。C++为了方便排查隐藏bug减少复杂性，提供了四种类型转换的方式：**static_cast、const_cast、dynamic_cast、reinterpret_cast**。

+ static_cast：其实就是类似于C语言中的类型转换，C++提供了这么一种标准格式用于显示类型转换，可以方便程序员精准定位程序哪里使用了强制类型转换；
+ const_cast：只针对去除const属性；
+ dynamic_cast：用于类的继承关系转换，比如把子类转换为父类、或者父类转换为子类；
+ reinterpret_cast：用于指针的转换；


```cpp
// 1+1/2+1/3+1/4+... +1/n
double getSum(int n)
{
	double result = 0.0;
	for (int i = 1; i < n + 1; i++)
	{
		result += static_cast<double>(1) / i;
	}
	return result;
}

int main()
{
	int n = 0;
	cin >> n;
	cout << getSum(n) << endl;

	return 0;
}
```

# C语言的整数溢出问题

&emsp;&emsp;32位系统中，一个整数占用4个字节，共32位。其中第一位是符号位，所以一共有31位可以表示整数范围。如果计算的时候，如果我们算出的数值超出了数据表示范围，那么会数据溢出变为负数。要注意C语言中的整数不能和数学上的整数划等号。

```c
int main()
{
	int i = 2147483640;
	for (; i > 0; i++)
	{
		cout << "adding " << i << endl;
	}
	cout << "exit " << i << endl;

	return 0;
}
```

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/c%E9%99%B7%E9%98%B16.png)

&emsp;&emsp;出现这个问题的原因和系统的设计是有关的。数据存储空间是有限的，不能无限增长。C语言的一个解决方案是通过字符串的方式来表达大数的运算，字符串理论上是可以无限长的，C语言是有这个类库的，但并没有直接的解决方案。 C++本身也没有提供好的解决方案，但boost库中提供了cpp_int方法：[boost官网](https://www.boost.org/)

&emsp;&emsp;

# C语言字符串的典型缺陷

&emsp;&emsp;C标准字符和字符串的区别是：字符是单引号括起来的，字符串是双引号括起来的，由'\0'结尾。而'\0'作为结束符这个方式，表达能力有天生的缺陷：一旦字符串中间具有'\0'字符，那么c语言的字符串函数就会认为这个字符已经结束了。如果用c语言的方式存储一些图片或者其他二进制的内容，很容易出问题。

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/c%E9%99%B7%E9%98%B17.png)

&emsp;&emsp;C语言的字符串操作还有另一个问题就是效率低下。C语言的字符处理函数都是通过遍历'\0'来寻找字符串结尾的，这个遍历操作会消耗性能。

&emsp;&emsp;C语言设计这种字符串处理方式主要是为了节省空间，有针对性的设计问题。C++语言为了解决这个问题有以下几种思路：

+ C++的string类
+ 开源库[Redis](https://github.com/redis)解决方案，[redis官网](https://redis.io/)

```cpp
int main()
{
	cout << "Testing C++ String: " << endl;
	string sstr1 = "string";
	cout << sstr1.length() << endl;  //字符串内容的长度
	cout << sstr1.capacity() << endl; //string的容量长度
	cout << sizeof(sstr1) << endl;  //实际内存分配长度，不同平台的值可能不一致，但实际大小肯定会大于内容长度

	cout << endl;

	cout << "sstr2: " << endl;
	string sstr2 = "stri\0ng";
	cout << sstr2.length() << endl;
	cout << sstr2.capacity() << endl;
	cout << sizeof(sstr2) << endl;

	cout << endl;

	cout << "sstr1: " << endl;
	sstr1 += sstr2;   //字符串直接拼接
	cout << sstr1.length() << endl;
	cout << sstr1.capacity() << endl;
	cout << sizeof(sstr1) << endl;

	return 0;
}
```
![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/c%E9%99%B7%E9%98%B18.png)


&emsp;&emsp;可以看到，string类的实现方案中，内部不仅记录了字符串的内容，还有几个变量记录了字符串内容的长度、容量等，在执行字符串操作时不需要遍历寻找'\0'，提高了效率；但是依旧保留了c风格字符串以'\0'结尾的传统，还具有一些缺陷。

