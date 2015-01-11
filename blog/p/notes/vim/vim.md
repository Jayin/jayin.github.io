Vim配置
---

建议直接安装别人的[配置](https://github.com/ma6174/vim)

一条命令搞定

```shell
wget -qO- https://raw.github.com/ma6174/vim/master/setup.sh | sh
```

Tips
---

* vim还没有启动的时候： 在终端里输入 vim file1 file2 ... filen便可以打开所有想要打开的文件 

* vim已经启动 输入 :open file 可以再打开一个文件，并且此时vim里会显示出file文件的内容。 

* 同时显示多个文件：  

  - `:split` [filename] 在水平方向打开文件filename（若filename为空，则duplicate当前文件）  
  - `:vsplit` [filename] 在竖直方向打开文件filename（若filename为空，则duplicate当前文件） 
  - `:qall` 关闭所有文件quit all  
  - `:wall` 写入所有文件write all  


* 在窗格间切换的方法 `Ctrl+w+方向键`——切换到前／下／上／后一个窗格   
  `Ctrl+w+h/j/k/l` ——同上 Ctrl+ww——依次向后切换到下一个窗格中

* 在vim和talglist窗口之间切换的命令为`ctrl + w`

*  关闭vim窗口中的一个：切换到你想要关闭的窗口，然后输入`：bd`（buffer delete）

* 若想在vim内部直接输入shell 命令 `:! command`

