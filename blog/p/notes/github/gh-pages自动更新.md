GitHub Page: gh-pages自动更新
--------
>2016-10-04

### GitHub Page 简介

GitHub 提供了一个静态资源托管服务—— GitHub Pages 。大量托管在 GitHub 的开源项目都用到了GitHub Page , 用于项目的官网简介，或者文档演示。

用法相对简单，把需要作为静态资源托管的文件，放在改项目的`gh-pages`分支上，把该分支推送到。如：ZtbCMS的文档项目[ztbcms/docs][1]. 访问 `http://ztbcms.github.io/docs` 即可预览该
项目的文档网页。同时，还支持自定义域名，吸引了不少个人用户。

### gh-pages 分支的不足

早期的 GitHub Pages 服务仅能通过 gh-pages 该分支，告诉 GitHub 哪些内容需要作为静态资源托管，所以每一次需要手动checkout 分支，添加内容，然后推送到 gh-pages 分支。
当然，如果你不嫌弃麻烦的，的确可以这么做，但是这些机械劳动完全可以变为自动化工作。

### 实现 gh-pages 自动更新

实现自动更新，无非都是写一些自动化模拟这个操作。 这里，我们采用 [Travis CI][3]（免费的持续集成服务） + [git-update-ghpages][2]工具。
本来想详细写怎么操作，不过发现 [git-update-ghpages][2] 文档已经写得非常好，我没有必要翻译一遍, 请看文档操作。

在配置的过程中，可能会遇到一些问题，我在这里分享下：

1. [Travis CI][3] 请做好GitHub授权工作，不然无法找到你的 GitHub 仓库
2. 请确保环境变量`GITHUB_TOKEN`已添加到[Travis CI][3]的对应项目上，不然自动推送到 gh-pages 时提示非法操作
3. 你也可以本地使用 [git-update-ghpages][2] 来自动更新
4. 检测你的 GitHub 账号邮箱，[Travis CI][3] 会告诉你改项目的构建结果
5. 项目首次在[Travis CI][3] 上构建相对比较慢，请给一点耐心
 
### GitHub Page 的现状

现在的 gh-pages 功能改进了不少：

- 静态资源托管数据源可设置不使用 gh-pages 分支，而是可以 设置为`master`分支  或者`master`分支下的`/docs`文件目录
- 不需要创建CNAME文件即可绑定域名，省了不少功夫

存在困难是：

- 中国部分网络可能无法访问 GitHub Page 上的静态内容


[1]: https://github.com/ztbcms/docs/tree/gh-pages 
[2]: https://github.com/rstacruz/git-update-ghpages
[3]: https://travis-ci.org



