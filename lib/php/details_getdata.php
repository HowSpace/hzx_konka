<?php
    include('./conn.php');

    $id=$_REQUEST['sid'];
    $result=mysql_query("select * from details_list");
    // echo $result;
    $deta_list=array();
    for($i =0;$i<mysql_num_rows($result);$i++){
        $deta_list[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
    }
    $json=json_encode($deta_list);
    echo $json;
?>