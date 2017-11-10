(function () {

    angular.module('common.directives')
        //Current Used One
        .directive('dynamicController', ['$controller', function ($controller) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, element, attrs) {

                    var locals = {
                        $scope: scope,
                        $element: element,
                        $attrs: attrs,
                    };
                    console.log(scope.$eval(attrs.controllerAs));
                    console.log(scope.$eval(attrs.dynamicController));
                    element.data('$Controller', $controller(scope.$eval(attrs.dynamicController) +
                        " as " + scope.$eval(attrs.controllerAs), locals));
                },
            };
        }])
        //Test Dynamic Controller
        //Just Change ctrl attr to ng-controller
        //Usage: <div dynamic-ctrl="'Ctrl1'">{{dc.test}}</div>
        .directive('dynamicCtrl', ['$compile', '$parse', function ($compile, $parse) {
            return {
                restrict: 'A',
                terminal: true,
                priority: 100000,
                link: function (scope, elem) {
                    var name = $parse(elem.attr('dynamic-ctrl'))(scope);
                    elem.removeAttr('dynamic-ctrl');
                    elem.attr('ng-controller', name + ' as dc');
                    $compile(elem)(scope);
                }
            };
        }]);
})();