(function () {
    'use strict';

    angular.module('common.services').factory('localstorage', ['$base64', '$window', function ($base64, $window) {

        var self = this;

        self.localStorageFactory = function () {
            if ($window.localStorage) {
                return $window.localStorage;
            }

            throw new Error('Local storage support is needed!');
        };

        //        self.storage = localStorageFactory();

        self.setItem = function (key, value) {
            self.localStorageFactory()[key] = value;
        };

        self.getItem = function (key) {
            var value = self.localStorageFactory()[key];
            
            return (value === undefined) ? null : value;
        };

        return self;
    }]);

})();