mysqldump - 给 DBA 的 25 个小技巧
---
>本文作者是 NIVAS，原文地址是 [mysqldump – 25 tips for DBAs](http://mysqlblogger.net/mysqldump-25-tips-for-dbas/)


mysqldump 是文本备份还是二进制备份
---

它是文本备份，如果你打开备份文件你将看到所有的语句，可以用于重新创建表和对象。它也有 insert 语句来使用数据构成表。

mysqldump 的语法是什么？
---

```
 mysqldump -u [uname] -p[pass] –databases [dbname][dbname2] > [backupfile.sql]
```

使用 mysqldump 怎样备份所有数据库？
---

```
mysqldump -u root -p –all-databases > backupfile.sql
```

使用 mysqldump 怎样备份指定的数据库？
---

```
mysqldump -u root -p –databases school hospital > backupfile.sql
```

使用 mysqldump 怎样备份指定的表？
---

```
mysqldump –user=root –password=mypassword -h localhost databasename table_name_to_dump table_name_to_dump_2 > dump_only_two_tables_file.sql
```

我不想要数据，怎样仅获取 DDL？
---

```
mysqldump -u root -p –all-databases –no-data > backupfile.sql
```

一次 mysqldump 备份花费多长时间？
---

这依赖于数据库大小，100 GB 大小的数据库可能花费两小时或更长时间

怎样备份位于其他服务器的远程数据库？
---

````
mysqldump -h 172.16.25.126 -u root -ppass dbname > dbname.sql
```

–routines 选项的含义是什么？
---

通过使用 -routines 产生的输出包含 CREATE PROCEDURE 和 CREATE FUNCTION 语句用于重新创建 routines。如果你有 procedures 或 functions 你需要使用这个选项

怎样列出 mysqldump 中的所有选项？
---

mysqldump –help

mysqldump 中常用的选项是？
---

```
All-databases
Databases 
Routines
Single-transaction （它不会锁住表） – 一直在 innodb databases 中使用
Master-data – 复制 （现在忽略了）
No-data – 它将 dump 一个没有数据的空白数据库
```

默认所有的 triggers 都会备份吗？
---
是的


single transaction 选项的含义是什么？
---

–singletransaction 选项避免了 innodb databases 备份期间的任何锁，如果你使用这个选项，在备份期间，没有锁

使用 mysqldump 备份的常用命令是什么？
---

```
nohup mysqldump –socket=mysql.sock –user=user1 –password=pass –single-transaction –flush-logs –master-data=2 –all-databases –extended-insert –quick –routines > market_dump.sql 2> market_dump.err &
```

使用 mysqldump 怎样压缩一个备份？
---

注意: 压缩会降低备份的速度
```
Mysqldump [options] | gzip > backup.sql.gz
```

mysqldump 备份大数据库是否是理想的？
---

依赖于你的硬件，包括可用的内存和硬盘驱动器速度，一个在 5GB 和 20GB 之间适当的数据库大小。 虽然有可能使用  mysqldump 备份 200GB 的数据库，这种单一线程的方法需要时间来执行。

怎样通过使用 mysqldump 来恢复备份？
---

使用来源数据的方法
```
Mysql –u root –p < backup.sql
```

在恢复期间我想记录错误到日志中，我也想看看恢复的执行时间？
---

```
Time Mysql –u root –p < backup.sql > backup.out 2>&1
```

怎样知道恢复是否正在进行？
---

显示完整的进程列表

如果数据库是巨大的，你不得不做的事情是？
---

使用 nohup 在后台运行它


我是否可以在 windows 上使用 mysqldump 备份然后在 linux 服务器上恢复？
---

是的

我怎么传输文件到目标服务器上去？
---

* 使用 scp
* 使用 sftp
* 使用 winscp

如果我使用一个巨大的备份文件来源来恢复会发生什么？
---

如果你的一个数据库备份文件来源，它可能需要很长时间运行。处理这种情况更好的方式是使用 nohup 来在后台运行。也可使用在 unix 中的 screen 代替

默认情况下，mysqldump 包含 drop 数据库吗？
---

你需要添加 –add-drop-database 选项

怎样从一个多数据库备份中提取一个数据库备份（假设数据库名字是 test）？
---

```
sed -n '/^-- Current Database: `test`/,/^-- Current Database: `/p' fulldump.sql > test.sql
```
