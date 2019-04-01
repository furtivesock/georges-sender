
$(function() {

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