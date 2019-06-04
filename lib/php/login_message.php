<?php
    include('./conn.php');

    if(isset($_POST['name']) && isset($_POST['pass']) && isset($_POST['email'])){
        $user=$_POST['name'];
        $pass=$_POST['pass'];
        $email=$_POST['email'];
    }else{
        exit('非法操作！');
    }
    $result=mysql_query("select * from user_list where username='$user' and password='$pass' and email='$email'");
    if(mysql_fetch_array($result,MYSQL_ASSOC)){
        echo true;
    }else{
        echo false;
        exit('非法操作！');
    }
?>