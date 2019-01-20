<?php
require_once('model/pastel.php');
require_once('model/login.php');
// Maximum number of pastels displayed on the gallery
define("MAXPASTELS", 6);

function login_member() {
    
    if (isset($_POST['login'])) {
        $erreur = LoginManager::login();
    }

    require('view/backend/loginView.php');
}

// PASTELS

function admin_show_pastels() {
    $pastels = Pastel::all();

    // Pastels saving
    if (isset($_POST['update-pastels'])) {
        $msg = save_pastels();
    }

    require_once('view/backend/pastelsView.php');
}

function save_pastels() {
    for ($i = 1; $i <= MAXPASTELS; ++$i) {
        if (isset($_FILES[$i]) and !empty($_FILES[$i]['name'])) {
            $msg = Pastel::update($i, $_FILES[$i]);
        }
    }
    return isset($msg) ? $msg : "Aucune modification n'a été effectuée.";
}

// TRAVELS

function admin_show_travels() {

    // Do something...

    require_once('view/backend/travelsView.php');
}

// PHOTOGRAPHS

function admin_show_photos() {

    // Do something...

    require_once('view/backend/photosView.php');
}

// ACCOUNT PARAMETERS

function admin_options() {

    // Do something...

    require_once('view/backend/optionsView.php');
}

// LOG OUT

function logout() {
    LoginManager::logout();
}