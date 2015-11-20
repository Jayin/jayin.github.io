# 在ubuntu上搭建PHP7+Nginx

### 源码安装PHP7

> 题外话: 选择自己手动源码安装，迫于无奈。1. apt-get安装 版本比较久 2. linuxbrew 虽好，但是homebrew-php模块尚未支持linxubrew, 所以只能手动安装php7

源码安装PHP这些从网上搜都一大堆，这里outline一下大概的步骤:

1. 安装依赖
2. ./configure --prefix=/usr/local/php70 --enable-XXX --with-XXX
3. make
4. make install

一般会依赖例如`libxml2`这种，但是你不可能全部记住的什么依赖吧？ 其实你可以忽略第一步，直接走第二步，
他会检测你所需要的依赖，如果缺少的依赖安装包，你按提示`apt-get install XXX `就好了

`make`和`make install`,分别是编译、安装。编译前必须确保依赖安装完毕(`./configure`时没有错)。安装要理解到一点，一般情况下，安装的所有东西(包括二进制文件，配置文件等)均安装在设定路径`--prefix={安装路径}`上。 而用`apt-get` 或者是`brew`来安装的时候，发现配置文件都放在不同的地方，实际上算是他们制定了他们自己的安装(文件摆放)方式

上述安装完毕后,做链接
```
$ ln -s /usr/local/php70/bin/php /usr/local/bin/php
$ ln -s /usr/local/php70/sbin/php /usr/local/sbin/php
```

分别执行`php -v`和`php-fpm -v`显示版本即是安装成功

### 配置php-fpm

对php-fpm不理解的可以参考这篇文章[FastCgi与PHP-fpm之间是个什么样的关系](http://segmentfault.com/q/1010000000256516)

直接执行`php-fpm`启动fpm会失败，原因是没有配置文件(配置文件在哪儿呢？ 上面都说了默认情况下都会安装在你设定的`--prefix=XXX`下，所以在里面找)

根据提示，创建conf文件就好了，这点不用害怕，因为php官方已经写了一个默认的配置文件

```
cd /usr/local/php70/etc  
$ cp php-fpm.conf.default php-fpm.conf
$ cp php-fpm.conf.default php-fpm.conf
$ cd php-fpm.d
$ cp www.conf.default www.conf
```

然后你会发现还是启动不了，因为user/和group的原因，具体我不展开了，vim 打开`www.conf.default`,修改user/group
```
user = root
group = www-data
```

然后执行`$ php-fpm -R` 允许以root用户启动php-fpm


### Nginx 安装

一句话搞掂 `$ brew install nginx`

www目录默认在`~/.linuxbrew/var/www/`

```
$ nginx # 启动nginx
```


### 配置nginx + php-fpm

用vim打开`nginx.conf`

```
$ vim ~/.linuxbrew/etc/nginx/nginx.conf
```

修改官方的默认到如下
```
user  root; # 已root的角色来运行，确保是有访问~/.linuxbrew/var/www/目录的权限的用户

 # php-fpm 配置如下(注意与官方略有不同)
location ~ \.php$ {
  try_files $uri =404;
  root           html;
  fastcgi_pass   127.0.0.1:9000;
  fastcgi_index  index.php;
  fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
  include        fastcgi_params;
}
````

我感觉官方的配置挖了个坑: 原来是`fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;`
然后你发觉总是提示`File not found`。参考[nginx + php-fpm = File not found](http://stackoverflow.com/questions/24208139/nginx-php-fpm-file-not-found)


然后重新让nginx重新加载配置
```
$ nginx -s reload
```

#### 测试

在`~/.linuxbrew/var/www/`创建`test.php`

输入
```
<php
phpinfo();
```

访问`http://localhost:8080/test.php`



