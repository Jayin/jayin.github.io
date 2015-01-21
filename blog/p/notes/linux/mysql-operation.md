linux下MySql操作
---

0.Login mysql:

    mysql -u用户名 -p密码

如果密码有特殊字符就先mysql -u用户名 -p回车
密码回车

1.linux下启动mysql的命令：

    mysqladmin start
    /ect/init.d/mysql start (前面为mysql的安装路径)

2.linux下重启mysql的命令：

    mysqladmin restart
    /ect/init.d/mysql restart (前面为mysql的安装路径)

3.linux下关闭mysql的命令：

    mysqladmin shutdown
    /ect/init.d/mysql shutdown (前面为mysql的安装路径)

4.连接本机上的mysql：

进入目录mysql\bin，再键入命令

    mysql -uroot -p

回车后提示输入密码。
退出mysql命令：
    exit（回车）

5.修改mysql密码：

    mysqladmin -u用户名 -p旧密码 password 新密码

或进入mysql命令行`SET PASSWORD FOR root=PASSWORD("root");`

6.增加新用户。（注意：mysql环境中的命令后面都带一个分号作为命令结束符）

    grant select on 数据库.* to 用户名@登录主机 identified by "密码"

如增加一个用户test密码为123，让他可以在任何主机上登录， 并对所有数据库有查询、插入、修改、删除的权限。首先用以root用户连入mysql，然后键入以下命令：

    grant select,insert,update,delete on *.* to " Identified by "123";

二、有关mysql数据库方面的操作
必须首先登录到mysql中，有关操作都是在mysql的提示符下进行，而且每个命令以分号结束

1、显示数据库列表。

    show databases;

2、显示库中的数据表：

    use mysql； ／／打开库
    show tables;

3、显示数据表的结构：

    describe 表名;

4、建库：

    create database 库名;

    GBK: create database test2 DEFAULT CHARACTER SET gbk COLLATE gbk_chinese_ci;
    UTF8: CREATE DATABASE `test2` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
5、建表：

    use 库名；
    create table 表名(字段设定列表)；

6、删库和删表:

    drop database 库名;
    drop table 表名；

7、将表中记录清空：

    delete from 表名;
    truncate table  表名;

8、显示表中的记录：

    select * from 表名;

9、编码的修改
如果要改变整个mysql的编码格式：  
启动mysql的时候，`mysqld_safe`命令行加入  

    --default-character-set=gbk 

如果要改变某个库的编码格式：在mysql提示符后输入命令  

    alter database db_name default character set gbk;

10.重命名表

    alter table t1 rename t2;

11.查看sql语句的效率

    explain < table_name >

例如：`explain select * from t3 where id=3952602;`

12.用文本方式将数据装入数据库表中(例如D:/mysql.txt)

    mysql> LOAD DATA LOCAL INFILE "D:/mysql.txt" INTO TABLE MYTABLE;

三、数据的导入导出

1、文本数据转到数据库中

文本数据应符合的格式：字段数据之间用tab键隔开，null值用来代替。例：

    name duty 2006-11-23

数据传入命令 `load data local infile "文件名" into table 表名;`

2、导出数据库和表

    mysqldump --opt news > news.sql（将数据库news中的所有表备份到news.sql文件，news.sql是一个文本文件，文件名任取。）
    mysqldump --opt news author article > author.article.sql（将数据库news中的author表和article表备份到author.article.sql文件， author.article.sql是一个文本文件，文件名任取。）
    mysqldump --databases db1 db2 > news.sql（将数据库dbl和db2备份到news.sql文件，news.sql是一个文本文件，文件名任取。）
    mysqldump -h host -u user -p pass --databases dbname > file.dump
就是把host上的以名字user，口令pass的数据库dbname导入到文件file.dump中

    mysqldump --all-databases > all-databases.sql（将所有数据库备份到all-databases.sql文件，all-databases.sql是一个文本文件，文件名任取。）

3、导入数据

    mysql < all-databases.sql（导入数据库）
    mysql>source news.sql;（在mysql命令下执行，可导入表）


一、连接MySQL 

格式： mysql -h主机地址 -u用户名 －p用户密码

1、例1：连接到本机上的MYSQL。

首先在打开DOS窗口，然后进入目录 mysqlbin，再键入命令`mysql -uroot -p`，回车后提示你输密码，如果刚安装好MYSQL，超级用户root是没有密码的，故直接回车即可进入到MYSQL中了，MYSQL的提示符是： mysql>。

