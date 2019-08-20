<?php 

class Travel {
    public $id;
    public $link;
    public $name;
    public $date;
    public $face; // of the planisphere
    public $coords;

    public function __construct($id, $name, $link, $date, $face, $coords) {
        $this->id   = $id;
        $this->name  = $name;
        $this->face  = $face;
        $this->date  = $date;
        $this->link = $link;
        $this->coords = $coords;
    }

    /*
    * Return the list of travels for a given year and face of the planisphere
    */
    public static function all($year, $face) {
        $list = [];
        $db = Database::getInstance();
        $req = $db->prepare('SELECT * FROM travels WHERE EXTRACT(YEAR from traveldate) = ? AND earthface = ?');
        $req->execute(array($year, $date));

        foreach ($req->fetchAll() as $travel) {
            $list[] = new Travel($travel['idtravel'], $travel['travelname'], $face, $travel['traveldate'], $travel['coords']);
        }

        return $list;
    }

    /*
    * Convert the list of travels into a json file
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
    public static function updateTravel($id, $link, $name, $coords, $date, $face) {
        $db = Database::getInstance();

        if (empty($link) or empty($name) or empty($coords)) {
            return "Une information est manquante.";
        }

        if (strpos($link, 'http://') === false or strpos($link, 'https://') === false) {
            return "Lien invalide.";
        }

        if (preg_match('/\d{1,4},\d{1,4},\d{1,4},\d{1,4}/', $coords) !== 0) {
            return "Les coordonnées doivent être au format x1,y1,x2,y2";
        }

        // Update the id if travel already exists
        
        $req = $db->prepare('UPDATE travels SET travelname = ?, albumlink = ?, traveldate = ?, coords = ? WHERE idtravel = ?');
        $req->execute(array($name, $link, $date, $coords, $id));
        Travel::to_json();

        // Add if not

        $req = $db->prepare('INSERT INTO travels (travelname, albumlink, coords, traveldate, earthface)  VALUES (?, ?, ?, ?, ?)');
        $req->execute(array($name, $link, $coords, $date, $face));
        Travel::to_json();

        return '<font color="#79bb67">Modifications effectuées.</font>';
    }

    /*
    * Delete the travel
    */
    public static function deleteTravel($id) {
        $req = $db->prepare('DELETE FROM travels WHERE idtravel = ?');
        $req->execute(array($id));
        Travel::to_json();

        return 'Ce voyage a bien été supprimé.';
    }
}
