<?php

class Travel {
    public $id;
    public $city;
    public $coords;
    public $date;
    public $earth_face;

    public function __construct($id, $city, $coords, $date, $earth_face) {
        $this->id   = $id;
        $this->city  = $city;
        $this->coords = $coords;
        $this->date = $date;
        $this->earth_face = $earth_face;
    }
}
