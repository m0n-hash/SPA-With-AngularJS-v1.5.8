(function () {
    'use strict';

    angular.module('SundewApp.Controllers').controller('DashboardCtrl', [
        '$scope', '$mdDialog', '$rootScope', '$log', '$timeout', '$location', 'menu',
        function ($scope, $mdDialog, $rootScope, $log, $state, $timeout, $location) {
            var self = this;

            self.init = function () {
                self.testdd = {
                    "name1": "test",
                    "extension1": "jpg"
                };
                //$scope.$parent.header("Dashboard");
                console.log('dashboard init');
            };

            self.test = function (ev) {
                console.log(self.testdd);
                console.log('Drive reloaded');

                $mdDialog.show({
                        controller: "MiconDialogCtrl as idc",
                        templateUrl: 'app/core/components/sundew-micon.dialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        fullscreen: $scope.customFullscreen
                    })
                    .then(function (data) {
                        console.log(data);
                        if (!data)
                            return;
                        if (data.selectClick) {

                        }
                    }, function () {});
            };

            self.init();
        }
    ]);
})();