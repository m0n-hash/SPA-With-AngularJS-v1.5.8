(function(){

/*Enter key press directive*/
angular.module('common.directives').directive('sdEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.sdEnter);
                });

                event.preventDefault();
            }
        });
    };
});

})();