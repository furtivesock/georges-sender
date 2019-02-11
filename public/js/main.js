$(function() {
    // Informations box
    var closed = true;
    $(".info").click(function() {
        if (closed) {
            open();
        } else {
            close();
        }
        console.log("hey : " + closed);
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
        $(".info-box").css({
            "z-index": "-10",
            opacity: "0"
        });
        $(".container").css({
            opacity: "1",
            "pointer-events": "auto"
        });

        $(".rwdimgmap").focus();
        closed = true;
    }

    function open() {
        $(".info-box").css({
            "z-index": "99",
            opacity: "100"
        });
        $(".container").css({
            opacity: "0.5",
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