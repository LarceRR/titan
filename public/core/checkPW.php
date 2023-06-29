<?php
    require_once 'connect.php';
    session_start();
    $token = $_POST['token'];
    $user = $_POST['user'];
    $tokenmd5 = md5($token);

    $check_login = mysqli_query($connect, "SELECT * FROM `data` WHERE `password` = '$tokenmd5' AND `login` = '$user'");
    if (mysqli_num_rows($check_login) > 0) {

        echo true;
        die();
    } else {
        echo false;
        die();
    }

?>