---
title: STL基础
date: 2025-05-21 11:30:40
tags:
    - C++进阶
categories:
    - C++
mathjax: true
---

# STL标准模板库

&emsp;&emsp;STL全称Standard Template Library，标准模板库。STL算法是泛型的(generic)，不与任何特定数据结构和对象绑定，不必再环境类似的情况下重写代码。STL算法可以量身定做，并且具有很高的效率。STL可以进行扩充，我们可以编写自己的组件并且能够与STL标准的组件进行很好的配合。

&emsp;&emsp;STL标准库有六大组件：

+ 空间配置器：allocator；
+ 容器：string、vector、list、deque、map、set、multimap、multiset；
+ 适配器：stack、queue、priority_queue；
+ 仿函数：greater、less等；
+ 算法：find、swap、reverse、sort、merge等；
+ 迭代器：iterator、const_iterator、reverse_iterator、const_reverse_iterator;

&emsp;&emsp;空间配置器帮助我们管理分配内存的事情，从而来给容器分配内存；容器存储数据；迭代器帮助算法处理容器中的数据；仿函数辅助算法实现。

&emsp;&emsp;

# 容器(container)

&emsp;&emsp;STL容器的作用用于存放数据，除了引用类型外，所有内置或复合类型都可用作容器的元素类型。引用不支持一般意义的赋值运算，因此没有元素是引用类型的容器。

&emsp;&emsp;在容器中添加元素时，系统是将元素值复制到容器里。类似的，使用一段元素初始化新容器时，新容器存放的是原始元素的副本。被复制的原始值与新容器中的元素各不相关，此后，新容器内元素值发生变化时，被复制的原值不会受到影响，反之亦然。

STL容器分为两大类：

+ 序列式容器：其中的元素都是可排序的，STL提供了vector、list、deque等序列式容器，而stack、queue、priority_queue则是容器适配器；
+ 关联式容器：每个数据元素都是由一个键(key)和值(value)组成，当元素被插入到容器时，按照其键以某种特定规则放入适当位置，key必须是唯一的；常见的STL关联容器有set、multiset、map、multimap；

## 序列型容器的基本使用

1. **vector**

&emsp;&emsp;vector的数据安排以及操作方式类似数组。两者唯一的差别在于空间运用的灵活性。数组是静态空间，一旦配置了就不能改变；vector是动态空间，随着元素的加入，它的内部机制可以动态增加或减少元素，内存管理自动完成，但程序员可以使用reverse()来管理内存。

&emsp;&emsp;vector类提供了两个成员函数：capacity和reverse，使程序员可与vector容器内存分配的实现部分交互工作。capacity操作获取在容器需要分配更多的存储空间之前能够存储的元素总数，而reverse操作则告诉vector容器应该预留多少个元素的存储空间。

&emsp;&emsp;capacity和size的区别：size指容器当前拥有的元素个数；capacity指容器必须在分配新存储空间之前可以存储的元素总数。插入元素时，若size < capacity，则直接插入数组，当元素个数超过capacity()时，因为旧空间不足而需要重新分配一块更大空间，通常多数实现是将capacity增加一倍(capacity为0时，增加1)；然后重新分配一块大小等于新capacity的内存；接着复制旧元素到到新内存中，最后释放旧内存，并追加新的数据。

&emsp;&emsp;push_back操作接受一个元素值，并将它作为一个新的元素添加到vector对象的后面，也就是“插入”到vector对象“后面”。vector在末尾增加或删除元素所需时间与元素数目无关，在中间或开头增加或删除元素所需时间隋元素数目呈线性变化。

&emsp;&emsp;vector的迭代器在内存重新分配时将失效（它所指向的元素在该操作的前后不再相同）。插入元素后，指向当前插入元素之后的任何元素的迭代器都将失效。当插入元素后，元素个数超过capacity()时，内存会重新分配，此时所有的迭代器都将失效。当删除元素时，指向被删除元素之后的任何元素的迭代器都将失效。

&emsp;&emsp;clear()方法可以清空内部数据，但需要注意此时仅仅是size()=0，实际的内存并没有释放掉。如果需要强行释放，可与用swap的方法，交换迭代器的地址，即："v.swap(vector<T>())"直接释放v的内存。

1. **list**

&emsp;&emsp;list的内部数据结构是一个双向环状链表，故不能随机访问一个元素(没有find操作)，但可以双向遍历，可动态增加或减少元素，内存管理自动完成，增加任何元素都不会使迭代器失效。删除元素时，除了指向当前被删除元素的迭代器外，其他迭代器都不会失效。

3. **deque**

