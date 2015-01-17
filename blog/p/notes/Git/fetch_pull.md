Git中从远程的分支获取最新的版本到本地有这样2个命令：

1. git fetch：相当于是从远程获取最新版本到本地，不会自动merge
```shell
git fetch origin master
git log -p master..origin/master
git merge origin/master
```

以上命令的含义：
* 首先从远程的origin的master主分支下载最新的版本到origin/master分支上
* 然后比较本地的master分支和origin/master分支的差别
* 最后进行合并

上述过程其实可以用以下更清晰的方式来进行：
```shell
git fetch origin master:tmp
git diff tmp 
git merge tmp
```
    
从远程获取最新的版本到本地的tmp分支上之后再进行比较合并

NOTE:**养成良好习惯，合并以后删除tmp分支**

2. git pull：相当于是从远程获取最新版本并merge到本地
```shell
git pull origin master
```

上述命令其实相当于git fetch 和 git merge
在实际使用中，git fetch更安全一些**查看更新情况**，然后再决定是否合并

PS:fetch以后再merge，会自动产生一条commit `Merge branch XXX` 这样很好，保留了分支的信息，即使删了分支也保留了有分支的commit信息