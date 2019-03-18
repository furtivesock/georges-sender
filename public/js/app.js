var app = angular.module('myApp', ['angular.filter', 'rwdImageMaps']);

app.controller('pointAndClick', function($scope, $http, preloader) {
    $scope.loading = true;
    $scope.reveal = true;
    $scope.filterChanged = false;
    $scope.destination = "travels-map";
    $scope.pathpastel = "public/images/pastels/";
    $scope.pathlocation = "public/images/locations/";
    $scope.travelYear = "2008";
    $scope.years = []
    // Find a solution to add new year to the list automatically
    for (var i=2005; i<=2010; i++) {
        $scope.years.push(i.toString());
    }

    $http.get("public/js/locations.json").then(function(response) {
        $scope.locations = response.data;
        $scope.images = [];
        angular.forEach($scope.locations, function(key, value) {
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

    $http.get("public/js/pastels.json").then(function(response) {
        $scope.pastelslist = response.data.pastels;
    });

    $http.get("public/js/travels.json").then(function(response) {
        $scope.travels = response.data.travels;
    });
    /*
    function filterTrigger() {
        $scope.filterChanged = true;
        console.log("wait ?");

    }
    */

    $scope.goToLocation = function(locationName) {
        $scope.destination = locationName;
    }

    $scope.setReveal = function() {
        $scope.reveal = !$scope.reveal;
    }

    $scope.try = function(year) {
        console.log("desolation " + year)
    }
    /*
    $scope.travelsView = function(selectedYear){
        var travelsFiltered = [];
        console.log("my function : " + selectedYear);
        for(i=0; i<$scope.travels.length; i++){
            console.log("test : " + $scope.travels[i].year);
            if ($scope.travels[i].year == selectedYear)
                travelsFiltered.push($scope.travels[i]);
        }
        console.log("my travels : " + travelsFiltered);
        return travelsFiltered;
  
    }*/

 

});