&emsp;&emsp;vector是单向开口的连续线性空间，deque则是一种双向开口的连续线性空间，可以在头尾两端分别做元素的插入和删除操作。vector从技术上也可以双端操作，但头部操作的效率奇差，无法被接受。

&emsp;&emsp;deque和vector的另一个差异是deque没有容量(capacity)的概念，因为它是动态地以分段连续空间组合而成的，随时可以增加一段新的空间并链接起来。

&emsp;&emsp;deque的特点是：1）随机访问每个元素，所需要的时间为常量；2）在开头和末尾增加元素所需要的时间与元素数目无关，在中间增加或删除元素所需要的时间随元素数目呈线性变化；3）可动态增加或减少元素，内存管理自动完成，不提供用于内存管理的成员函数；

```cpp
#include <vector>
#include <list>
#include <queue>
#include <stack>
#include <map>
#include <string>
#include <functional>
#include<algorithm>
#include <utility>
#include <iostream>
using namespace std;

//结构体中重载了函数调用运算符operator()，可以让其像函数一样被调用
//常用于STL算法中的回调
//这样写可以让函数以一个类对象的形式被调用
struct Display
{
	void operator()(int i)  
	{
		cout << i << " ";
	}
};

int main()
{
	int iArr[] = { 1, 2,3,4,5 };

	vector<int> iVector(iArr, iArr + 4);  //传递首地址和尾地址，用一个数组初始化vector
	list<int> iList(iArr, iArr + 4);
	deque<int> iDeque(iArr, iArr + 4);

	//下面三个是容器适配器，不是容器
	queue<int> iQueue(iDeque);     // 队列 先进先出
	stack<int> iStack(iDeque);         // 栈 先进后出
	priority_queue<int> iPQueue(iArr, iArr + 4);  // 优先队列，按优先权，默认从大到小

	//序列型容器的遍历
	//for_each:遍历，传递首尾和一个函数，对于遍历的每一个元素都调用一次函数
	for_each( iVector.begin(), iVector.end(), Display() );
	cout << endl;
	for_each(iList.begin(), iList.end(), Display());
	cout << endl;
	for_each(iDeque.begin(), iDeque.end(), Display());
	cout << endl;


	//容器适配器的遍历：
	while ( !iQueue.empty() )
	{
		cout << iQueue.front() << " ";  //输出队首 1 2 3 4
		iQueue.pop();  //弹出队首
	}
	cout << endl;

	while (!iStack.empty())
	{
		cout << iStack.top() << " ";    // 输出栈顶 4 3 2 1
		iStack.pop();  //弹出栈顶
	}
	cout << endl;

	while (!iPQueue.empty())
	{
		cout << iPQueue.top() << " "; // 不设置的话默认从大到小4 3 2 1
		iPQueue.pop();
	}
	cout << endl;



    return 0;
}

```
&emsp;

## 关联式容器的基本使用

&emsp;&emsp;关联容器和序列容器的本质差别在于：关联容器通过键(key)存储和读取元素，而顺序容器则通过元素在容器中的位置顺序存储和访问元素。虽然关键容器的大部分行为与顺序容器相同，但其独特之处在于支持键的使用。

&emsp;&emsp;所有关联式容器的底层都是通过红黑树实现的。

1. **map**

&emsp;&emsp;map的所有元素的键值都会被自动排序。map的所有元素都是pair，同时拥有实值和键值。pair的第一元素被视为键值，第二元素被视为实值。map不允许两个元素拥有相同的键值。

&emsp;&emsp;map拥有跟list相同的某些性质：当客户端对它进行元素新增操作或删除操作时，除了被删除的那个元素的迭代器之外，操作之前的所有迭代器，在操作之后依然有效。

&emsp;&emsp;multimap的特性以及用法和map完全相同，唯一的差别在于它允许键值重复。

2. **set**

&emsp;&emsp;set的所有元素都会根据元素的键值被自动排序，set的元素不像map那样可以同时拥有实值和键值，set元素的键值就是实值。set不允许两个元素有相同的键值。

&emsp;&emsp;set拥有跟list相同的某些性质：当客户端对它进行元素新增操作或删除操作时，除了被删除的那个元素的迭代器之外，操作之前的所有迭代器，在操作之后依然有效。

&emsp;&emsp;multiset的特性以及用法和set完全相同，唯一的差别在于它允许键值重复。

