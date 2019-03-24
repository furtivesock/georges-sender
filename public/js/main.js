$(function() {

    // Dark screen when the infobox is opened or collections list
    var darkScreenIsSet = false;

    function darkScreen() {
        
        if (!darkScreenIsSet && (listClosed && infoClosed)) {
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

        darkScreenIsSet = !darkScreenIsSet;
    }

    $(".dark-screen").click(function() {
        if (darkScreenIsSet && (!infoClosed || !listClosed)) {
            if (!infoClosed) {
                closeInfo();
            } else if (!listClosed) {
                closeList();
            }
            darkScreen();
        }
    });

    function addSizeAttributes() {
        $(".rwdimgmap").attr("width", $(".rwdimgmap").width());
        $(".rwdimgmap").attr("height", $(".rwdimgmap").height());
    }

    // Informations box
    var infoClosed = true;

    $(".info").click(function() {

        darkScreen();
        if (infoClosed) {
            openInfo();
            closeList();
        } else {
            closeInfo();
        }
    });


    // Keypress events
    $(document).unbind('keyup').keyup(function(e) {

        if (!infoClosed && (e.key === "Escape" || e.key.toLowerCase() === "i")) {
           closeInfo();
           darkScreen();
           return;
        }

        if (infoClosed && e.key.toLowerCase() === "i") {
           openInfo();
           darkScreen();
           return;
        }

    });

    function closeInfo() {
        $(".info-box").css({
            "z-index": "-10",
            opacity: "0"
        });

        $(".container").css({
            "pointer-events": "auto"
        });
        
        infoClosed = true;
    }

    function openInfo() {
        $(".info-box").css({
            "z-index": "99",
            opacity: "1"
        });

        $(".container").css({
            "pointer-events": "none"
        });

        infoClosed = false;
    }

    // Collections list

    var listClosed = true;

    $(".collections-link").click(function() {

        
        darkScreen();

        console.log("fuck");
        if (listClosed) {
            openList();
            closeInfo();
        } else {
            closeList();
        }

    });

    function openList() {
        $(".collections-list-container").css({
            "z-index": "99",
            opacity: "1"
        });

        $(".container").css({
            "pointer-events": "none"
        });

        listClosed = false;

    }

    function closeList() {

        $(".collections-list-container").css({
            "z-index": "-10",
            opacity: "0"
        });

        $(".container").css({
            "pointer-events": "auto"
        });
        
        listClosed = true;
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

});