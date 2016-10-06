## PHP OpCache简介

php运行过程：每次请求，先编译对应的PHP文件为字节码，然后再在Zend Engine上执行。为了提高整个编译执行效率，提出了缓存编译的方案，把编译后的字节码
缓存起来。

方案主要有：

1. [APC-Alternative PHP Cache][1], PHP 5.5 前推荐使用
2. [OpCache][2]

OpCache并已经内置到PHP扩展中，官方开发人员也力推在高版本(php5.5或以上)中使用。你还有什么理由不用他？(自己/公司有资源另外开坑的另算)

> Laruence: (PHP开发组核心成员, Zend顾问, PHP7主要开发者, Yaf, Yar, Yac等开源项目作者)  
> [随着Opcache进入PHP源代码树, APC我们也就不在做更新了, 主要的精力都迁移到了O+的进一步开发上][3]


### 使用

以ubuntu + apache 为例

1. 修改php.ini 开启opcache

```shell
$ vim vim /etc/php5/apache2/php.ini
```

取消注释并修改参数(推荐参数)

```ini
[opcache]
;开启
opcache.enable=1

;共享内存大小,单位MB
opcache.memory_consumption=128

;每个字符串最大容量
opcache.interned_strings_buffer=8

;最大缓存的文件数目
opcache.max_accelerated_files=4000

;打开快速关闭, 打开这个在PHP Request Shutdown的时候会收内存的速度会提高
opcache.fast_shutdown=1             
         
;不保存文件/函数的注释   
opcache.save_comments=0
```

2. 重启apache,即可

```
$ service apache2 restart
```

### 我的思考

我自己写了一个测试(输出一万次hello world)

```php
<?php

for($i=0;$i<10000;$i++){
    echo 'hello world';
}

exit();
```

结果：

```
before: 

http get http://html5.zhutibang.cn/_test.php  0.29s user 0.29s system 78% cpu 0.732 total
http get http://html5.zhutibang.cn/_test.php  0.30s user 0.25s system 76% cpu 0.716 total
http get http://html5.zhutibang.cn/_test.php  0.28s user 0.19s system 78% cpu 0.600 total
http get http://html5.zhutibang.cn/_test.php  0.28s user 0.24s system 76% cpu 0.677 total
http get http://html5.zhutibang.cn/_test.php  0.29s user 0.24s system 74% cpu 0.703 total
http get http://html5.zhutibang.cn/_test.php  0.29s user 0.24s system 75% cpu 0.700 total
http get http://html5.zhutibang.cn/_test.php  0.29s user 0.22s system 76% cpu 0.671 total


after: 开启OPcache后每隔一段时间会变慢（检测文件缓存），经常后持续访问加快，比较耗CPU

http get http://html5.zhutibang.cn/_test.php  0.33s user 0.38s system 37% cpu 1.906 total
http get http://html5.zhutibang.cn/_test.php  0.25s user 0.13s system 77% cpu 0.490 total
http get http://html5.zhutibang.cn/_test.php  0.21s user 0.12s system 86% cpu 0.379 total
http get http://html5.zhutibang.cn/_test.php  0.24s user 0.15s system 85% cpu 0.448 total
http get http://html5.zhutibang.cn/_test.php  0.25s user 0.13s system 83% cpu 0.448 total
http get http://html5.zhutibang.cn/_test.php  0.22s user 0.12s system 86% cpu 0.390 total

```

从简单的测试可见。开启后占用CPU增大一点(多了计算操作)，首次访问会比较慢，后来访问就快了好多。当然在过期后速度还是先慢一次(未命中)后快(缓存都这样)。

我曾顾虑过opcache的缓存方式，如果缓存满了会怎样，不过想想 这么应该在设计opcache的人应该也很聪明，不需要使用者思考这样的问题。
我想应该是采用LRU缓存算法，满了就把最不常用的先删掉。



### OPcache可视化相关项目

- 轻量级 https://github.com/rlerdorf/opcache-status
- https://github.com/PeeHaa/OpCacheGUI





[1]: http://php.net/manual/zh/book.apc.php
[2]: http://php.net/manual/zh/opcache.configuration.php
[3]: http://www.laruence.com/2013/11/11/2928.html