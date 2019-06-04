<?php
    header('content-type:text/html;charset=utf-8');
    
    $connect=@mysql_connect('localhost','root','');

    mysql_select_db('konka');
    mysql_query('SET NAMES UTF8');

    $result=mysql_query("select * from tv_commodity_list");
    $comlist=array();
    for($i = 0;$i < mysql_num_rows($result);$i++){
        $comlist[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
    }
    echo json_encode($comlist);
?>