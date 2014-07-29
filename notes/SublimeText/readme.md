Sublime Text 
===


注意
===

### 将Tab键自动替换为4个空格
Preference-defalut:
```xml
    // The number of spaces a tab is considered equal to
    “tab_size”: 4,
    // Set to true to insert spaces when tab is pressed
    “translate_tabs_to_spaces”: true
```

插件
===

### Markdown Preview
好用不解释。  
references->key bindings -User   
```json  

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


