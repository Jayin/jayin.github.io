apache设置自己的404错误页面
-----

* 第一步:让apache支持.htaccess
我们要找到apache安装目录下的httpd.conf文件,在里面找到
```
<Directory />
    Options FollowSymLinks
    AllowOverride none
</Directory>
```
我们只要把蓝色字的none改all就重起apache就OK了

* 第二步:现在就要让网站找不到的内容调到我指定的404页面了,我是在网站的根目录下直接自己创建一个.htaccess文件，
内容为 ErrorDocument 404 /404.html

* 第三步：在网站的根目录（apache配置文件中指定的Document的目录,wamp中就是www/目录）建立自己想要的404.html

注：404文件为404.html （重要提示404页面的大小必须大于512B，否则APACHE忽略）
提示：主要问题是在刚开始做的时候一直在找.htaccess这个文件，其实要自己创建在项目目录下新建一个