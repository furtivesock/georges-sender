$(function() {
    // Informations box
    var closed = true;
    $(".info").click(function() {
        if (closed) {
            open();
        } else {
            close();
        }
    });

    $(".dark-screen").click(function() {
        if (closed) {
            open();
        } else {
            close();
        }
    });

    if (!closed) {
      
    }

    // Keypress events
    $(document).unbind('keyup').keyup(function(e) {
        console.log(e.key.toLowerCase());
        if (!closed && (e.key === "Escape" || e.key.toLowerCase() === "i")) {
           close();
           return;
        }

        if (closed && e.key.toLowerCase() === "i") {
           open();
           return;
        }

    });

    function close() {

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

        $(".info-box").css({
            "z-index": "-10",
            opacity: "0"
        });

        $(".container").css({
            "pointer-events": "auto"
        });

        $(".rwdimgmap").focus();
        closed = true;

    }

    function open() {

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

        $(".info-box").css({
            "z-index": "99",
            opacity: "1"
        });

        $(".container").css({
            "pointer-events": "none"
        });

        closed = false;
    }

    // Attribute of map image for responsivity

    var timer = null;

    function addSizeAttributes() {
        $(".rwdimgmap").attr("width", $(".rwdimgmap").width());
        $(".rwdimgmap").attr("height", $(".rwdimgmap").height());
    }

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