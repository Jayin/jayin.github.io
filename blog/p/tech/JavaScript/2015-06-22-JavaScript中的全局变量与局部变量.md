JavaScript中的全局变量与局部变量
-----------
> 2015-06-22

由于今日要为[silentor](https://github.com/Jayin/silentor)添加一个兼容silent[功能](https://github.com/Jayin/silentor/issues/9)时,才发现由于乱用变量导致挖了一坑。当时我好奇怪，为何这么明显的bug居然没有发现？原来是我一直没有在侧栏
使用相对路径去写，掩饰了错误处理侧栏的图片链接的bug。以前，我以为加var就是局部变量，不加var定义就是全局变量，后来自己总结就是:都加上var，这样能尽量减少全局污染。然而，为何我又这么写了呢？其实我也不清楚....[修复](https://github.com/Jayin/silentor/commit/7fa3dc6a2523dba1111a15a12aa698cf8585d070)完毕后觉得有必要再写篇文章，让自己印象更深刻。

### 如何定义全局变量

>不加var就是定义了全局变量？

不是的,在chrome控制台输入

```javascript
var a = 1;
b = 1;
console.log('window.a=' + window.a);
console.log('window.b=' + window.b);
(function test(){
    a *= 10;
    b *= 20;
    console.log(a);
    console.log(b);
    console.log('window.a=' + window.a);
    console.log('window.b=' + window.b);
})();
console.log(a);
console.log(b);
console.log('window.a=' + window.a);
console.log('window.b=' + window.b);
```

结果
```
window.a=1
window.b=1
10
20
window.a=10
window.b=20
10
20
window.a=10
window.b=20
```

可见，函数内部修改的事a,b的变量实际上都全局变量window的属性，也就是a,b的定义都全局定义，所以不是说不加var就是定义了全局变量，而是看你实在哪个作用域定义的

### 如何全局污染


直接上代码

情景一:

```javascript
var my_money = 1
//....省略200行代码
function some_other_operation(){ //某些与my_money不相关的操作
    //....省略200行代码
    my_money = 2333 //新来的developer A 觉得需要定义想定义个变量
    //....省略200行代码
}
some_other_operation()
console.log(window.my_money)
```

结果
```
2333
```

这是一个简单的全局污染的例子(请自行带入语境)，developer A同样也是手抖没有加var，导致了修改了全局变量的值

情景二:

```javascript
//....省略200行代码
function some_other_operation(){ //某些与my_money不相关的操作
    //....省略200行代码
    my_money = 2333 //新来的developer A 觉得需要定义想定义个变量
    //....省略200行代码
}
some_other_operation()
console.log(window.my_money)
```

结果
```
2333
```

这是第二种情况，由于函数`some_other_operation`内声明的变量突然升级成全局的变量，这显然比情景一更加坑爹!

下面再来看看一个例子，弄清楚变量定义寻找路径

```javascript
var my_money = 1 // *1
//....省略200行代码
function some_operation(){
    var my_money = 2; //*2
    function opt(){
        my_money = 2333; //*3 手抖又定义一次
    }
    opt();
    console.log('after opt: ' + my_money)
    console.log('opt-->:'+ opt.my_money);
    console.log('this.opt-->:'+ this.my_money);
}
some_operation()
console.log('after some_operation: ' + window.my_money)
```

结果是

```
after opt: 2333
after some_operation: 1
```

也就是想表达:你在`opt()`中定义`my_money`或者想修改一下`my_money`的值，解释器会`opt`里面先寻找`my_money`的定义，找不到就去上一层`some_operation()`下寻找，，再找不到就去到顶层`window`下寻找，若顶层作用域还是找不到，那么在顶层创建；当然，这里就在`some_operation` 下找到，所以这样并没有破坏到`window.my_money`

那么问题来了:有无其他方法是绝对不污染的其他作用域的？或者减少这些由于js本身的弱势的问题而导致bug?

### 使用"use strict"

顾名思义，这种模式使得Javascript在更严格的条件下运行。具体请参考[Javascript 严格模式详解](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html)

好处就是:

- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的Javascript做好铺垫。

说那么多废话，来点代码实际的。

如果在全局变量情景二中用上"use strict" (注意，下面例子`'use strict'`不能直接跑在chrome的控制台上，请写在文件中然后运行)

```javascript
'use strict';
//....省略200行代码
function some_other_operation(){ //某些与my_money不相关的操作
    //....省略200行代码
    my_money = 2333 //新来的developer A 觉得需要定义想定义个变量
    //....省略200行代码
}
some_other_operation()
console.log(window.my_money)
```

结果就是

```
Uncaught ReferenceError: my_money is not defined
```

在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种用法，全局变量必须显式声明。所以使用严格模式，能在coding阶段减少这类的bug,让你有更多的时间陪伴家人。

那么对于情景一怎么办？

我觉得这个习惯问题，那么我的总结就是:定义变量时尽量(必须才对)用`var`，能够减少莫名其妙被污染变量的bug，让你有更多时间去陪伴女友。

NOTE: 这是我粗略的总结，仅作参考，如有错误，不辞请教。

参考：
*  让人犯晕的JavaScript变量赋值 http://hellobug.github.io/blog/javascript-variable-assignment/
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
* http://stackoverflow.com/questions/500431/what-is-the-scope-of-variables-in-javascript
* Javascript 严格模式详解 http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html