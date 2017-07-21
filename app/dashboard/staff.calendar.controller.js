(function () {
    'use strict';

    angular.module('SundewApp.Controllers').controller('StaffCtrl', ['$scope',
        function ($scope) {
            var sc = this;
            sc.test="Menu is ok or not! Test>>>";
            $scope.components = [{
                name: "Wd1",
                controller: "Ctrl1",
                cas:"bb"
            }, {
                name: "Wd2",
                controller: "Ctrl2",
                cas:"cc"
            }];

            sc.init = function () {
                
            };
            sc.ctrl = "Ctrl1";
            sc.init();
        }
    ]);

    angular.module('SundewApp.Controllers').controller('Ctrl1', ['$scope', function ($scope) {
        var sc=this;
        $scope.test = "test 1";
        sc.test="test app1";
    }]);

    angular.module('SundewApp.Controllers').controller('Ctrl2', ['$scope', function ($scope) {
        var sc=this;
        $scope.test = "test 2";
        sc.test="test app1";
    }]);

})();