---
title: C++多线程基础
date: 2025-05-27 15:25:10
tags:
    - C++进阶
categories:
    - C++
mathjax: true
---

&emsp;&emsp;早期的C++语言并不支持多线程，认为会影响到语言的性能。早期的C++程序多线程的实现是交给操作系统内生API来实现。在C++11之后把Thread类纳入了C++体系，C++可以支持多线程开发。

```cpp
#include <thread>
#include <mutex>
#include <iostream>
using namespace std;

mutex g_mutex;
void T1()
{
	g_mutex.lock();
	cout << "T1 Hello" << endl;
	g_mutex.unlock();
}
void T2(const char* str)
{
	g_mutex.lock();
	cout << "T2 " << str << endl;
	g_mutex.unlock();
}
int main()
{
	thread t1(T1);  //传递线程的入口函数
	thread t2(T2, "Hello World");  //还可以跟函数的参数
	t1.join();
	//t2.join();
	t2.detach();
	cout << "Main Hi" << endl;


    return 0;
}


```

&emsp;

+ thread::join：主线程等待子线程执行结束
+ thread::detach：

&emsp;

&emsp;

```cpp
//例子：银行存取钱

#include <iostream>
#include <thread>
#include <mutex>
using namespace std;


// 存钱
void Deposit(mutex& m, int& money)
{
	// 锁的粒度尽可能的最小化，只锁要保护的变量，别放循坏外面把整个流程都锁了
	for(int index = 0; index < 100; index++)
	{
		m.lock();
		money += 1;
		m.unlock();
	}
}
// 取钱
void Withdraw(mutex& m, int& money)
{
	// 锁的粒度尽可能的最小化
	for (int index = 0; index < 100; index++)
	{
		m.lock();
		money -= 2;
		m.unlock();
	}
}

int main()
{
	// 银行存取款
	int money = 2000;
	mutex m;  //这个锁尽量不要搞全局的，不好控制
	cout << "Current money is: " << money << endl;
	thread t1(Deposit, ref(m), ref(money));  //引用的传递：ref()
	thread t2(Withdraw, ref(m), ref(money));
	t1.join();
	t2.join();
	cout << "Finally money is: " << money << endl;




	//线程交换 
	thread tW1([]()
	{
		cout << "ThreadSwap1 " << endl;
	});
	thread tW2([]()
	{
		cout << "ThreadSwap2 " << endl;
	});
	cout << "ThreadSwap1' id is " << tW1.get_id() << endl;
	cout << "ThreadSwap2' id is " << tW2.get_id() << endl;

	cout << "Swap after:" << endl;
	swap(tW1, tW2);  //交换线程的句柄
	cout << "ThreadSwap1' id is " << tW1.get_id() << endl;
	cout << "ThreadSwap2' id is " << tW2.get_id() << endl;
	tW1.join();
	tW2.join();




	// 线程移动
	thread tM1( []() { ; } );
	//tM1.join();
	cout << "ThreadMove1' id is " << tM1.get_id() << endl;
	cout << "Move after:" << endl;
	thread tM2 = move(tM1);  //转移所有权
	cout << "ThreadMove2' id is " << tM2.get_id() << endl;
	cout << "ThreadMove1' id is " << tM1.get_id() << endl;
	tM2.join();

	return 0;
}

```