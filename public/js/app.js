// TODO : Ajouter un autre lien sur le bureau pour équilibrer "Oeuvres" par défaut

var app = angular.module('myApp', ['angular.filter', 'rwdImageMaps']);

app.controller('pointAndClick', function($scope, $http, preloader) {
    $scope.loading = true;
    $scope.reveal = true;
    $scope.destination = "travels-map";
    $scope.pathpastel = "public/images/pastels/";
    $scope.pathlocation = "public/images/locations/";
    $scope.images = [];

    $scope.earthLands = [];
    $scope.travelYear = "2008";
    $scope.selectedLand = "East-Asia";
    
    $scope.years = [];
    // Find a solution to add new year to the list automatically
    for (var i=2005; i<=2010; i++) {
        $scope.years.push(i.toString());
    }

    $http.get("public/js/locations.json").then(function(response) {
        $scope.locations = response.data;
        $scope.images = [];
        angular.forEach($scope.locations, function(key, value) {
            if (key.image !== "") {
                this.push($scope.pathlocation + key.image);
            }
        }, $scope.images);

    });

    $http.get("public/js/pastels.json").then(function(response) {
        $scope.pastelslist = response.data.pastels;
    });

    $http.get("public/js/earth-lands.json").then(function(response) {
        $scope.earthLands = response.data;
        angular.forEach($scope.earthLands, function(key, value) {
            if (key.image !== "")
                this.push($scope.pathlocation + key.image);
        }, $scope.images);

        // Loading images before showing the website
        preloader.preloadImages($scope.images).then(function() {
            $scope.loading = false;
            console.log($scope.images);
        },
        function() {
            //fail
        });

    });

    $http.get("public/js/travels.json").then(function(response) {
        $scope.travels = response.data.travels;
    });

    $http.get("public/js/collections.json").then(function(response) {
        $scope.collections = response.data.collections;
    });

    $scope.goToLocation = function(locationName) {
        $scope.destination = locationName;
    }

    $scope.setReveal = function() {
        $scope.reveal = !$scope.reveal;
    }

    /* WORLD MAP SELECTORS/FILTERS */

    $scope.selectYear = function(selectedYear) {
        $scope.travelYear = selectedYear;
    }

    $scope.goLeft = function() {
        index = mod(mod($scope.earthLands.indexOf($scope.earthLands.find(x => x.name === $scope.selectedLand)),$scope.earthLands.length) - 1,$scope.earthLands.length);
        $scope.selectedLand = $scope.earthLands[index].name;
    }

    $scope.goRight = function() {
        index = ($scope.earthLands.indexOf($scope.earthLands.find(x => x.name === $scope.selectedLand)) % $scope.earthLands.length + 1) % $scope.earthLands.length;
        $scope.selectedLand = $scope.earthLands[index].name;
    }

    // Show/close pop-ups

    $scope.darkScreenClick = function() {
        darkScreen();
        closeAll();
    }

    $scope.collectionsClick = function() {
        darkScreen();
        
        if (currentWindow !== COLLECTIONS) {
            openList();
        }
    }

    $scope.infoClick = function() {
        if (currentWindow !== INFO) {   
            if (currentWindow == null) {
                darkScreen();
            }
            closeAll();
            openInfo();
        } else if (currentWindow == INFO) {
            darkScreen();
            closeInfo();
        }
    }


});

// Include JQuery pop-ups

$.getScript( "public/js/popup.js", function() {
});

// Mod redefinition

function mod(n, m) {
    return ((n % m) + m) % m;
}

