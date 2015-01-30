LAMP环境搭建
-----------

#### 安装apache服务器

```shell
$ sudo apt-get install apache2
```

*  wwww目录在`/var/www/`
*  安装完成后访问`http://localhost/`查看 

#### 安装php

```shell
$ sudo apt-get install php5
```

shell中输入`php -v`查看php版本

#### 安装MySQL

```shell
$ sudo apt-get install mysql-server
```

*  安装过程需要你输入新的`root`用户密码
*  安装完后输入`mysql -u root -p` 测试是否可以进入


#### 安装phpmyadmin

```shell
$ sudo apt-get install phpmyadmin
```

- 安装过程
  1. 选择apache2
  2. 输入数据库密码
  3. 输入新的phpmyadmin密码

- 安装完成后，访问`http://localhost/phpmyadmin`依然访问不了，因为www目录没有phpmyadmin项目
```shell
$ sudo ln -s /usr/share/phpmyadmin /var/www 
```





