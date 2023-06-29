<?php

session_start();
require_once 'connect.php';
    $full_name = $_POST['full_name'];
    $login = $_POST['login'];
    $password = $_POST['password'];
    $password_confirm = $_POST['confirm_password'];
$check_login = mysqli_query($connect, "SELECT * FROM `users` WHERE `login` = '$login'");
if (mysqli_num_rows($check_login) > 0) {
    $response = [
        "status" => false,
        "type" => 1,
        "toast_type" => "info",
        "message" => "Такой логин уже существует",
        "fields" => ['login'],
        "toast_title" => "Логин"
    ];

    echo json_encode($response);
    die();
}

$error_fields = [];

if ($login === '') {
    $error_fields[] = 'login';
}

if ($password === '') {
    $error_fields[] = 'password';
}

if ($full_name === '') {
    $error_fields[] = 'full_name';
}

if ($password_confirm === '') {
    $error_fields[] = 'confirm_password';
}

if (!isset($_FILES['avatar'])) {
    $error_fields[] = 'avatar';
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


if ($password === $password_confirm) {

    $path_parth = pathinfo($_FILES['avatar']['full_path']);
    
    $path = 'upd/' . $login . '.' . $path_parth['extension'];
    if (!move_uploaded_file($_FILES['avatar']['tmp_name'], '../' . $path)) {
        $response = [
            "status" => false,
            "type" => 3,
            "toast_type" => "error",
            "message" => "Ошибка при загрузке аватарки",
            "toast_title" => "Аватар"
        ];
        echo json_encode($response);
    }

    $password = md5($password);

    mysqli_query($connect, "INSERT INTO `users` (`id`, `full_name`, `login`, `password`, `avatar`) VALUES (NULL, '$full_name', '$login', '$password', '$path')");

    $response = [
        "status" => true,
        "type" => 2,
        "toast_type" => "success",
        "message" => "Регистрация прошла успешно!",
        "toast_title" => "Успех!"
    ];
    echo json_encode($response);


} else {
    $response = [
        "status" => false,
        "type" => 3,
        "toast_type" => "warning",
        "message" => "Пароли не совпадают",
        "toast_title" => "Пароль"
    ];
    echo json_encode($response);
}
?>
