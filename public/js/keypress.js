app.directive('myDirect', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 39) {

                event.preventDefault();
            }
        });
    };
});