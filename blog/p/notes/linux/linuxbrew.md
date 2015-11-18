# linuxbrew

[linuxbrew](https://github.com/Homebrew/linuxbrew)是Homebrew 移植到linux平台的分支。如果你不喜欢apt-get,yum这类的linux平台上包管理器，那么linuxbrew就是你最佳的选择。我选择他的原因很简单——他的包的版本更新比较快，对于喜欢尝新但又不喜欢折腾怎么安装的人来说，简直是福音！

下面是我遇到的问题汇集

### 安装的时候出现`"Don't run this as root!"`

换个姿势,手动安装, 安装全脚本在这[install-linuxbrew.sh](https://gist.github.com/Jayin/a5304b461f43195be736)
```bash
git clone https://github.com/Homebrew/linuxbrew.git ~/.linuxbrew
```

### 因为被墙，无法下载一些包
例如`brew install php70`, 在阿里云上可能会出现：
```
Error: Failed to download resource "libpng"
Download failed: https://dl.bintray.com/homebrew/mirror/libpng-1.6.18.tar.xz
```

所以一般都是自己手动下载(寻找一些没有被墙的镜像下载)，并放到`~/.cache/Homebrew/`下，然后继续`brew install php70`，如果从cache里面找到对应版本的包，就直接使用这个包来安装，而不是去网络上下载

