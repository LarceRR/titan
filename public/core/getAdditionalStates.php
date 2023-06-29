<?php
require_once 'connect.php';
$dir = $_POST['btn'];
if (isset($_POST['theme']) && $_POST['theme'] == 'amRows') {
    $amountRows = mysqli_query($connect, "SELECT * FROM $dir WHERE state = 'On'");
    $amRows = mysqli_num_rows($amountRows);
    echo $amRows;
} else {
    $data = mysqli_query($connect, "SELECT * FROM $dir");
    $array = array();
    while($row = mysqli_fetch_assoc($data)){
        $array[] = $row;
    }
    $res = json_encode($array);
    $response = [
        "state" => json_decode($res),
    ];
    echo json_encode($response);
}

?>