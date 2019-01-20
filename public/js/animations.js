$(window).on("load", function() {

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
        $(".info-box").animate({
            opacity: 0
        }, 200);
    }

    function open() {
        $(".info-box").animate({
            opacity: 1
        }, 200);
    }
});