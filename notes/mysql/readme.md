MySql 操作

### 增加一个字段
alter table user add COLUMN new1 VARCHAR(20) DEFAULT NULL; //增加一个字段，默认为空
alter table user add COLUMN new2 VARCHAR(20) NOT NULL;  //增加一个字段，默认不能为空  www.2cto.com  
 
### 删除一个字段
alter table user DROP COLUMN new2; 　 //删除一个字段
 
### 修改一个字段
alter table user MODIFY new1 VARCHAR(10); 　//修改一个字段的类型
 
alter table user CHANGE new1 new4 int;　 //修改一个字段的名称，此时一定要重新指定该字段的类型