<?php

    $connect = mysqli_connect('localhost', 'Denzare', 'Devon145', 'titan');

    if (!$connect) {
        die('Error connect to DataBase');
    }