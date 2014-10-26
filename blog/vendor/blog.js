(function($) {
    var app_name = '';
    var blog_base = '';
    //当前请求的markdown文件
    var cur_md_path = '';
    /*是否是http:// 如果是，那么这是资源文件,如果否，说明这是要处理的a标签*/
    function isAbsolute(url) {
            return url.indexOf('//') !== -1;
        }
        /*获得相对目录*/
    function getPageBase(url) {
            return url.slice(0, url.lastIndexOf('/') + 1);
        }
        /*判断加载的路径是否是markdown文件*/
    function isMarkdownFile(url) {
            return url.toLowerCase().indexOf('.md') !== -1 || url.toLowerCase().indexOf('.markdown') !== -1;
        }
        //获得markdown的文件名,用作标题
    function getMarkdownTitle(file_path) {
            if (!isMarkdownFile(file_path)) {
                return app_name;
            } else {
                var real_file_name = file_path;
                if (hasFolder(file_path)) {
                    real_file_name = file_path.slice(file_path.lastIndexOf('/') + 1, file_path.length);
                }
                return real_file_name.split('.')[0];
            }
        }
        /**
         * @param selector 选择器
         * @param  file_path 文件路径
         * @param  isSidebar 是否是左边导航栏
         * @param  baseUrl 基准url
         */
    function load(selector, file_path, isSidebar, baseUrl) {
        baseUrl = baseUrl || blog_base;
        isSidebar = isSidebar || false;

        var p_url = baseUrl + file_path;

        console.log("load-->" + p_url);
        console.log(blog_base);
        console.log(app_name);
        $.get(p_url, function(data) {
            marked.setOptions({
                highlight: function(code) {
                    return hljs.highlightAuto(code).value;
                }
            });
            $(selector).html(marked(data));

            //处理所有scr
            $(selector).find('[href]').each(function() {
                var $element = $(this);
                var url = $element.attr('href');

                if (isAbsolute(url)) {
                    $element.attr('target', '_blank');
                }

                // sidebar
                if (isSidebar && isMarkdownFile(url)) {
                    $element.attr('href', '?' + url);

                }

                //main page
                if (!isAbsolute(url) && !isSidebar && isMarkdownFile(url) ) {
                    $element.attr('href', '?' + getPageBase(cur_md_path) + url);
                }
            });
            //title
            if (!isSidebar) {
                var mainTitle = $('#main-page').find('h1, h2, h3, h4, h5, h6').first().text();
                $('title').text(mainTitle);
            }

        }).fail(function(err) {
            if (err.status === 404) {
                console.log('404-->' + '/' + app_name + '/');
                console.log($._c);
                load('#main-page', '404.md', false, '/' + app_name + '/');
            }
        });
    }

    function read_config(callback) {
        $.getJSON('config.json', {}, function(data) {
            app_name = data.app_name || app_name;
            blog_base = '/' + app_name + '/p/';
            console.log('---read config');
            console.log(app_name + ' : ' + blog_base);
            callback();
        }).fail(function(err) {
            alert('读取配置有误');
        });
    }

    function main() {

        read_config(function() {
            //加载侧边菜单栏
            load('#sidebar-page', 'sidebar.md', true);
            //加载主内容页
            cur_md_path = location.search.slice(1, location.search.length);
            if (cur_md_path === '') {
                load('#main-page', 'home.md');
                console.log("load main~");
                //多说评论,若想不在首页显示评论框 那么：取消这一句注释
                //$('.ds-thread').removeClass('ds-thread');
            } else {
                load('#main-page', cur_md_path);
            }
        });
    }

    main();


})(jQuery);
