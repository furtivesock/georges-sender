<?php
require_once 'model/dbConnect.php';
require('controller/adminController.php');

if (isset($_SESSION['idadmin'])) {
    if (isset($_GET['a'])) {
        // Pastels gallery
        if ($_GET['a'] == "pastels") {
            admin_show_pastels();
        } 
        // Travels
        elseif ($_GET['a'] == "travels") {
            admin_show_travels();
        }
        // Photographs
        elseif ($_GET['a'] == "photos") { 
            admin_show_photos();
        }
        // Account options
        elseif ($_GET['a'] == "options") { 
            admin_options();
        }
        // Déconnexion
        elseif ($_GET['a'] == "logout") { 
            logout();
            header("Location: admin.php");
        }
    } else {
        // Par défaut
        admin_show_pastels();
    }
} else {
   login_member();
}
