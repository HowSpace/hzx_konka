<?php
    header('content-type:text/html;charset=utf-8');
    $connect=@mysql_connect('localhost','root','');
    if(!$connect){
        die('数据库连接错误：'.mysql_error());
    }
    mysql_select_db('konka');
    mysql_query('SET NAMES UTF8');
?>
