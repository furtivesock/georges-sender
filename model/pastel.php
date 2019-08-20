<?php

class Pastel {
    public $id;
    public $img;
    public $date;

    public function __construct($id, $img, $date) {
        $this->id   = $id;
        $this->img  = $img;
        $this->date = $date;
    }

    /*
    * Return the list of published pastels
    */
    public static function all() {
        $list = [];
        $db = Database::getInstance();
        $req = $db->query('SELECT *, DATE_FORMAT(publication_date,\'%d/%m/%Y\') AS frdate FROM pastels');
        
        foreach ($req->fetchAll() as $pastel) {
            $list[] = new Pastel($pastel['idpastel'], $pastel['pastelimg'], $pastel['frdate']);
        }

        return $list;
    }

    /*
    * Convert the list of pastels into a json file
    * for AngularJS
    */
    public static function to_json() {
        $write = array();
        $pastels = array();
        $list = Pastel::all();
        foreach ($list as $pastel) {
            $pastels[] = array('pastelimg'=>$pastel->img, 'date'=>$pastel->date);          
        }
        $write['pastels'] = $pastels;
        $file = fopen('public/js/pastels.json', 'w');
        fwrite($file, json_encode($write));
        fclose($file);
    }

    /*
    * Replace the pastel with the same id by a new one
    */
    public static function update($id, $img) {
        $db = Database::getInstance();
        $taillemax = 2097152; //Limit : 2 Mo
        $extensions = array('jpg', 'jpeg', 'png');
        if ($img['size'] <= 0 or $img['size'] > $taillemax) {
            return "Votre fichier ne doit pas dépasser les 2 Mo.";
        }
        
        $extensionUpload = strtolower(substr(strrchr($img['name'], '.'), 1));
        // Get the extension of the file
        if (!in_array($extensionUpload, $extensions)) {
            return "Votre image doit être au format jpg, jpeg ou png.";
        }
        
        $path = "public/images/pastels/" . $id . "." . $extensionUpload;
        // Clean potential files with the same name
        foreach ($extensions as $extension) {
            $filetodelete = 'public/images/pastels/' . $id . '.' . $extension;
            if (file_exists($filetodelete)) {
                unlink($filetodelete);
            }
        }
        
        // Upload image
        $move = move_uploaded_file($img['tmp_name'], $path);

        if (!$move) {
            return "Erreur durant l'importation de votre image";
        }

        //Add image into the database
        $req = $db->prepare('UPDATE pastels SET pastelimg = ?, publication_date = NOW() WHERE idpastel = ?');
        $req->execute(array($id . "." . $extensionUpload, $id));
        Pastel::to_json();
        return '<font color="#79bb67">Pastel bien publiée sur la galerie.</font>';
    }
}