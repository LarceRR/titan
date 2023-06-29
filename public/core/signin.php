<?php

session_start();
require_once 'connect.php';

$login = $_POST['login'];
$password = $_POST['password'];

$error_fields = [];

if ($login === '') {
    $error_fields[] = 'login';
}

if ($password === '') {
    $error_fields[] = 'password';
}

if (!empty($error_fields)) {
    $response = [
        "status" => false,
        "type" => 1,
        "toast_type" => "info",
        "message" => "Проверьте правильность полей",
        "fields" => $error_fields,
        "toast_title" => "Поля пусты"
    ];

    echo json_encode($response);

    die();
}

$password = md5($password);

$check_user = mysqli_query($connect, "SELECT * FROM `users` WHERE `login` = '$login' AND `password` = '$password'");
if (mysqli_num_rows($check_user) > 0) {
    
    $getGroup = mysqli_query($connect, "SELECT p.id,p.role_name, p.display_color, p.size FROM users d LEFT JOIN permissions p ON d.perm_id = p.id WHERE d.login like '$login';");
    $group = mysqli_fetch_assoc($getGroup);

    $user = mysqli_fetch_assoc($check_user);
    $userFullName = explode(' ',$user['full_name']);

    $_SESSION['auth'] = true;
    $_SESSION['user'] = [
        "id" => $user['id'],
        "login" => $user['login'],
        "full_name" => $user['full_name'],
        "surname" => $userFullName[0],
        "name" => $userFullName[1],
        "middname" => $userFullName[2],
        "firstLett" => substr($userFullName[0], 0, 2),
        "group" => $group,
        "avatar" => $user['avatar']
    ];

    $response = [
        "status" => true,
        "toast_type" => "info",
        "message" => $userFullName
    ];

    echo json_encode($response);

} else {

    $response = [
        "status" => false,
        "toast_type" => "error",
        "type" => 2,
        "message" => 'Неверный логин или пароль',
        "toast_title" => "Данные"
    ];

    echo json_encode($response);
}
?>
