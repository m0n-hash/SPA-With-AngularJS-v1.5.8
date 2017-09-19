(function () {
    'use strict';

    angular.module('SundewApp.Controllers').controller('MenuCtrl', [
        '$scope', '$location', 'http', 'config', 'store', 'general',
        function ($scope, $location, http, config, store, general) {

            self.init = function () {
                console.log('menu init');
            };

            self.init();

        }
    ]);
})();