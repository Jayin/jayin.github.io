WAMP安装之msvcr100.dll丢失问题
---
> 2014-11-18

msvcr100.dll是Visual Studio 2010的一个动态链接库，如果某程序是用它开发出来的，那么该程序的运行就有可能需要此动态链接库，有些程序直接将其打包到了安装目录，并注册，就不会出现缺失的问题；但有些程序则默认系统中有此动态链接库，没有进行处理，那就会出现缺失的问题，如图：

![](./img/tech/wamp-setup01.jpg)

### 解决方法一：
下载MSVCR100.dll，然后放到系统中，注意存放的系统路径：

* 32位系统，dll放在：\Windows\System32
* 64位系统需要放两个dll文件，一个32位，一个64位（下面两个一定要看仔细，反的）：32位dll放在：\Windows\SysWOW64,   64位dll放在：\Windows\System32

DLL下载链接：http://diybbs.zol.com.cn/1/34187_3334.html

### 解决方法二：

使用DirectX Repair 这款软件自动修复，运行后点检测并修复，即可自动修复完成，修复后重启计算机。
DirectX Repair

下载链接：   http://diybbs.zol.com.cn/3/308_23938.html