currentWindow = null;

const INFO = $(".info-box");
const COLLECTIONS = $(".collections-list-container");

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

function closeAll() {
    closeInfo();
    closeList();
}

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

