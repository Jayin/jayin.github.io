使用PHP得到所有的HTTP请求头
---
> 2014-12-31


如果是查文档的话，查到[getallheaders](http://php.net/manual/zh/function.getallheaders.php) 和 [apache_request_headers](http://php.net/manual/zh/function.apache-request-headers.php)

```php

//e.g. apache_request_headers()
<?php
$headers = apache_request_headers();

foreach ($headers as $header => $value) {
    echo "$header: $value <br />\n";
}
?>

```

文档目录上是`PHP 手册 > 函数参考 > 针对服务器的扩展 > Apache > Apache 函数`,这是针对在apache服务器上的函数，万一哪日替换成Nginx服务器,
悲剧来了，**对应的函数不起作用**，这是我们不期望见到这种情况

 
解决办法：

  我们发现TTP请求头信息保存在`$_SERVER`,并均为以`HTTP_`开头

```php

<?php
function parseRequestHeaders() {
    $headers = array();
    foreach($_SERVER as $key => $value) {
        if (substr($key, 0, 5) <> 'HTTP_') {
            continue;
        }
        $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
        $headers[$header] = $value;
    }
    return $headers;
}
?>

```

 