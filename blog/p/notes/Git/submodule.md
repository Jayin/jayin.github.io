submodule
=========
> by [Coding.net](https://coding.net/u/coding/p/Coding-Feedback/git/blob/master/git-submodule-tutorial.md)

是什么是子模块？
--------

为什么要引入子模块，当项目A需要引用其他需要定制的库或者其它定制项目B的时候，我们会发现，如果用包含的方式（项目A和定制的项目放在一起），项目A被修改时，任何你定制化的修改都很难被合并。所以，最好的方法是分开管理。所以git引入了子模块的概念，相当于你的子目录（子模块）拥有独立的git仓库，可以独立的分开管理。

子模块的初始化
-------

如何在本地仓库中引入子模块呢？首先，你必须把外部仓库拷贝到你的子目录中，通过git submodule add的方式：

```shell
$ git submodule add https://coding.net/zhanzhenchao/Be-a-submodule.git
Cloning into 'Be-a-submodule'...
remote: Counting objects: 3, done.        
remote: Total 3 (delta 0), reused 0 (delta 0)        
Unpacking objects: 100% (3/3), done.
```

回车后，你将在本地的仓库内创建了一个子模块（默认会用子项目的名字作为子模块的文件名）。我们可以是用git status来查看一下状态，如下面：

```shell
$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#   new file:   .gitmodules
#   new file:   Be-a-submodule
#
```

在这里我们可以看到两个文件：

 - 文件.gitmodules

.gitmodules文件里面记录着子模块的路径和项目的url。如果你有多个子模块，你都可以在这里查看到具体的信息，同时也是他人获取你子模块信息的地方。

 - 文件DbConnector

DbConnector是你的子模块的路径。当你不在该路径时，git将不会记录其内容。相反的，git把该模块当作一个特别的提交。

当你项目提交的时候，例如：

```shell
$ git commit -am 'added one module'
[master c020505] added one module
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 Be-a-submodule
```

在这里你可以再一次看到子模块当作一个特别的提交（160000模式是git的一个特殊的模式）

> 小结：直接在要引入的项目目录下中克隆一个子模块：git submodule add [url]


----------

克隆一个带有子模块的项目
------------

当你克隆一个带有子模块的项目时，你会惊奇的发现，子模块（子路径）里面的内容完全为空。

```shell
$ git clone https://coding.net/zhanzhenchao/submodules-test.git
Cloning into 'submodules-test'...
remote: Counting objects: 6, done.        
remote: Compressing objects: 100% (4/4), done.        
remote: Total 6 (delta 0), reused 0 (delta 0)        
Unpacking objects: 100% (6/6), done.
$ cd submodules-test/
$ ls -la
total 24
drwxr-xr-x 4 root root 4096 Nov  5 13:38 .
drwxr-xr-x 3 root root 4096 Nov  5 13:38 ..
drwxr-xr-x 2 root root 4096 Nov  5 13:38 Be-a-submodule
drwxr-xr-x 8 root root 4096 Nov  5 13:38 .git
-rw-r--r-- 1 root root  110 Nov  5 13:38 .gitmodules
-rw-r--r-- 1 root root   17 Nov  5 13:38 README.md
$ cd Be-a-submodule/
$ ls
$ 
```

此时，你应该在主项目路径下运行git submodule init初始化，再运行git submodule update命令抓取内容下来。

```shell
$ cd ..
$ git submodule init
Submodule 'Be-a-submodule' (https://coding.net/zhanzhenchao/Be-a-submodule.git) registered for path 'Be-a-submodule'
$ git submodule update
Cloning into 'Be-a-submodule'...
remote: Counting objects: 3, done.        
remote: Total 3 (delta 0), reused 0 (delta 0)        
Unpacking objects: 100% (3/3), done.
Submodule path 'Be-a-submodule': checked out '1cd699621fb9f29a910e5ede48782bbbfd41a627'
```

这个时候，你就能看到你子模块下上次最新提交后的内容。
如果你不想这么麻烦，你可以在克隆项目时，附上--recursive参数，这样git会自动的初始化和抓取子模块的过程。
克隆项目的时候需要谨记的是，每一次抓取包含子模块的项目都必须要这么做。
另外还需要注意的是，如果开发者在本地对子模块进行了修改，却没有push上远程仓库上，其他开发者进行根据它非公开的指针拉取的时会出现以下这个错误

```shell
$ git submodule update
fatal: reference isn’t a tree: 6c5e70b984a60b3cecd395edd5b48a7575bf58e0
Unable to checkout '6c5e70b984a60b3cecd395edd5ba7575bf58e0' in submodule path…
```

会出现这个原因是因为子模块会从.gitmodules中获取url相应的提交，可是此时由于之前的开发者没有push到相应的url，导致而找不到提交的内容，因此会发生非公开的指针和url不匹配的原因。如果想要避免这样的情况，你需要查看一下谁是最后提交的人(git log -1)，然后告知该开发者进行push。

> 小结：克隆完一个带有子模块的项目，需要初始化子模块，然后更新子模块（或者克隆项目时带有--recursive参数）。


----------

工作在带有子模块的项目中
------------

我们克隆了一个新的带有子模块的项目在我们本地仓库，如果此时我们想要知道远程仓库是否更新了子模块的部分，我们可以抓取下来git fetch，然后合并git merge上流的分支

```shell
$ git fetch
remote: Counting objects: 3, done.        
remote: Total 3 (delta 0), reused 0 (delta 0)        
Unpacking objects: 100% (3/3), done.
From https://coding.net/zhanzhenchao/Be-a-submodule
   1cd6996..a02c01c  master     -> origin/master

root@rico:/home/rico/test/submodules-test/Be-a-submodule# git merge origin/master
Updating 1cd6996..a02c01c

Fast-forward
 README.md |    2 ++
 1 file changed, 2 insertions(+)
```
这个时候，你回到主项目的目录下可以查看子模块的更型状况git log --submodule 

```shell
$git diff --submodule
Submodule Be-a-submodule 1cd6996..a02c01c:
  > update README.md
```

如果你不想git fetch然后git merge的方式，你可以用git submodule update --remote [submodule-name]的方式替代。


----------

子模块注意事项和小提示
------

 1. 子模块可以理解为某仓库的指定版本的内容作为当前仓库的某一子目录
 2. 父仓库不直接关注子模块的内容变化，只关注子模块版本号的变化
 3. 父仓库的任意一个版本都唯一的确定了子模块的版本
 4. 子模块的版本号发生变化将导致父仓库产生变化（diff）父仓库需要提交这一变化来记录相应改动，而这，也将导致父仓库产生一个新的版本
 5. 子仓库可以完全不知道父仓库的存在
 6. 父仓库可以不存储任何代码，而仅仅是记录一系列子模块的版本号，这些版本号的变更形成了父仓库的历史
 7. 可以使用子模块来划分目录的权限

---------

Git 子模块参考文章
---------

 1. [http://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97](http://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)
 2. [http://git-scm.com/book/en/v2/Git-Tools-Submodules](http://git-scm.com/book/en/v2/Git-Tools-Submodules)
