(function () {
    'use strict';

    angular.module('SundewApp.Controllers').controller('PermissionMenuCtrl', [
        '$scope', '$location', 'http', 'config', 'store', 'general',
        function ($scope, $location, http, config, store, general) {

            self.init = function () {
                console.log('menu permission init');
            };

            self.init();

        }
    ]);
})();