# SERVER-NODE

## mysql修改用户名, 密码的方法

```
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| mysqltest          |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)

mysql> use mysql; // 选择数据库(mysql), 在该数据库中有一张user表, 更新这个表的数据, 
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed

mysql> show tables;
+------------------------------------------------------+
| Tables_in_mysql                                      |
+------------------------------------------------------+
| columns_priv                                         |
| component                                            |
| db                                                   |
| default_roles                                        |
 ......
| time_zone_transition                                 |
| time_zone_transition_type                            |
| user                                                 |
+------------------------------------------------------+
37 rows in set (0.01 sec)

mysql> select user from user; // 更新前查看数据
+------------------+
| user             |
+------------------+
| mysql.infoschema |
| mysql.session    |
| mysql.sys        |
| root             |
+------------------+
4 rows in set (0.00 sec)

mysql> update user set user="sqlwd" where user="root"; // 将用户名root改为sqlwd
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> flush privileges; // 刷新权限
Query OK, 0 rows affected (0.00 sec)

mysql> select user from user; // 更新后查看数据
+------------------+
| user             |
+------------------+
| mysql.infoschema |
| mysql.session    |
| mysql.sys        |
| sqlwd             |
+------------------+
4 rows in set (0.00 sec)

mysql> alter user 'sqlwd'@'localhost' identified by ''; // 修改密码为无密码
Query OK, 0 rows affected (0.00 sec)

mysql> exit // 退出
Bye
$ mysql -u sqlwd // 重新登录
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 55
Server version: 8.0.26 MySQL Community Server - GPL

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 
```
