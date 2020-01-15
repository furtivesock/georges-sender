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
    $scope.destination = "home";
    $scope.pathalbum = "public/images/album-thumbnails/";
    $scope.currentAlbumType = null;
    $scope.pathlocation = "public/images/locations/";
    $scope.images = [];
    $scope.menuShowed = true;
    $scope.eventClicked = false;

    $scope.windowOpened = false;

    $scope.decades = [];
    $scope.years = [];
    
    $scope.years.push("1956");
    $scope.years.push("1957");
    for (var i = 1985; i <= 2029; i++) {
        $scope.years.push(i.toString());
    }
    
    $scope.decades.push("195");
    for (var i = 199; i <= 202; i++) {
        $scope.decades.push(i.toString());
    }

    // Album subtypes
    $scope.subtypes = [];

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

    // Menu direct links

    $scope.goToLocationFromMenu = function(locationName) {
        if ($scope.windowOpened)
            $scope.closeWindow();
        $.when($.ajax($scope.goToLocation(locationName))).then(function() {
            $scope.closeMenu();
        })
    }

    $scope.openWindowFromMenu = function(locationName, albumType) {
        if (locationName !== $scope.destination) {
            $.when($.ajax($scope.goToLocation(locationName))).then(function() {
                $.when($.ajax($scope.openWindow(albumType))).then(function() {
                    $scope.closeMenu();
                    return;
                })
            })
        }

        $scope.openWindow(albumType);
        $scope.closeMenu();

    }

    $scope.setReveal = function() {
        $scope.reveal = !$scope.reveal;
    }

    // For areas with type 'link'
    $scope.openInNewTab = function(url) {
        $window.open(url, '_blank');
    };

    /* HOME SCROLL ARROWS */

    $scope.goLeft = function() {
        window.scrollBy({
            left: -500, 
            top: 0,
            behavior: 'smooth'
        });
    }

    $scope.goRight = function() {
        window.scrollBy({
            left: 500, 
            top: 0,
            behavior: 'smooth'
        });
    }

    // Main menu

    $scope.showMenu = function() {
        if ($scope.eventClicked)
            return false;

        $scope.eventClicked = true;
        $scope.menuShowed = true;

        $(".menu").css({
            display: "block"
        });

        $(".info").css({
            animation: "1.5s ease-in-out leftSlide"
        });

        $(".map").css({
            animation: "1.5s ease-in-out rightSlide"
        });

        $(".button").css({
            "border-color": "#000",
            "color": "#000"
        });

        $scope.eventClicked = false;
    }

    $scope.closeMenu = function() {
        if ($scope.eventClicked)
            return false;

        $scope.eventClicked = true;
        $scope.menuShowed = false;

        

        $(".info").css({
            transform: "translateX(-100%)",
            transition: "1.5s ease-in-out transform"
        });

        $(".map").css({
            transform: "translateX(100%)",
            transition: "1.5s ease-in-out transform"
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

                $scope.eventClicked = false;

                $scope.$apply()
            }, 1500);

    }

    $scope.containsWindow = function(currentLocation) {
        return currentLocation.destinations.some(item => (item.type && item.type.includes('window')));
    }

    $scope.hasTravels = function(year) {
        return $scope.travels.some(item => (item.year.includes(year)));
    }

    $scope.openWindow = function(albumType) {
        $scope.currentAlbumType = albumType.toLowerCase();
        $scope.windowOpened = true;

        if (albumType !== "travels") {
            $scope.subtypes = [...new Set($scope.albums.filter(album => album.type === $scope.currentAlbumType).map(album => album.subtype))];
            console.log($scope.subtypes);
        }
        
        setTimeout(
            function() {
                $(".container").css({
                    filter: "blur(5px)"
                });
                $(".return, .arrow-button").css({
                    display: "none"
                })
            }, 200);
        

        $(".album-container").css({
            display: "block"
        });

        setTimeout(
            function() {
                $(".album-container").css({
                    opacity: "1"
                });
            }, 400);

        $(".close-window-button").css({
            display: "block"
        })

        
    }

    $scope.closeWindow = function() {
        $scope.windowOpened = false;
        $scope.subtypes = [];

        $(".album-container").css({
            opacity: "0"
        });

        setTimeout(
            function() {
                $(".container").css({
                    filter: ""
                });

                $(".album-container").css({
                    display: "none"
                });

                setTimeout(
                    function() {
                        $(".return, .arrow-button").css({
                            display: "block"
                        })
                    }, 400);

            }, 700);

        $(".close-window-button").css({
            display: "none"
        })

        $scope.currentAlbumType = null;
    }

    // Keypress events
    $(document).unbind('keyup').keyup(function(e) {

        // Close all
        if (e.key === "Escape") {
            if ($scope.currentFolderType) $scope.closePopUp();
            if ($scope.menuShowed) $scope.closeMenu();
            if ($scope.windowOpened) $scope.closeWindow();

            return;
        }

        // Show/close menu
        if (e.key.toLowerCase() === "i" || e.key.toLowerCase() === "m") {
            if ($scope.menuShowed)
                $scope.closeMenu();
            else
                $scope.showMenu();

            return;
        }
    });
    
    // Scroll at middle when current location is home
    $scope.$watchGroup(['destination', 'menuShowed'], function() {
        if (!$scope.menuShowed && $scope.destination === "home") {
            setTimeout(function() {
                var initScroll = window.scrollMaxX / 2;
                window.scrollBy({
                    left: initScroll, 
                    top: 0
                });
            }, 50);
        }
    });
});

// Mod redefinition
function mod(n, m) {
    return ((n % m) + m) % m;
}

// Hide/show home arrows
$(window).scroll
(
    function(event) {
        var margin = 20;
        if (window.scrollX <= margin) 
            $(".left-arrow").fadeOut();
        else
            $(".left-arrow").fadeIn();
        if (window.scrollX >= window.scrollMaxX - margin)
            $(".right-arrow").fadeOut();
        else
            $(".right-arrow").fadeIn();
    }
);