```cpp
struct Display
{
	void operator()(pair<string, double> info)
	{
		cout << info.first << ": " << info.second << endl;
	}
};

struct cmpMap
{
	bool operator()(pair<string, double> a, pair<string, double> b)
	{
		return a.first.length() < b.first.length();
	}
};


int main()
{
	map<string, double> studentSocres;

	//map可以用类似数组的方式来添加
	studentSocres["LiMing"] = 95.0;
	studentSocres["LiHong"] = 98.5;

	//map也可以用pair来添加
	studentSocres.insert( pair<string, double>("zhangsan", 100.0) );
	studentSocres.insert(pair<string, double>("Lisi", 98.6));
	studentSocres.insert(pair<string, double>("wangwu", 94.5));
	studentSocres.insert(pair<string, double>("wangwu", 96.5)); //这是失败的操作，因为key值重复了

	//map还可以用value_type来添加，是泛型编程的方式
	studentSocres.insert(map<string, double>::value_type("zhaoliu", 95.5) );
	studentSocres["wangwu"] = 88.5;  //想修改已经存在的key值的操作，要用这个方式



	// map用for_each遍历
	for_each(studentSocres.begin(), studentSocres.end(), Display());
	cout << endl;

	// map用find查找，查找结果会返回一个迭代器
	map<string, double>::iterator iter;
	iter = studentSocres.find("zhaoliu");
	if (iter != studentSocres.end())
	{
		cout << "Found the score is: " << iter->second << endl;
	}
	else
	{
		cout << "Didn't find the key." << endl;
	}

	// 使用迭代器完成遍历查找的过程
	iter = studentSocres.begin();
	while (iter != studentSocres.end())
	{
		if (iter->second < 98.0)  // 去除不是优秀的同学
		{
			studentSocres.erase(iter++);  // 注意：迭代器失效问题
			// erase后，当前传递的迭代器参数就失效了，所以必须要++指向后一个元素
		}
		else
		{
			iter++;
		}
	}
	for_each(studentSocres.begin(), studentSocres.end(), Display());
	cout << endl;

	
	for (iter = studentSocres.begin(); iter != studentSocres.end(); iter++)
	{
		if (iter->second <= 98.5)
		{
			iter = studentSocres.erase(iter);  // 注意：迭代器失效问题
			// erase的返回值指向迭代器的下一个元素，如果不想在参数里做iter++，就把返回值获取下
		}
	}
	for_each(studentSocres.begin(), studentSocres.end(), Display());
	cout << endl;

	// find得到并删除元素
	iter = studentSocres.find("LiHong");
	studentSocres.erase(iter);  //这里最好做个判空操作
	for_each(studentSocres.begin(), studentSocres.end(), Display());

	int n = studentSocres.erase("LiHong1"); //返回的是去除元素的计数值，不为零就是成功
	cout << n << endl;
	for_each(studentSocres.begin(), studentSocres.end(), Display());


	// 一次性清空所有元素
	studentSocres.erase(studentSocres.begin(), studentSocres.end());
	for_each(studentSocres.begin(), studentSocres.end(), Display());
	cout << endl;

    return 0;
}
```

## 容器的选用

&emsp;&emsp;list容器表示不连续的内存区域，允许向前和向后逐个遍历元素。在任何位置都可高效地insert或eraser一个元素。插入或删除list容器中的一个元素不需要移动任何其他元素。另一方面，list不支持随机访问，访问某个元素要求遍历涉及的其他元素。

&emsp;&emsp;对于vector容器来说，除了容器尾部外，其他任何位置的插入和删除操作都要求移动被插入或删除的元素右边的所有元素。

&emsp;&emsp;deque容器有更加复杂的数据结构。从deque队列的两端插入和删除元素都非常快。在容器中间插入或删除比较慢。deque容器支持堆所有元素的随机访问。

&emsp;&emsp;综上所述，容器选择的法则为：

1. 如果程序要求随机访问元素，则应使用vector或deque；
2. 如果程序必须在容器的中间位置插入或删除元素，则应采用list；
3. 如果程序需要在首部或尾部插入或删除元素，使用deque；
4. 如果只需要在读取输入时在容器的中间位置插入元素，然后需要随机访问元素，则可以在输入时将元素读入到一个list容器，接着对list容器重新排序，使其适合顺序访问，然后将排序后的list容器复制到一个vector中；
5. 如果既需要随机访问又需要在容器中间插入或删除数据，那么需要考虑那种操作的代价更大，主要看哪种操作的概率更大；
6. 如果实在不知道选取哪个容器，则编写代码时应尝试只使用vector和list容器提供的操作：使用迭代器而不是下标访问，并且避免随机访问元素。这样编写后，在必要时可以很方便的将程序从使用vector容器修改为使用list容器；

&emsp;

# 仿函数(functor)