2、例2：连接到远程主机上的MYSQL。假设远程主机的IP为：`110.110.110.110`，用户名为`root`,密码为`abcd123`。则键入以下命令：

    mysql -h110.110.110.110 -uroot -pabcd123

（注:u与root可以不用加空格，其它也一样）

3、退出MYSQL命令： 

    exit （回车）。


二、修改密码

格式：mysqladmin -u用户名 -p旧密码 password 新密码

1、例1：给root加个密码ab12。首先在DOS下进入目录mysqlbin，然后键入以下命令：

    mysqladmin -uroot -password ab12

注：因为开始时root没有密码，所以-p旧密码一项就可以省略了。

2、例2：再将root的密码改为djg345。

    mysqladmin -uroot -pab12 password djg345

三、增加新用户。（注意：和上面不同，下面的因为是MySQL环境中的命令，所以后面都带一个分号作为命令结束符）

格式：`grant select on 数据库.* to 用户名@登录主机 identified by \"密码\"`

例1、增加一个用户test1密码为abc，让他可以在任何主机上登录，并对所有数据库有查询、插入、修改、删除的权限。首先用以root用户连入MySQL，然后键入以下命令：

    grant select,insert,update,
    delete on *.* to test1@\"%\" Identified by \"abc\";

但例1增加的用户是十分危险的，你想如某个人知道test1的密码，那么他就可以在internet上的任何一台电脑上登录你的MySQL数据库并对你的数据可以为所欲为了，解决办法见例2。

例2、增加一个用户test2密码为abc,让他只可以在localhost上登录，并可以对数据库mydb进行查询、插入、修改、删除的操作 （localhost指本地主机，即MySQL数据库所在的那台主机），这样用户即使用知道test2的密码，他也无法从internet上直接访问数据 库，只能通过MySQL主机上的web页来访问。

    grant select,insert,update,
    delete on mydb.* to test2@localhost identified by \"abc\";

如果你不想test2有密码，可以再打一个命令将密码消掉。

    grant select,insert,update,delete on mydb
    .* to test2@localhost identified by \"\";

 

启动：

    net start mySql;

进入：

    mysql -u root -p/mysql -h localhost -u root -p databaseName;

列出数据库：

    show databases;

选择数据库：

    use databaseName;

列出表格：

    show tables；

显示表格列的属性：

    show columns from tableName；

建立数据库：

    source fileName.txt;

匹配字符：可以用通配符_代表任何一个字符，％代表任何字符串;
增加一个字段：

    alter table tabelName add column fieldName dateType;

增加多个字段：

    alter table tabelName add column fieldName1 dateType,add columns fieldName2 dateType;

多行命令输入:注意不能将单词断开;当插入或更改数据时，不能将字段的字符串展开到多行里，否则硬回车将被储存到数据中;
增加一个管理员帐户：

    grant all on *.* to user@localhost identified by "password";

每条语句输入完毕后要在末尾填加分号';'，或者填加'\g'也可以；

查询时间：
    
    select now();

查询当前用户：
    
    select user();

查询数据库版本：
    
    select version();

查询当前使用的数据库：
    
    select database();

1、删除student_course数据库中的students数据表：

    rm -f student_course/students.*

2、备份数据库：(将数据库test备份)

    mysqldump -u root -p test>c:\test.txt

备份表格：(备份test数据库下的mytable表格)
    
    mysqldump -u root -p test mytable>c:\test.txt

将备份数据导入到数据库：(导回test数据库)
    
    mysql -u root -p test

3、创建临时表：(建立临时表zengchao)

    create temporary table zengchao(name varchar(10));

4、创建表是先判断表是否存在

    create table if not exists students(……);

5、从已经有的表中复制表的结构

    create table table2 select * from table1 where 1<>1;

6、复制表

    create table table2 select * from table1;

7、对表重新命名

    alter table table1 rename as table2;

8、修改列的类型

    alter table table1 modify id int unsigned;//修改列id的类型为int unsigned
    alter table table1 change id sid int unsigned;//修改列id的名字为sid，而且把属性修改为int unsigned

9、创建索引

    alter table table1 add index ind_id (id);
    create index ind_id on table1 (id);
    create unique index ind_id on table1 (id);//建立唯一性索引

