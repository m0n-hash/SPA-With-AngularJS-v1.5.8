(function () {
    'use strict';

    angular.module('common.services').factory('auth', ['http', 'store', 'config', function (http, store, config) {
        var self = this;

        //check wheter the user is logged in 
        //@return boolean
        self.isLoggedIn = function () {
            return store.USER_DATA() !== null;
        };

        //Log in
        //@param url, headers, credential, callback, errcallback
        self.logIn = function (credential, logIn_Callback, error_Callback) {
            http.POST(config.API_URL + 'auth', store.HEADER(), credential, logIn_Callback, error_Callback);
        };

        //Log out
        self.logOut = function () {
            store.destroy();
        };

        return self;
    }]);
})();