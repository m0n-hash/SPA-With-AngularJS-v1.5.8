(function () {

    /*Enter key press directive*/
    angular.module('common.directives').directive('compareTo', function () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    console.log(ngModel);
                    console.log(modelValue);
                    console.log(scope.otherModelValue);
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    });
})();