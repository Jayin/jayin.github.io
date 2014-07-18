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

