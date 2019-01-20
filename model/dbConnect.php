<?php
class Database
{
    private static $instance = null;
    private function __construct()
    {}
    private function __clone()
    {}
    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
            self::$instance = new PDO('mysql:host=127.0.0.1;dbname=georges_sender', 'root', '');
        }
        return self::$instance;
    }
}
