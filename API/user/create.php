<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
    include_once('../../config/db.php');
    include_once('../../model/user.php');

    $db = new db();
    $connect = $db->connect();
    $user = new User($connect);
    $data = json_decode(file_get_contents("php://input"));

    $user->name =$data->name;
    $user->email =$data->email;
    $user->password =$data->password;
    $user->phone =$data->phone;
    $user->avatar =$data->avatar;
    $user->type =$data->type;
    $user->ranker =$data->ranker;

    if($user->setJSUser()){
        echo json_encode(array('message', "done"));
    }else{
        echo json_encode(array('message', "faild"));
    }
?>