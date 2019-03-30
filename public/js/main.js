
$(function() {
    currentWindow = null;

    const INFO = $(".info-box");
    const COLLECTIONS = $(".collections-list-container");
    // Dark screen when the infobox is opened or collections list

    function darkScreen() {
        if (currentWindow == null) {
            $(".dark-screen").css({
                display: "block"
            });

            setTimeout(
                function() 
                {
                    $(".dark-screen").css({
                        opacity: "0.5",
                        cursor: "pointer"
                    });
            }, 200);
        } else {
            
            $(".dark-screen").css({
                opacity: "0",
                cursor: "none"
            });
    
            setTimeout(
                function() 
                {
                    $(".dark-screen").css({
                        display: "none"
                    });
                }, 500);
        }
    }

    $(".dark-screen").click(function() {
        darkScreen();
        closeAll();
    });

    function closeAll() {
        closeInfo();
        closeList();
    }

    // Informations button
    $(".info").click(function() {
        if (currentWindow !== INFO) {   
            console.log("im clicked");
            if (currentWindow == null) {
                darkScreen();
            }
            closeAll();
            openInfo();
        } else if (currentWindow == INFO) {
            darkScreen();
            closeInfo();
        }
    });


    // Keypress events
    $(document).unbind('keyup').keyup(function(e) {
        console.log("heeey " + currentWindow);
        if (currentWindow === INFO && (e.key === "Escape" || e.key.toLowerCase() === "i")) {
            darkScreen();
            closeInfo();
            return;
        }

        if (currentWindow === COLLECTIONS && (e.key === "Escape")) {
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

    });

    // Open/close infobox
    function closeInfo() {
        $(".info-box").css({
            "z-index": "-10",
            opacity: "0"
        });

        $(".container").css({
            "pointer-events": "auto"
        });
        
        console.log("hoy");
        currentWindow = null;
    }

    function openInfo() {
        $(".info-box").css({
            "z-index": "99",
            opacity: "1"
        });

        $(".container").css({
            "pointer-events": "none"
        });

        currentWindow = INFO;
    }

    // Collections list button

    $("#collections-link").click(function() {
        
        console.log("i'm clicked");
        darkScreen();
        
        if (currentWindow !== COLLECTIONS) {
            openList();
        }
    });

    // Open / close collections list
    
    function openList() {
        $(".collections-list-container").css({
            "z-index": "99",
            opacity: "1"
        });

        $(".container").css({
            "pointer-events": "none"
        });

        currentWindow = COLLECTIONS;

    }

    function closeList() {

        $(".collections-list-container").css({
            "z-index": "-10",
            opacity: "0"
        });

        $(".container").css({
            "pointer-events": "auto"
        });
        
        currentWindow = null;
    }

    // Attribute of map image for responsivity

    var timer = null;

    function addAttr() {
        clearTimeout(timer);
        timer = setTimeout(addSizeAttributes, 0);
    }

    
    $(".rwdimgmap").ready(function() {

        if ($(this).width() != undefined) {
            // Add size attributes of the map image
            addSizeAttributes();
        }

        // Detect when the window is resized
        window.addEventListener('resize', addAttr, false);
    })

    function addSizeAttributes() {
        $(".rwdimgmap").attr("width", $(".rwdimgmap").width());
        $(".rwdimgmap").attr("height", $(".rwdimgmap").height());
    }

});