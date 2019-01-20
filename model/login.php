<?php

session_start();

class LoginManager
{

    public static function login()
    {
        $mydb = Database::getInstance();
        
        $usernameconnect = htmlspecialchars($_POST['usernameconnect']);
        $passwordconnect = $_POST['passwordconnect'];

        if (empty($_POST['usernameconnect']) or empty($_POST['passwordconnect'])) {
            $erreur = "Les champs sont vides.";
            return $erreur;
        }

        $reqUsername = $mydb->prepare("SELECT * FROM admin WHERE username = ?");
        $reqUsername->execute(array($usernameconnect));
        $doesMemberExist = $reqUsername->rowCount();

        if ($doesMemberExist !== 1) {
            $erreur = "Vos identifiants sont incorrects.";
            return $erreur;
        }

        $reqPassword = $mydb->prepare("SELECT password FROM admin WHERE username = ?");
        $reqPassword->execute(array($usernameconnect));
        $getSelect = $reqPassword->fetch();

        if (!password_verify($passwordconnect, $getSelect['password'])) {
            $erreur = "Le mot de passe est invalide.";
            return $erreur;
        }

        $reqId = $mydb->prepare("SELECT idadmin FROM admin WHERE username = ?");
        $reqId->execute(array($usernameconnect));
        $getSelect = $reqId->fetch();
        $_SESSION['idadmin'] = $getSelect['idadmin'];

        header("Location: admin.php");
    }

    public static function logout()
    {
        session_start();
        $_SESSION = array();
        session_destroy();
    }



}
