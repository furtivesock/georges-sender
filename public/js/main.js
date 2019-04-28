
$(function() {

    // Attribute of map image for responsivity

    var timer = null;

    function addAttr(test) {
        console.log("i'm resized!");
        clearTimeout(timer);
        timer = setTimeout(addSizeAttributes(test), 200);
    }

    
    $(".rwdimgmap").ready(function() {
        var test = $(".rwdimgmap");
        if ($(this).width() != undefined) {
            // Add size attributes of the map image
            addSizeAttributes(test);
        }            
        // Detect when the window is resized
        window.addEventListener('resize', addAttr(test), true);
    
    })

    function addSizeAttributes(test) {        
        var image = new Image();
        image.src = test.attr("src");

        var ratio = Math.max(test.width() / image.width, test.height() / image.height);
        var width = Math.round(ratio * image.width);
        var height = Math.round(ratio * image.height);
        console.log("Taille retournée : " + width + " " + height);
        test.attr("width", width);
        test.attr("height", height);
    }

});