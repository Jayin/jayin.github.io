MySQL
===

- [MySQL 备份](mysql_backup.md)
- [MySQL 备份2](mysql_backup2.md)





MySql 操作

### 增加一个字段
```
//增加一个字段，默认为空
alter table user add COLUMN new1 VARCHAR(20) DEFAULT NULL; 

 //增加一个字段，默认不能为空  www.2cto.com  
alter table user add COLUMN new2 VARCHAR(20) NOT NULL; 
```
 
### 删除一个字段
```
//删除一个字段
alter table user DROP COLUMN new2; 　 
```
 
### 修改一个字段
```
//修改一个字段的类型
alter table user MODIFY new1 VARCHAR(10); 　
 
//修改一个字段的名称，此时一定要重新指定该字段的类型
alter table user CHANGE new1 new4 int;　 
```