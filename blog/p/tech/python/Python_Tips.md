Python Tips
---
> 2015-01-05


### 一键把当前目录变为www目录

命令行输入：
```shell

$ python -m SimpleHTTPServer 8000

```

8000为默认的端口,浏览器起输入`http://localhost:8000/`，能看到满满都是爱吗？


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