&emsp;&emsp;仿函数一般不会单独使用，主要是为了搭配STL算法。STL主要是为了提高代码的复用性，早期C++为了提高复用性一般使用函数指针，但是函数指针不能满足STL对抽象性的要求，不能满足软件积木的要求，无法和其他STL组件搭配。仿函数的本质就是一个重载了operator()的类，创建一个行为类似函数的对象。

```cpp
// 不同方式实现对数组元素的排序
// sort是C++中的一个排序算法


#include <algorithm>
#include <iostream>
using namespace std;

//C++函数
bool MySort(int a, int b)
{
	return a < b;
}
void Display(int a)
{
	cout << a << " ";
}

// 泛型编程
// 定义为const&是为了优化，如果将来传递进来的是个对象，只需要传引用即可
template<class T>
inline bool MySortT(T const& a, T const& b)
{
	return a < b;
}
template<class T>
inline void DisplayT(T const& a)
{
	cout << a << " ";
}

// 仿函数
struct SortF
{
	bool operator() (int a, int b)
	{
		return a < b;
	}
};
struct DisplayF
{
	void operator() (int a)
	{
		cout << a << " ";
	}
};

// C++仿函数模板
template<class T>
struct SortTF
{
	inline bool operator() (T const& a, T const& b) const
	{
		return a < b;
	}
};
template<class T>
struct DisplayTF
{
	inline void operator() (T const& a) const
	{
		cout << a << " ";
	}
};


int main()
{
	// C++方式
	// 缺点是不通用，不同的数据类型要写不同的MySort函数
	int arr[] = { 4, 3, 2, 1, 7 };
	sort(arr, arr + 5, MySort); //传递排序函数
	for_each(arr, arr + 5, Display);
	cout << endl;

	// C++泛型
	int arr2[] = { 4, 3, 2, 1, 7 };
	sort(arr2, arr2 + 5, MySortT<int>);
	for_each(arr2, arr2 + 5, DisplayT<int>);
	cout << endl;

	// C++仿函数
	int arr3[] = { 4, 3, 2, 1, 7 };
	sort(arr3, arr3 + 5, SortTF<int>() );
	for_each(arr3, arr3 + 5, DisplayTF<int>());
	cout << endl;

	// C++仿函数模板
	int arr4[] = { 4, 3, 2, 1, 7 };
	sort(arr4, arr4 + 5, SortF());
	for_each(arr4, arr4 + 5, DisplayF());
	cout << endl;

    return 0;
}
```

&emsp;

# 算法(algorithm)

STL中算法大致分为4类，包含<algorithm>、<numeric>、<functional>。

1. 非可变序列算法：不直接修改其操作的容器内容的算法；
2. 可变序列算法：可以修改它们操作容器内容的算法；
3. 排序算法：包括对序列进行排序和合并的算法、搜索算法以及有序序列上的集合算法；
4. 数值算法：对容器内容进行数值计算；

&emsp;&emsp;最常见的算法包括查找、排序和通用算法，排列组合算法、数值算法、集合算法等。

```cpp
#include <vector>
#include <algorithm>
#include <functional>
#include <numeric>
#include<iostream>
using namespace std;


int main()
{   
	// transform和lambda表达式
	// transform是数值算法函数，有多个重载
	// 主要参数就是传递入容器的范围和范围内元素需要执行的函数。
	int ones[] = { 1, 2, 3, 4, 5 };
	int twos[] = { 10, 20, 30, 40, 50 };
	int results[5];

	//参数：第一个容器起始、第一个容器结尾，第二个容器(范围不能小于第一个容器)
	//resulte用于接收结果，要保证空间足够
	//std::plus是STL中的模板类仿函数方法，
	transform(ones, ones + 5, twos, results, std::plus<int>()); 
	for_each(results, results + 5,
		[ ](int a)->void {
		cout << a << endl; } ); // lambda表达式（匿名函数）
	cout << endl;




	// find 查找算法
	int arr[] = { 0, 1, 2, 3, 3, 4, 4, 5, 6, 6, 7, 7, 7, 8 };
	int len = sizeof(arr) / sizeof(arr[0]);


	cout << count(arr, arr + len, 6) << endl; // 统计“6”这个元素的个数，输入容器范围和元素
	cout << count_if(arr, arr + len, bind2nd(less<int>(),  7) ) << endl; // 统计<7的个数
/*
bind2nd是模板方法，输入一个函数和一个变量，函数调用这个变量
bind2nd和bind1st是对应的方法，bind1st的入参是运算左边的数，bind2nd的入参是运算右边的数
比如bind2nd(less<int>(),  7)，7是右边的数，意思是“?<7”,有几个比7小的数
bind1st(less<int>(),  7)，7是左边的数，意思是“7<？”,7比几个数小，也就是有几个数比7大
当然也可以把less<int>()换成greater<int>(),一个是小，一个是大
*/
	cout << binary_search(arr, arr + len, 9) << endl;   // 二分查找，找元素"9",返回是否找到

	vector<int> iA(arr + 2, arr + 6);   // {2,3,3,4}，创建一个子序列
	cout << *search(arr, arr + len, iA.begin(), iA.end()) << endl; // 查找子序列，返回的是地址位置

	cout << endl;

    return 0;
}

```

