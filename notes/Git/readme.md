Git Tips
===

### 撤销修改
* 如果我在修改了几行代码，发现改错了,如何撤销修改？
    1. 情况1：如果还没有添加到暂存区(`git add file`)
    那么解决办法就是
    ```shell
        //丢弃工作区的修改
        git checkout -- file
        //git checkout -- file命令中的“--”很重要，没有“--”，就变成了“创建一个新分支”的命令
    ```
    2. 情况2：如果已经添加到暂存去，而且有修改了，想还原到原来：
    ```shell
        //把暂存区的修改撤销掉（unstage），重新放回工作区
        git reset HEAD file
        
        //丢弃工作区的修改（即第一步）
        git checkout -- file
    ```
    
### 版本回退
git中，用HEAD表示当前版本，也就是最新的提交“ 3628164...882e1e0”（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。



    HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id。

    穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本。

    要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本。


* 提交后，用“git diff HEAD -- readme.txt”命令可以查看工作区和版本库里面最新版本的区别

### 删除文件

在Git中，删除也是一个修改操作，我们实战一下，先添加一个新文件test.txt到Git并且提交：
```shell
$ git add test.txt
$ git commit -m "add test.txt"
[master 94cdc44] add test.txt
 1 file changed, 1 insertion(+)
 create mode 100644 test.txt
```
一般情况下，你通常直接在文件管理器中把没用的文件删了，或者用rm命令删了：
```shell
$ rm test.txt
```
这个时候，Git知道你删除了文件，因此，工作区和版本库就不一致了，git status命令会立刻告诉你哪些文件被删除了：
```shell
$ git status
# On branch master
# Changes not staged for commit:
#   (use "git add/rm <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       deleted:    test.txt
#
no changes added to commit (use "git add" and/or "git commit -a")
```
现在你有两个选择，一是确实要从版本库中删除该文件，那就用命令git rm删掉，并且commit：
```shell
$ git rm test.txt
rm 'test.txt'
$ git commit -m "remove test.txt"
[master d17efd8] remove test.txt
 1 file changed, 1 deletion(-)
 delete mode 100644 test.txt
```
现在，文件就从版本库中被删除了。

另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：
```shell
$ git checkout -- test.txt
```
git checkout其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

### git log
//git log --graph命令可以看到分支合并图。
用带参数的git log也可以看到分支的合并情况：
```shell
git log --graph --pretty=oneline --abbrev-commit
```

### 配置别名

有没有经常敲错命令？比如git status？status这个单词真心不好记。

如果敲git st就表示git status那就简单多了，当然这种偷懒的办法我们是极力赞成的。

我们只需要敲一行命令，告诉Git，以后st就表示status：
```shell
$ git config --global alias.st status
```
好了，现在敲git st看看效果。

当然还有别的命令可以简写，很多人都用co表示checkout，ci表示commit，br表示branch：
```shell
$ git config --global alias.co checkout
$ git config --global alias.ci commit
$ git config --global alias.br branch
```
以后提交就可以简写成：
```shell
$ git ci -m "bala bala bala..."
```
 










