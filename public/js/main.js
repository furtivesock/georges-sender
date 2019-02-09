$(function() {
    // Informations box
    var closed = true;
    $(".info").click(function() {
        if (closed) {
            open();
            closed = false;
        } else {
            close();
            closed = true;
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

    }

    // Attribute of map image for responsivity

    var timer = null;

    function addSizeAttributes() {
        $(".rwdimgmap").attr("width", $(".rwdimgmap").width());
        $(".rwdimgmap").attr("height", $(".rwdimgmap").height());
        console.log("fuck yes");
    }

    function addAttr() {
        clearTimeout(timer);
        timer = setTimeout(addSizeAttributes, 0);
    }

    $(".rwdimgmap").ready(function() {


        // Detect if the picture a panorama or not
        if ($(this).attr("width") > $(window).width() & $(this).attr("height") > $(window).height()) {
            $(this).removeClass("not-panorama");
            $(this).addClass("panorama")
        } else {
            $(this).removeClass("panorama");
            $(this).addClass("not-panorama");
        }


        // Add size attributes of the map image
        if ($(this).width() !== undefined) {
            addSizeAttributes();
        }
        // Detect when the window is resized
        window.addEventListener('resize', addAttr, false);

    })

});