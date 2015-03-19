Linux_Tips
---

### 查看端口占用情况

```shell
netstat -an
```

查找指定端口是否有占用

```shell
netstat -an | grep [port]
```

### 查看/关闭进程

```shell
#查看所有进程
$ ps aux 

#关闭pid号进程
$ kill [pid]
```

### 命令行中执行一个后台运行任务

在python tips中令行输入：

```shell
$ python -m SimpleHTTPServer 8000
```
就会把本地目录变为www目录相当酷炫，可是一旦关闭bash,这个进程也会被kill掉，无法后台运行

我们可以使用[nohup命令](__P__/tech/import/Linux/nohup.md) 

```shell
nohup python -m SimpleHTTPServer &
```

### 查找指定文件并删除

我在整理EManual的时候遇到这样的问题:`markdown/`有很多文件，文件里面还嵌套很多文件，要删除这目录下所有`*.json`文件，
但是手动弄了大概1/3，发现有点麻烦，不如使用一条命令来解放双手: 

```shell
$ find . -name "*.json" | xargs rm -f
```