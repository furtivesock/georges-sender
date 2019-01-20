var timer = null;
// Center areas texts on hover
function setInteractivesAreas() {
    $('area').each(function() {
        var title = $(this).attr('title');
        var coords = $(this).attr('coords');
        var coordsA = coords.split(',');
        var left = parseInt(coordsA[0]);
        var right = parseInt(coordsA[2]);
        var top = parseInt(coordsA[1]);
        var bottom = parseInt(coordsA[3]);
        // Text size
        var width = $(this).width() / 2;
        var height = $(this).height() / 2;
        // Center the text
        var xmid = (left + right) / 2 - width;
        var ymid = (top + bottom) / 2 - height;
        console.log(width);
        $('area[title*="' + title + '"]').css({top: ymid+'px', left: xmid+'px'});
    })
}

// Wait until the window is totally resized to place well areas texts
function resizeAreas() {
    clearTimeout(timer);
    timer = setTimeout(setInteractivesAreas, 250);
}

/*
$(window).on("load", function() {
    $('map').imageMapResize();
});
*/

$(function() {
    $('map').imageMapResize();
    setInteractivesAreas();

    window.addEventListener('resize', resizeAreas, false);
}); 
