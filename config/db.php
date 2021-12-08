<?php

//connect db

class db{

    private $servername = "localhost";
    private $username ="root";
    private $password = "";
    private $db = "post";
    private static $conn=null;

    public function connect() {
        if (is_null(self::$conn)) {
            self::$conn = new PDO("mysql:host=localhost;dbname=post", 'root', '');
            
            // $user = "CREATE TABLE user (
            //     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
            //     name VARCHAR(30) NOT NULL,
            //     email VARCHAR(50) NOT NULL,
            //     password VARCHAR(50) NOT NULL,
            //     phone VARCHAR(50) ,
            //     avatar VARCHAR(50) ,
            //     type VARCHAR(50) NOT NULL,
            //     ranker VARCHAR(50) NOT NULL,
            //     reg_date TIMESTAMP
            //     )";
            // self::$conn->exec($user);

            // $category = "CREATE TABLE category (
            //     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
            //     name VARCHAR(30) NOT NULL,
            //     reg_date TIMESTAMP
            //     )";
            // self::$conn->exec($category);
        }
        return self::$conn;
    }
}


?>