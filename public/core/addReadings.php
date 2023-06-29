<?php
require_once 'connect.php';

if (isset($_POST['action'])) {
    if ($_POST['action'] == 'getPrevValue') {
        if ($_POST['for'] == 'water') {
            $data = mysqli_query($connect, "SELECT value FROM `readings_water` ORDER BY id DESC LIMIT 1;");
            $value = mysqli_fetch_assoc($data);
            echo $value['value'];
        } else if ($_POST['for'] == 'gas') {
            $data = mysqli_query($connect, "SELECT value FROM `readings_gas` ORDER BY id DESC LIMIT 1;");
            $value = mysqli_fetch_assoc($data);
            echo $value['value'];
        } else if ($_POST['for'] == 'light') {
            $data = mysqli_query($connect, "SELECT value FROM `readings_light` ORDER BY id DESC LIMIT 1;");
            $value = mysqli_fetch_assoc($data);
            echo $value['value'];
        }
    } 
} else {

    function getDuplicateDate ($connect, $date, $from) {
        $query = mysqli_query($connect, "SELECT date FROM `".$from."` WHERE `date` = '".$date."';");
        $am = mysqli_num_rows($query);
        if ($am > 0) {
            return true;
        } else 
            return false;
    }

    function SayAnswer ($type, $text) {
        $res = [
            'type' => $type,
            'text' => $text
        ];
        echo json_encode($res);
    }

    $prev = $_POST['prev'];
    $curr = $_POST['curr'];
    $diff = $_POST['diff'];
    $dat  = $_POST['date'];
    
    if (isset($prev) and isset($curr) and isset($diff) and isset($dat)) {
        switch ($_POST['Addfor']) {
            case 'water':
                    if (getDuplicateDate($connect, $_POST['date'],'readings_water')) {
                        SayAnswer("warning", 'Показания воды с такой датой уже существуют.');
                    } else {
                        mysqli_query($connect, "INSERT INTO `readings_water` (`date`, `prev_value`, `value`, `diff`) VALUES ('$dat',$prev,$curr,$diff)");
                        SayAnswer("success", 'Вы успешно внесли новые показания воды!');
                    };
                break;
            case 'gas':
                    if (getDuplicateDate($connect, $_POST['date'],'readings_gas')) {
                        SayAnswer("warning", 'Показания воды с такой датой уже существуют.');
                    } else {
                        mysqli_query($connect, "INSERT INTO `readings_gas` (`date`, `prev_value`, `value`, `diff`) VALUES ('$dat',$prev,$curr,$diff)");
                        SayAnswer("success", 'Вы успешно внесли новые показания газа!');
                    };
                break;
            case 'light':
                    if (getDuplicateDate($connect, $_POST['date'],'readings_light')) {
                        SayAnswer("warning", 'Показания воды с такой датой уже существуют.');
                    } else {
                        mysqli_query($connect, "INSERT INTO `readings_light` (`date`, `prev_value`, `value`, `diff`) VALUES ('$dat',$prev,$curr,$diff)");
                        SayAnswer("success", 'Вы успешно внесли новые показания света!');
                    };
                break;
            default:
                # code...
                break;
        }
    } else {
        echo 'Неверно введены данные в полях';
    }
}

?>