10、删除索引

    drop index idx_id on table1;
    alter table table1 drop index ind_id;

11、联合字符或者多个列(将列id与":"和列name和"="连接)

    select concat(id,':',name,'=') from students;


12、limit(选出10到20条)<第一个记录集的编号是0>

    select * from students order by id limit 9,10;


13、MySQL不支持的功能

事务，视图，外键和引用完整性，存储过程和触发器


14、MySQL会使用索引的操作符号

<,<=,>=,>,=,between,in,不带%或者_开头的like


15、使用索引的缺点

* 减慢增删改数据的速度；
* 占用磁盘空间；
* 增加查询优化器的负担；
当查询优化器生成执行计划时，会考虑索引，太多的索引会给查询优化器增加工作量，导致无法选择最优的查询方案；


16、分析索引效率

方法：在一般的SQL语句前加上explain；
分析结果的含义：  
* table：表名；
* type：连接的类型，(ALL/Range/Ref)。其中ref是最理想的；
* possible_keys：查询可以利用的索引名；
* key：实际使用的索引；
* key_len：索引中被使用部分的长度（字节）；
* ref：显示列名字或者"const"（不明白什么意思）；
* rows：显示MySQL认为在找到正确结果之前必须扫描的行数；
* extra：MySQL的建议；


17、使用较短的定长列

* 尽可能使用较短的数据类型；
* 尽可能使用定长数据类型；
    * 用char代替varchar，固定长度的数据处理比变长的快些；
    * 对于频繁修改的表，磁盘容易形成碎片，从而影响数据库的整体性能；
    * 万一出现数据表崩溃，使用固定长度数据行的表更容易重新构造。使用固定长度的数据行，每个记录的开始位置都是固定记录长度的倍数，可以很容易被检测到，但是使用可变长度的数据行就不一定了；
    * 对于MyISAM类型的数据表，虽然转换成固定长度的数据列可以提高性能，但是占据的空间也大；

18、使用not null和enum

尽量将列定义为not null，这样可使数据的出来更快，所需的空间更少，而且在查询时，MySQL不需要检查是否存在特例，即null值，从而优化查询；
如果一列只含有有限数目的特定值，如性别，是否有效或者入学年份等，在这种情况下应该考虑将其转换为enum列的值，MySQL处理的更快，因为所有的enum值在系统内都是以标识数值来表示的；


19、使用optimize table

对于经常修改的表，容易产生碎片，使在查询数据库时必须读取更多的磁盘块，降低查询性能。具有可变长的表都存在磁盘碎片问题，这个问题对blob数据类型更为突出，因为其尺寸变化非常大。可以通过使用optimize table来整理碎片，保证数据库性能不下降，优化那些受碎片影响的数据表。 optimize table可以用于MyISAM和BDB类型的数据表。实际上任何碎片整理方法都是用mysqldump来转存数据表，然后使用转存后的文件并重新建数据表；


20、使用procedure analyse()

可以使用procedure analyse()显示最佳类型的建议，使用很简单，在select语句后面加上procedure analyse()就可以了；例如：

    select * from students procedure analyse();
    select * from students procedure analyse(16,256);

第二条语句要求procedure analyse()不要建议含有多于16个值，或者含有多于256字节的enum类型，如果没有限制，输出可能会很长；


21、使用查询缓存

* 查询缓存的工作方式：
第一次执行某条select语句时，服务器记住该查询的文本内容和查询结果，存储在缓存中，下次碰到这个语句时，直接从缓存中返回结果；当更新数据表后，该数据表的任何缓存查询都变成无效的，并且会被丢弃。
* 配置缓存参数：
变量：query_cache _type，查询缓存的操作模式。有3中模式，0：不缓存；1：缓存查询，除非与 select sql_no_cache开头；2：根据需要只缓存那些以select sql_cache开头的查询； query_cache_size：设置查询缓存的最大结果集的大小，比这个值大的不会被缓存。


22、调整硬件

* 在机器上装更多的内存；
* 增加更快的硬盘以减少I/O等待时间；
寻道时间是决定性能的主要因素，逐字地移动磁头是最慢的，一旦磁头定位，从磁道读则很快；
* 在不同的物理硬盘设备上重新分配磁盘活动；
如果可能，应将最繁忙的数据库存放在不同的物理设备上，这跟使用同一物理设备的不同分区是不同的，因为它们将争用相同的物理资源（磁头）。