&emsp;

# 迭代器

&emsp;&emsp;迭代器是一种智能指针，用于访问顺序容器和关联容器中的元素，相当于容器和操纵容器的算法之间的中介。迭代器可以分为四种：

1. 正向迭代器：iterator
2. 常量正向迭代器：const_iterator，常量指向的是元素，表示迭代器指向的元素不允许修改
3. 反向迭代器：reverse_iterator
4. 常量反向迭代器：const_reverse_iterator

&emsp;

|容器|迭代器功能|
|:--|:--|
|vector|随机访问|
|deque|随机访问|
|list|双向访问|
|set\multiset|双向访问|
|map\multimap|双向访问|
|stack|不支持迭代器|
|queue|不支持迭代器|
|priority_queue|不支持迭代器|

&emsp;

```cpp
#include <list>
#include <iostream>
using namespace std;

int main()
{
	list<int> v;
	v.push_back(3);  //尾插入
	v.push_back(4);
	v.push_front(2);  //头插入
	v.push_front(1);  // 1, 2, 3, 4

	list<int>::const_iterator it;
	for (it = v.begin(); it != v.end(); it++)
	{
		//*it += 1;  //常量迭代器，不允许我们修改指向的元素，这个违法操作
		cout << *it << " ";
	}
	cout << endl;

	// 注意：迭代器不支持<操作
	//for (it = v.begin(); it < v.end(); it++) 
	//{
	//	cout << *it << " ";
	//}
	cout << v.front() << endl;
	v.pop_front();  // 从顶部去除

	list<int>::reverse_iterator it2;
	for (it2 = v.rbegin(); it2 != v.rend(); it2++)
	{
		*it2 += 1;  //非常量迭代器，允许修改元素
		cout << *it2 << " ";                          // 5 4 3
	}
	cout << endl;

    return 0;
}
```

&emsp;

# 容器适配器(adapter)

STL有三个容器适配器，注意不要和容器搞混：

+ stack 堆栈：一种“先进后出”的容器适配器，不支持遍历，底层数据结构使用的是deque;
+ queue 队列：一种“先进先出”的容器适配器，不支持遍历，底层数据结构使用的是deque;
+ priority_queue 优先队列：一种特殊的队列，它能够在队列中进行排序（堆排序），底层实现结构是vector或者deque，不同编译器实现不同，只能访问第一个元素，不能遍历整个队列；

```cpp
#include <functional>
#include <stack>
#include <queue>
#include <iostream>
using namespace std;

int main()
{
	//stack<int> s;
	//queue<int> q;


	priority_queue<int> pq;  // 默认是最大值优先
	priority_queue<int, vector<int>, less<int> > pq2; //   最大值优先
	priority_queue<int, vector<int>, greater<int> > pq3; // 最小值优先

	pq.push(2);
	pq.push(1);
	pq.push(3);
	pq.push(0);
	while (!pq.empty())
	{
		int top = pq.top();  //获取队列头部信息
		cout << " top is: " << top<< endl;
		pq.pop();  //弹出队列
	}
	cout << endl;


	pq2.push(2);
	pq2.push(1);
	pq2.push(3);
	pq2.push(0);
	while (!pq2.empty())
	{
		int top = pq2.top();
		cout << " top is: " << top << endl;
		pq2.pop();
	}
	cout << endl;


	pq3.push(2);
	pq3.push(1);
	pq3.push(3);
	pq3.push(0);
	while (!pq3.empty())
	{
		int top = pq3.top();
		cout << " top is: " << top << endl;
		pq3.pop();
	}
	cout << endl;

    return 0;
}
```

&emsp;

# 空间配置器(allocator)

&emsp;&emsp;从使用的角度看，空间配置器隐藏在STL组件当中，为容器默默的工作，不需要使用者关心，但是从理解STL实现的角度看，它是需要首先分析的组件。allocator的分析可以体现C++在性能和资源管理上的优化思想。allocator被叫做空间配置器而不是内存配置器，是因为它不仅仅可以在内存上分配空间，甚至可以直接在硬盘上分配一块空间。