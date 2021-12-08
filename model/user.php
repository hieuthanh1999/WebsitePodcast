<?php
class User{
    private $conn;
    public $id;
    public $name;
    public $email;
    public $password;
    public $phone;
    public $avatar;
    public $type;
    public $ranker;
    public $reg_date;

    public function __construct($db){
        $this->conn = $db;
    }

    public function getJSUser(){
        $query = "SELECT * FROM user ORDER BY id DESC ";
        $stmt = $this->conn->prepare($query);
        $stmt ->execute();
        return $stmt;
    }

    public function setJSUser(){
        $query = "INSERT INTO user SET name=:name,email=:email, password=:password, phone=:phone, avatar=:avatar, type=:type , ranker=:ranker";
        $stmt = $this->conn->prepare($query);
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->avatar = htmlspecialchars(strip_tags($this->avatar));
        $this->type = htmlspecialchars(strip_tags($this->type));
        $this->ranker = htmlspecialchars(strip_tags($this->ranker));

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':phone', $this->phone);
        $stmt->bindParam(':avatar', $this->avatar);
        $stmt->bindParam(':type', $this->type);
        $stmt->bindParam(':ranker', $this->ranker);
        if($stmt->execute()){
            return true;
        }
        return false;
    }
}
?>