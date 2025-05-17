---
title: IO流基础
date: 2025-05-14 11:24:14
tags:
    - C++基础
categories:
    - C++
mathjax: true
---

# I/O流

&emsp;&emsp;传统的C语言中I/O处理有printf，scanf，getch，gets等函数，他们的问题是不可编程，仅仅能识别内置的数据类型，无法识别自定义的数据类型；而且代码移植性差，有很多坑。

&emsp;&emsp;C++中有I/O流istream，ostream等处理方式，可编程，对于类库的设计者来说很有用；而且还能简化编程，使I/O的风格保持一致。

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/IO%E6%B5%811.png)

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/IO%E6%B5%812.png)

&emsp;

# IO缓存区

&emsp;&emsp;计算机发展过程中，需要实现外部的设备可以用统一的标准和计算机程序进行交互。最早的UNIX系统是以文件的方式进行交互。这个思想发展到现在就是IO缓存区。因为外部设备和内存的速度是不一样的，缓存区的存在可以让我们的信息读取更加高效。

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/IO%E6%B5%813.png)

标准的IO提供三种类型的缓存模式：

1. 按块缓存：如文件系统，一次性加载到内存中
2. 按行缓存：以'\n'区分行
3. 不缓存

```cpp
int main()
{
    int a;
    int index = 0;

    while(cin >> a)
    {
        cout << "The numbers are:" << a << endl;
        index++;
        if(index == 5)
        {
            break;
        }
    }

    char ch;
    cin >> ch;
    cout << "the last char is:" << ch << endl;

    return 0;
}
```

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/IO%E6%B5%814.png)

&emsp;&emsp;上面代码一连输入6个int，内部接收完5个数字后循环结束，但可以看到6还是读入了，并且以char的形式输出，后面的ch还没来得及输入程序就退出了。这是程序中面临的一个问题，输入的6被暂存到缓冲区中成为了脏数据，在我们不之情的情况下把后面的输入给覆盖掉了。

![](https://my-hexo-blog-1308129409.cos.ap-beijing.myqcloud.com/C%2B%2B/IO%E6%B5%815.png)

&emsp;

我们可以使用cin::ignore(int count,type metadelim)方法来清空缓冲区，第一个参数是要清空多少缓冲区信息，第二个参数表达以什么符号作为结尾

```cpp
//清空缓冲区
int main()
{
    int a;
    int index = 0;

    while(cin >> a)
    {
        cout << "The numbers are:" << a << endl;
        index++;
        if(index == 5)
        {
            break;
        }
    }

    //清空缓冲区脏数据
    //numeric_limits<std::streamsize>::max()表示缓冲区的最大范围
    cin.ignore(numeric_limits<std::streamsize>::max(), '\n'); 

    char ch;
    cin >> ch;
    cout << "the last char is:" << ch << endl;

    return 0;
}
```