Ubutun下升级PHP到5.6
------------------

一般来说ubutun 12.04的内置php 5.3.10,版本略低了,最新已经是PHP5.6.6,2015年10月将会迎来PHP 7

## 最简便的方法:PPA

如果你没有添加过PPA，你要确保`python-software-properties`已经安装好:

```
sudo apt-get update && sudo apt-get install python-software-properties
```

上面安装好了以后,我们就可以添加一个新的PPA

```
sudo add-apt-repository ppa:ondrej/php5-5.64
```

After the PPA is added you will need to update and upgrade. This will upgrade your current version of PHP to 5.6 along with any modules you have installed:
PPA添加以后，你要进行更新和升级操作，这会更新你的php版本到5.6，以及对应的模块也会升级

```
sudo apt-get update && sudo apt-get upgrade
```

如果你还没有安装php，那么安装(会直接安装最新版)

```
sudo apt-get install php5
```

安装更新后，你需要重启的Web Server(Apache/Nginx) 或 fast process manager（php5-FPM）

##  源码编译安装

1、首先安装libxml2库，用来解析xml的的lib库输入:`sudo apt-get install libxml2-dev` 进行安装

2、官网下载php http://www.php.net/downloads.php 然后解压下载来的tar.gz包

```
tar zxvf php-5.4.15.tar.gz                     #解压
sudo mv -r php-5.4.15  /usr/src/php5  #移动到/usr/src/php5目录下
```

3、编译安装php

```
cd /usr/src/php/php-5.4.15   #进入php所在目录
./configure
-prefix=/usr/local/php5     #php安装目录
-with-apxs2=/usr/local/apache2/bin/apxs   #apxs所在的目录，如果没有就sudo find / -name apxs 查询一下所在的目录
-with-mysql=/usr/      #这个是查找mysql.h的目录，不知道为什么我的mysql.h在/usr/include/中 但是 写这个路径没用必须写/usr/  如果不知道mysql.h在哪就 sudo find / -name mysql.h查找一下
-with-mysqli=/usr/bin/mysql_config  #mysql_config所在的目录，如果不再这个目录就find一下。
-with-gd   #打开对gd库的支持，如果应为这个报错，就安装一下gd库
-with-pear  #打开pear命令的支持
-with-libxml-dir   #打开对刚刚安装的libxml2的支持
```

整条编译语句是：`./configure -prefix=/usr/local/php5 -with-apxs2=/usr/local/apache2/bin/apxs -with-mysql=/usr/  -with-mysqli=/usr/bin/mysql_config -with-gd  -with-pear -with-libxml-dir `

如果编译时出现error的话 一般都是 依赖库lib 出问题，看提示缺少什么依赖库，然后安装一下就行。
完成后`make && make install`进行安装。

4、手动指定php.ini文件:

打开`/usr/local/apache2/conf/httpd.conf`，在`LoadModule php_module  modules/libphp5.so`这行下面加入PHPIniDir /etc/php.ini 指定php.ini的路径，然后进入你解压的php-5.4.15.tar.gz的目录将php.ini-development复制到你指定的路劲/etc里并且重命名为php.ini:

```
cd /usr/src/php/php-5.4.15 #进入php目录
sudo cp php.ini-development  /etc  #复制到/etc
sudo mv php.ini-development php.ini  #重命名为php.ini
```

5、修改`httpd.conf`中的php支持和默认访问`index.php`:

打开/usr/local/apache2/conf/httpd.conf,把<Directory />中的内容改成:

```
<Directory   />
Options FollowSymLinks
DirectoryIndex index.php index.html    #指定默认先查找index.php 如果没有就查找index.html
AllowOverride None
Order deny,allow
Deny from all
</Directory>
```

接着在`AddType application/x-gzip .gz .tgz`下面一行中加入：

```
AddType application/x-httpd-php .php
AddType application/x-httpd-php-source .phps
```

完成后保存文件,如果提示文件是只读模式无法保存的话，那么肯定是权限不够在用打开httpd.conf的命令时 要加上sudo

6、启动\重启apache服务,在服务器根目录下编写php文件

```
sudo /usr/local/apache2/bin/apachectl stop #停止服务
sudo /usr/local/apache2/bin/apachectl start #启动服务
sudo /usr/local/apache2/bin/apachectl rstart #重启服务

cd /usr/lcoal/apache2/htdocs #进入apache2默认根目录
```
创建一个`index.php`文件 在里面编写`<?php echo phpinfo();?>`然后打开游览器输入`localhost`看看能否显示php的信息，如果可以则配置成功。

如果是通过`apt-get install apache2` 的:

一、Start Apache 2 Server /启动apache服务

    `$ sudo /etc/init.d/apache2 start`

二、 Restart Apache 2 Server /重启apache服务

    `$ sudo /etc/init.d/apache2 restart`

三、Stop Apache 2 Server /停止apache服务

    `$ sudo /etc/init.d/apache2 stop`



## Refrences

[Upgrade to PHP 5.6 on Ubuntu 14.04 LTS](http://phpave.com/upgrade-to-php-56-on-ubuntu-1404-lts/)
[Ubuntu搭建LAMP服务器(apache+mysql+php),Ubuntu配置php环境](http://blog.csdn.net/swingpyzf/article/details/8923899)
[Linux 下编译安装 PHP 5.6](http://blog.aboutc.net/linux/65/compile-and-install-php-on-linux)
[linux 下 apache启动、停止、重启命令]()
[ apache配置文件：http.conf配置详解 ](http://blog.chinaunix.net/uid-21807675-id-1814871.html)

