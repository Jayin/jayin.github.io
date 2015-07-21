dispus-visibility
=================
> 控制评论框在什么时候显示

目前: 评论框不会在下列情况下不显示

1. 在形如`*index.md` 或 `*index.markdown` (不区分大小写),为索引页没有必要显示\
2. 匹配白名单


### 使用


```
<script src="vendor/jquery-1.11.1.min.js"></script>
<!-- 在jquery 和core.js之间插入 -->
<script src="vendor/extension/dispus-visibility/main.js"></script>
<!-- core.js -->
<script src="vendor/core.js"></script>
```

### 设置白名单

白名单下均不会显示评论框，默认:

支持正则表达式

```javascript
var white_list = [ //默认大小写不敏感，也就是HOME.md也是白名单内
    '', //首页
    'home.md',
    'about.md',
    'README.md'
]
```

然后

```bash
cd path/to/{you project}
make
```
