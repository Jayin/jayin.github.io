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

其他用法: 

1.导出整个数据库
```shell
mysqldump -u 用户名 -p 数据库名 > 导出的文件名   
mysqldump -u wcnc -p smgp_apps_wcnc > wcnc.sql
```


2.导出一个表
```shell
mysqldump -u 用户名 -p 数据库名表名> 导出的文件名
mysqldump -u wcnc -p smgp_apps_wcnc users> wcnc_users.sql
```

3.导出一个数据库结构
```shell
mysqldump -u wcnc -p -d --add-drop-table smgp_apps_wcnc >d:\wcnc_db.sql
```

-d 没有数据 --add-drop-table 在每个create语句之前增加一个drop table

4.导入数据库
mysql>use 数据库
然后使用source命令，后面参数为脚本文件（如这里用到的.sql）
```shell
mysql>source d:\wcnc_db.sql
```