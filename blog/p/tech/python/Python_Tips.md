Python Tips
---
> 2015-01-05


### 一键把当前目录变为www目录

命令行输入：
```shell

$ python -m SimpleHTTPServer 8000

```

8000为默认的端口,浏览器起输入`http://localhost:8000/`，能看到满满都是爱吗？

Ruby也可以一行解决:
```shell
ruby -run -e httpd . -p 8888
```

PHP也可以
```shell
php -S localhost:8000
php -S localhost:8000 -t /data/www
```

很多应用中，都会进行URL重写，所以PHP提供了一个设置路由脚本的功能:

```shell
php -S localhost:8000 index.php
```

这样一来，所有的请求都会由index.php来处理。

###  字符串格式化输出

```python

#元组占位符
m = 'python'
astr = 'i love %s' % m
print astr

#字符串的format
m = 'python'
astr = "i love {python}".format(python=m)
print astr

#字典格式化字符串
m = 'python'
astr = "i love %(python)s " % {'python':m}
print astr

```
