var app = angular.module('myApp', ['angular.filter', 'rwdImageMaps']);
app.filter("filterByDecade", function() {
    return function(years, decade) {
        return years.filter(function(item) {
            return item.indexOf(decade) > -1;
        });
    };
});

app.filter("filterByYear", function() {
    return function(travels, year) {
        return travels.filter(function(item) {
            return item.year.indexOf(year) > -1;
        });
    };
});
app.controller('pointAndClick', function($scope, $http, $window, preloader) {
    $scope.loading = true;
    $scope.reveal = true;
    $scope.destination = "travels-map";
    $scope.pathalbum = "public/images/album-thumbnails/";
    $scope.currentFolderType = null;
    $scope.pathlocation = "public/images/locations/";
    $scope.images = [];
    $scope.menuShowed = false;
    $scope.travelsShowed = false;

    $scope.decades = [];
    $scope.years = [];

    // TODO: Find a solution to add new year to the list automatically
    for (var i = 1985; i <= 2029; i++) {
        $scope.years.push(i.toString());
    }

    for (var i = 199; i <= 202; i++) {
        $scope.decades.push(i.toString());
    }

    $http.get("public/js/locations.json").then(function(response) {
        $scope.locations = response.data;
        $scope.images = [];
        angular.forEach($scope.locations, function(key, value) {
            if (key.image !== "") {
                this.push($scope.pathlocation + key.image);
            }
        }, $scope.images);

        // Loading location images before showing the website
        preloader.preloadImages($scope.images).then(function() {
                $scope.loading = false;
                console.log($scope.images);
            },
            function() {
                //fail
            });

    });

    // Galleries/albums data
    $http.get("public/js/albums.json").then(function(response) {
        $scope.albums = response.data;
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


        /*
        setTimeout(
            function() {
                $(".index-box").css({
                    right: "0"
                });

                $(".info-box").css({
                    left: "0"
                })
            }, 200);
            */

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

    $scope.hasTravels = function(year) {
        return $scope.travels.some(item => (item.year.includes(year)));
    }

    $scope.showTravels = function() {
        $scope.travelsShowed = true;

        $(".container").css({
            filter: "blur(5px)"
        });

        $(".travel-container").css({
            display: "block"
        });

        setTimeout(
            function() {
                $(".travel-container").css({
                    opacity: "1"
                });
            }, 200);

        $(".travel-button").css({
            display: "block"
        })

        $(".return").css({
            display: "none"
        })
    }

    $scope.closeTravels = function() {
        $scope.travelsShowed = false;

        $(".travel-container").css({
            opacity: "0"
        });

        setTimeout(
            function() {
                $(".container").css({
                    filter: ""
                });

                $(".travel-container").css({
                    display: "none"
                });

                setTimeout(
                    function() {
                        $(".return").css({
                            display: "block"
                        })
                    }, 400);

            }, 700);

        $(".travel-button").css({
            display: "none"
        })



    }

    // Keypress events
    $(document).unbind('keyup').keyup(function(e) {

        if (e.key === "Escape") {
            $scope.closePopUp();
            $scope.closeMenu();
            $scope.closeTravels();
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