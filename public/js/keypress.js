app.directive('myDirect', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 39) {
                console.log("hi it's me mario");

                event.preventDefault();
            }
        });
    };
});