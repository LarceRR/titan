<?php

require_once '../connect.php';
$data = mysqli_query($connect, "SELECT * FROM `room1seclight` WHERE btn_name = 'SecWallLight'");
$array = array();
while($row = mysqli_fetch_assoc($data)){
    $array[] = $row;
}

$newArray[] = array('red' => $array[0]['red'], 'green' => $array[0]['green'], 'blue' => $array[0]['blue']);
echo json_encode($newArray[0]);

?>