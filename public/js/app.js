var app = angular.module('myApp', ['angular.filter', 'rwdImageMaps']);

app.controller('pointAndClick', function($scope, $http, preloader) {
    $scope.loading = true;
    $scope.reveal = false;
    $scope.destination = "home";
    $scope.pathpastel = "public/images/pastels/";
    $scope.pathlocation = "public/images/locations/";
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

    $scope.goToLocation = function(locationName) {
        $scope.destination = locationName;
        //window.$('map').imageMapResize();
        //window.setInteractivesAreas();
    }

    $scope.setReveal = function() {
        $scope.reveal = !$scope.reveal;
    }

});