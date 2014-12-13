IDEA
---


Keymap in Mac OS X
---

`control + enter` 在类中按回生成一些代码(code generate),如getter setter  
`option  + enter` 快速修复  
`option + command` 格式化代码  


在mac下idea的常用快捷键如下，下面的快捷键都亲自试用，并有一些和eclipse对比的说明
 
alt+f7查找在哪里使用 相当于eclipse的ctrl+shift+G
command+alt+f7 这个是查找选中的字符在工程中出现的地方，可以不是方法变量类等，这个和上面的有区别的
command＋F7可以查询当前元素在当前文件中的引用，然后按F3可以选择 ，功能基本同上
选中文本，按command+shift+F7 ，高亮显示所有该文本，按Esc高亮消失。
选中文本，按Alt+F3 ，逐个往下查找相同文本，并高亮显示。shift+f3就是往上找
ctrl+enter 出现生成get,set方法的界面
shift+enter 换到下一行
command+N 查找类
command+shift+N 查找文件
command+R 替换
ctrl+shift+R 可以在整个工程或着某个目录下面替换变量
command+Y 删除行
command+D复制一行
ctrl+shift+J 把多行连接成一行，会去掉空格的行
command+J 可以生成一些自动代码，比如for循环
command+B 找变量的来源  同F4   查找变量来源
ctrl+shift+B 找变量所属的类
command+G定位
command+F 在当前文件里查找文本 f3向下看，shift+f3向上看
ctrl+shift+F  可以在整个工程或着某个目录下面查找变量   相当于eclipse里的ctrl+H
alt+shift+C 最近修改的文件
command+E最近打开的文件
alt+enter 导入包，自动修改
command+alt+L 格式化代码
command+alt+I 自动缩进，不用多次使用tab或着backspace键，也是比较方便的
ctrl+shift+space代码补全，这个会判断可能用到的，这个代码补全和代码提示是不一样的
command+P 方法参数提示
command+alt+T 把选中的代码放在 TRY{} IF{} ELSE{} 里
command+X剪切删除行
command+shift+V 可以复制多个文本
command+shift+U 大小写转换
alt+f1查找文件所在目录位置
command+/ 注释一行或着多行 //
ctrl+shift+/ 注释/*...*/
command+alt+左右箭头 返回上次编辑的位置
shift+f6重命名
command+shift+上下箭头 把代码上移或着下移
command+[或]  可以跳到大括号的开头结尾
command+f12可以显示当前文件的结构
command+alt+B 可以导航到一个抽象方法的实现代码
command+shift+小键盘的*  列编辑
alt+f8 debug时选中查看值
f8相当于eclipse的f6跳到下一步
shift+f8相当于eclipse的f8跳到下一个断点，也相当于eclipse的f7跳出函数
f7相当于eclipse的f5就是进入到代码
alt+shift+f7这个是强制进入代码
ctrl+shift+f9 debug运行java类
ctrl+shift+f10正常运行java类
command+f2停止运行