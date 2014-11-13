MySQL 备份命令
===

备份数据库命令: 
```
# user: root 
# password :root
# database :hellworld
# ouput file `helloworld_backup.sql`
```
```shell
mysqldump -u root --password=root --database  helloworld > helloworld_backup.sql
```

PHP 版本参考：
```php
<?php 
/** 
 * Mysql 备份
 * only support windows
 * @author Jayin Ton
 * @param  string $mysql_user       mysql 登录用户
 * @param  string $mysql_password   mysql 密码
 * @param  stgring $database        需要你备份的数据库
 * @param  string $backup_file     备份保存文件
 * @param  string $mysql_bin_folder mysql目录 若已配置到环境,可以忽略,若没有配置，请给出Mysql bin/目录的路径
 * @return boolean True if backup successfully
 */
function mysql_backup($mysql_user,$mysql_password,$database,$backup_file,$mysql_bin_folder = null){
     if(is_null($mysql_bin_folder) || empty($mysql_bin_folder)){
         $mysqldump = "mysqldump";
     }else{
        $mysqldump = $mysql_bin_folder."mysqldump";
     }
     $cmd = $mysqldump.' -u '.$mysql_user.' --password='.$mysql_password.' --database  '.$database.' > '.$backup_file;
     exec ($cmd ,  $output , $return_var  );
     if($return_var == 0 ){
            echo 'bucakup finish';
            return true;
     }
     exit($output);
}

date_default_timezone_set("Asia/Hong_Kong");
// window下若没有配置到环境变量，则要指定mysql的bin/目录
// $mysqldump = "E:\phpenv\wamp\bin\mysql\mysql5.6.17\bin\\";
$mysql_user = 'root';
$mysql_password = 'root';
$database = 'mz';
$output_file = date("Y-m-d-h_i_s").'.sql';

mysql_backup($mysql_user,$mysql_password,$database,$output_file);

```





其他用法:
===

### 1.导出整个数据库
```shell
mysqldump -u 用户名 -p 数据库名 > 导出的文件名   
mysqldump -u wcnc -p smgp_apps_wcnc > wcnc.sql
```


### 2.导出一个表
```shell
mysqldump -u 用户名 -p 数据库名表名> 导出的文件名
mysqldump -u wcnc -p smgp_apps_wcnc users> wcnc_users.sql
```

### 3.导出一个数据库结构
```shell
mysqldump -u wcnc -p -d --add-drop-table smgp_apps_wcnc >d:\wcnc_db.sql
```

-d 没有数据 --add-drop-table 在每个create语句之前增加一个drop table

### 4.导入数据库
mysql>use 数据库
然后使用source命令，后面参数为脚本文件（如这里用到的.sql）
```shell
mysql>source d:\wcnc_db.sql
```