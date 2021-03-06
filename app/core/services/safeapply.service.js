/**
 * Reference:https://coderwall.com/p/ngisma/safe-apply-in-angular-js
 * Usage-:
 * .controller('MyCtrl', ['$scope,' 'safeApply', function($scope, safeApply) {
    safeApply($scope);                     // no function passed in
    safeApply($scope, function() {   // passing a function in
    });
}])
 */
(function () {
    'use strict';

    angular.module('common.services').factory('safeApply', ['$rootScope', function ($rootScope) {
        return function ($scope, fn) {
            var phase = $scope.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn) {
                    $scope.$eval(fn);
                }
            } else {
                if (fn) {
                    $scope.$apply(fn);
                } else {
                    $scope.$apply();
                }
            }
        };
    }]);
})();

