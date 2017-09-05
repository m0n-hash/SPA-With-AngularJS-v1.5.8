(function () {
    'use strict';

    angular.module('SundewApp.Controllers').controller('DashboardCtrl', [
        '$scope', '$rootScope', '$log', '$timeout', '$location', 'menu',
        function ($scope, $rootScope, $log, $state, $timeout, $location) {
            var self = this;
            
            self.init = function () {
                self.testdd = {
                    "name1": "test",
                    "extension1": "jpg"
                };
                //$scope.$parent.header("Dashboard");
                console.log('dashboard init');
            };



            self.test = function () {
                console.log(self.testdd);
                console.log('Drive reloaded');
            };

            self.init();
        }
    ]);
})();