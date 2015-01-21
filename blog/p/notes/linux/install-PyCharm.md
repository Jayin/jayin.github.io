PyCharm
---

几经周折，终于填了安装上PyCharm，
老是出现xxx/bin/java not found，明明我配置好的为啥还是not found? 

**解决办法**
```shell
gedit ~/.bashrc
```
在打开的文件的末尾添加
```text
export JAVA_HOME=/usr/lib/jvm/jdk7
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
```
保存退出，然后输入下面的命令来使之生效
```shell
source ~/.bashrc
```
