var app = angular.module('myApp', ['angular.filter', 'rwdImageMaps']);

app.controller('pointAndClick', function($scope, $http, $window, preloader) {
    $scope.loading = true;
    $scope.reveal = true;
    $scope.destination = "home";
    $scope.pathalbum = "public/images/album-thumbnails/";
    $scope.currentFolderType = null;
    $scope.pathlocation = "public/images/locations/";
    $scope.images = [];
    $scope.menuShowed = false;

    $scope.earthLands = [];
    $scope.selectedYear = "2008";
    $scope.selectedLand = "Europe";

    $scope.years = [];
    // TODO: Find a solution to add new year to the list automatically

    for (var i = 1990; i <= 2019; i++) {
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

    // Galleries/albums data
    $http.get("public/js/albums.json").then(function(response) {
        $scope.albums = response.data;
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

    $scope.goToLocation = function(locationName) {
        // Return
        if (locationName === $scope.destination.origin) {
            darkScreen();
            closeAll();
        }
        $scope.destination = locationName;
    }

    $scope.showAlbumFromMenu = function(locationName, albumType) {
        if (locationName !== $scope.destination) {
            $.when($.ajax($scope.goToLocation(locationName))).then(function() {
                $.when($.ajax($scope.showAlbumPopUp(albumType))).then(function() {
                    $scope.closeMenu();
                    return;
                })
            })
        }

        $scope.showAlbumPopUp(albumType);
        $scope.closeMenu();

    }

    $scope.setReveal = function() {
        $scope.reveal = !$scope.reveal;
    }

    // For areas with type 'link'
    $scope.openInNewTab = function(url) {
        $window.open(url, '_blank');
    };

    /* WORLD MAP SELECTORS/FILTERS */

    $scope.selectYear = function(selectedYear) {
        $scope.selectedYear = selectedYear;
    }

    $scope.goLeft = function() {
        index = mod(mod($scope.earthLands.indexOf($scope.earthLands.find(x => x.name === $scope.selectedLand)), $scope.earthLands.length) - 1, $scope.earthLands.length);
        $scope.selectedLand = $scope.earthLands[index].name;
    }

    $scope.goRight = function() {
        index = ($scope.earthLands.indexOf($scope.earthLands.find(x => x.name === $scope.selectedLand)) % $scope.earthLands.length + 1) % $scope.earthLands.length;
        $scope.selectedLand = $scope.earthLands[index].name;
    }

    // Main menu

    $scope.showMenu = function() {

        $scope.menuShowed = true;

        $(".menu").css({
            display: "block"
        });

        $(".button").css({
            "border-color": "#000",
            "color": "#000"
        });

    }

    $scope.closeMenu = function() {

        $scope.menuShowed = false;

        $(".info").css({
            transform: "translateX(-100%)"
        });

        $(".map").css({
            transform: "translateX(100%)"
        });

        setTimeout(
            function() {
                $(".info").css("transform", "");
                $(".map").css("transform", "");

                $(".menu").css({
                    display: "none"
                });

                $(".button").css({
                    "border-color": "#fff",
                    "color": "#fff"
                });
            }, 1500);

    }

    // Show/close pop-ups

    $scope.showAlbumPopUp = function(albumType) {
        $scope.currentFolderType = albumType.toLowerCase();

        $(".dark-screen").css({
            display: "block"
        });

        setTimeout(
            function() {
                $(".dark-screen").css({
                    opacity: "1",
                    cursor: "pointer"
                });
            }, 200);
    }

    $scope.closePopUp = function() {
        $(".dark-screen").css({
            opacity: "0",
            cursor: "none"
        });

        setTimeout(
            function() {
                $(".dark-screen").css({
                    display: "none"
                });

                $scope.currentFolderType = null;
            }, 500);

    }

    $scope.containsPopUp = function(currentLocation) {
        return currentLocation.destinations.some(item => (item.type && item.type.includes('pop-up')));
    }

    // Keypress events
    $(document).unbind('keyup').keyup(function(e) {

        if (e.key === "Escape") {
            $scope.closePopUp();
            $scope.closeMenu();
            return;
        }
        /*
            if (currentWindow === ALBUMS && (e.key === "Escape")) {
                darkScreen();
                closeList();
                return;
            }
    
            if (currentWindow !== INFO && e.key.toLowerCase() === "i") {
                if (currentWindow == null) {
                    darkScreen();
                } else {
                    closeAll();
                }
                openInfo();
                return;
            }
        */
    });
});

// Mod redefinition

function mod(n, m) {
    return ((n % m) + m) % m;
}