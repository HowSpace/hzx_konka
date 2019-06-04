<?php
    include('./conn.php');

    $idList=$_REQUEST['idList'];

    $sql="select * from details_list where sid in ($idList)";
    $result=mysql_query($sql);
    // echo $result;
    $arr=array();
    while($row=mysql_fetch_array($result,MYSQL_ASSOC))
    {
        $arr[]=$row;
    }
    $json=json_encode($arr);

    echo $json;

?>