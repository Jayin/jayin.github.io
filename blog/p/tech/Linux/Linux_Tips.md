Linux_Tips
---
> 2014-01-06

### 查看/关闭进程

```shell

#查看所有进程
ps aux 

#关闭pid号进程
kill [pid]

```

### 命令行中执行一个后台运行任务

在python tips中令行输入：
```shell

$ python -m SimpleHTTPServer 8000

```
就会把本地目录变为www目录相当酷炫，可是一旦关闭bash,这个进程也会被kill掉，无法后台运行

我们可以使用[nohup命令](http://jayin.github.io/blog/index.html?tech/import/Linux/nohup.md) 

```shell

nohup python -m SimpleHTTPServer &

```

查看进程看看效果