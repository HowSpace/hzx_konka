<?php
    include('./conn.php');
    if(isset($_POST['username']) || isset($_POST['subbtn'])){
        $username=@$_POST['username'];
    }else{
        exit('非法操作!');
    }

    $result=mysql_query("select * from user_list where username='$username'");

    if(mysql_fetch_array($result)){
        echo '用户名已存在！';
    }else{
        echo '用户名可用';
    }
    if(!($_POST['subbtn']) && !($_POST['subbtn']==="提交")){
        echo 'no_submit';
    }
    if(isset($_POST['subbtn']) && $_POST['subbtn']==="提交"){
        $user=$_POST['username'];
        $email=$_POST['email'];
        $pass=($_POST['uword']);

        mysql_query("insert user_list (sid,username,email,password) values(null,'$user','$email','$pass')");
        header('location:login.html');
    }
?>

