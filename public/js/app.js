var app = angular.module('myApp', ['angular.filter', 'rwdImageMaps']);

app.controller('pointAndClick', function($scope, $http, preloader) {
    $scope.loading = true;
    $scope.reveal = true;
    $scope.destination = "home";
    $scope.pathpastel = "public/images/pastels/";
    $scope.pathlocation = "public/images/locations/";
    $scope.pathartwork = "public/images/artworks/";
    $scope.images = [];

    $scope.earthLands = [];
    $scope.selectedYear = "2008";
    $scope.selectedLand = "Europe";
    
    $scope.years = [];
    // TODO: Find a solution to add new year to the list automatically
    for (var i=1990; i<=2019; i++) {
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

        // TODO : Just get list of all images in locations/
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

    $http.get("public/js/artworks.json").then(function(response) {
        $scope.artworks = response.data.artworks;
    });

    $scope.goToLocation = function(locationName) {
        $scope.destination = locationName;
    }

    $scope.setReveal = function() {
        $scope.reveal = !$scope.reveal;
    }

    /* WORLD MAP SELECTORS/FILTERS */

    $scope.selectYear = function(selectedYear) {
        $scope.selectedYear = selectedYear;
    }

    $scope.goLeft = function() {
        index = mod(mod($scope.earthLands.indexOf($scope.earthLands.find(x => x.name === $scope.selectedLand)),$scope.earthLands.length) - 1,$scope.earthLands.length);
        $scope.selectedLand = $scope.earthLands[index].name;
    }

    $scope.goRight = function() {
        index = ($scope.earthLands.indexOf($scope.earthLands.find(x => x.name === $scope.selectedLand)) % $scope.earthLands.length + 1) % $scope.earthLands.length;
        $scope.selectedLand = $scope.earthLands[index].name;
    }

    $scope.keyPress = function(keyEvent) {
        if (keyEvent.which === "39")
          alert('I am an alert');
      }

    // Show/close pop-ups

    $scope.darkScreenClick = function() {
        darkScreen();
        closeAll();
    }

    $scope.listClick = function() {
        darkScreen();
        
        if (currentWindow !== ALBUMS) {
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

