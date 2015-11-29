# Android反编译
> 2015-11-29

* [dex2jar](https://github.com/pxb1988/dex2jar):是将apk中的classes.dex转化成jar文件    
* [jd-gui](https://github.com/java-decompiler/jd-gui):  源码查看工具jdgui，是一个反编译工具，可以直接查看反编译后的jar包源代码
* [apktool](https://github.com/iBotPeaches/Apktool): apk反编译生成程序的源代码和图片、XML配置、语言资源等文件



### 反编译代码

首先将apk文件后缀改为zip并解压，得到其中的`classes.dex`，它就是java文件编译再通过`dx`工具打包而成的，将`classes.dex`复制到`dex2jar.bat`所在目录文件夹。

在命令行下定位到`dex2jar.bat`(或`dex2jar.sh`)所在目录，运行

```
# Windows
dex2jar.bat classes.dex

# Linux & OS X

dex2jar.sh classes.dex
```
生成`classes_dex2jar.jar`


### 查看源代码

然后，进入jdgui文件夹双击`jd-gui.exe`，打开上面生成的jar包classes_dex2jar.jar，即可看到源代码了


### apktool 生成程序的源代码和图片

下载后执行
```
apktool b /path/to/foo.apk
```