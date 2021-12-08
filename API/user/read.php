<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include_once('../../config/db.php');
    include_once('../../model/user.php');

    $db = new db();
    $connect = $db->connect();
    $user = new User($connect);
    $read = $user->getJSUser();

    $num = $read->rowCount();

    if($num>0){
        $user_array = [];
        $user_array['user'] =[];

        while($row = $read->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $user_item = array(
                'id' => $id,
                'name' => $name,
                'email' => $email,
                'password' => $password,
                'phone' => $phone,
                'avatar' => $avatar,
                'type' => $type,
                'ranker' => $ranker,
                'reg_date' => $reg_date
            );
            array_push($user_array['user'], $user_item);
        }
        echo json_encode($user_array);
    }

?>