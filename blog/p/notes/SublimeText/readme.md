Sublime Text 
===
[Sublime Text 全程指南](http://zh.lucida.me/blog/sublime-text-complete-guide/)

注意&更棒的配置
===

### 将Tab键自动替换为4个空格
Preference-defalut:
```xml
    // The number of spaces a tab is considered equal to
    “tab_size”: 4,
    // Set to true to insert spaces when tab is pressed
    “translate_tabs_to_spaces”: true
```

### 标签分屏
编辑代码时我们经常会开多个窗口，所以分屏很重要。Alt + Shift + 2进行左右分屏，Alt + Shift + 8进行上下分屏，Alt + Shift + 5进行上下左右分屏（即分为四屏）

### 中文输入法的问题
从Sublime Text的初版（1.0）到现在（3.0 3065），中文输入法（包括日文输入法）都有一个问题：输入框不跟随。

目前官方还没有修复这个bug，解决方法是安装IMESupport插件，之后重启Sublime Text问题就解决了。

插件
===

### Markdown Preview
好用不解释。  
references->key bindings -User   
```json  
alt+m -> open in browser
```


### GoToDocumentation
这个插件能帮助我们快速查看手册。 比如我们在写php代码时， 突然忘记了某个函数怎么用了，将鼠标放在这个函数上，然后按F1，它能快速打开PHP手册中说明这个函数用法的地方。 

安装好 goto document插件后我们再配置快捷键F1 跳转到文档。 打开sublime的菜单栏Preferences->key bindings -User  设置快捷键：
```json  
    [
        { "keys": ["f1"], "command": "goto_documentation" }
    ]
```

### sublimecodeintel 代码提示

### PHP Syntax Checker
语法检查

### JsLint
语法检查，代码质量检测

### Git
用了就再也回不去
window 下还是要小配置一下.
```json
{
	"git_command":"D:/software/Git/bin/git.exe" //git的位置
	,"diff_tool": true
}
```

### DocBlockr
输入`/**`再输入一个Tab键or空格立即展开注释

![DocBlockr](./img/notes/sublimetext001.png)

### AutoFileName
自动填充文件名

![DocBlockr](./img/notes/sublimetext002.png)








