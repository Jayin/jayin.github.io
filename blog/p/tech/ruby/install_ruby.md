如何快速正确的安装 Ruby, Rails 运行环境
---
> 参考：
> https://ruby-china.org/wiki/install_ruby_guide
> http://blog.csdn.net/abbuggy/article/details/8170899
> https://rvm.io/integration/gnome-terminal

系统需求
---

首先确定操作系统环境，不建议在 Windows 上面搞，所以你需要用:

* Mac OS X
* 任意 Linux 发行版本(Ubuntu,CentOS, Redhat, ArchLinux ...)
  强烈新手使用 Ubuntu 省掉不必要的麻烦！

以下代码区域，带有 $ 打头的表示需要在控制台（终端）下面执行（不包括 $ 符号）

### 步骤0 － 安装系统需要的包

```shell
# For Mac 
# 先安装 [Xcode](http://developer.apple.com/xcode/) 开发工具，它将帮你安装好 Unix 环境需要的开发包
# 然后安装 [Homebrew](http://brew.sh)
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go/install)"
```

### 步骤1 － 安装 RVM

RVM 是干什么的这里就不解释了，后面你将会慢慢搞明白。

```shell
$ curl -L https://get.rvm.io | bash -s stable
```

期间可能会问你sudo管理员密码，以及自动通过homebrew安装依赖包，等待一段时间后就可以成功安装好 RVM。

然后，载入 RVM 环境（新开 Termal 就不用这么做了，会自动重新载入的）

```shell
$ source ~/.rvm/scripts/rvm
```

检查一下是否安装正确

```shell
$ rvm -v
rvm 1.22.17 (stable) by Wayne E. Seguin <wayneeseguin@gmail.com>, Michal Papis <mpapis@gmail.com> [https://rvm.io/]
```

### 步骤2 － 用 RVM 安装 Ruby 环境

```shell
$ rvm install 2.0.0
```

同样继续等待漫长的下载，编译过程，完成以后，Ruby, Ruby Gems 就安装好了。

### 步骤3 － 设置 Ruby 版本

RVM 装好以后，需要执行下面的命令将指定版本的 Ruby 设置为系统默认版本

```shell
$ rvm 2.0.0 --default
```

同样，也可以用其他版本号，前提是你有用 rvm install 安装过那个版本

这个时候你可以测试是否正确

$ ruby -v
ruby 2.0.0p247 (2013-06-27 revision 41674) [x86_64-darwin13.0.0]

$ gem -v
2.1.6

$ gem source -r https://rubygems.org/
$ gem source -a https://ruby.taobao.org
步骤4 － 安装 Rails 环境

上面 3 个步骤过后，Ruby 环境就安装好了，接下来安装 Rails

$ gem install rails
然后测试安装是否正确

$ rails -v
Rails 3.2.13
然后开始你的 Ruby，Rails 之旅吧。
欢迎来到 Ruby 的世界！

其他资源

https://github.com/huacnlee/init.d - 快速安装生产环境的 Ubuntu Server 批量脚本

tmp
====

$ /bin/bash --login
$ rvm use 2.1.4