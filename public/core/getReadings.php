<?php

require_once 'connect.php';
$data = mysqli_query($connect, "SELECT * FROM `readings_water` ORDER BY id DESC");
$array = array();
while($row = mysqli_fetch_assoc($data)){
    $array[] = $row;
}
$res = json_encode($array);
$response = [
    "read" => json_decode($res),
];
echo json_encode($response);

?>