(function () {
    'use strict';

    angular.module('common.services').factory('auth', ['http', 'store', 'config', 'general', function (http, store, config, general) {
        var self = this;

        //check wheter the user is logged in 
        //@return boolean
        self.isLoggedIn = function () {
            return store.USER_DATA() !== null;
        };

        self.scb = null;

        //Log in
        //@param url, headers, credential, callback, errcallback
        self.logIn = function (credential, success_callback) {
            self.scb = success_callback;
            
            http.POST(config.API_URL + 'auth', store.HEADER(), credential, self.success_callback, self.error_callback);
        };

        self.success_callback = function (response) {
            console.log('response s in auth', response);
            if (response.data.code == 200) {
                console.log(response);

                var content = response.data.content;

                store.setUser({
                    _display_n: content.display_name,
                    _email: content.email,
                    _uid: content.id
                });

                store.setAccessToken(content.current_token);

                if (self.scb !== null)
                    self.scb(response);
            }
        };

        self.error_callback = function (response) {
            console.log('response e in auth', response);
            general.data_error(response);
        };

        //Log out
        self.logOut = function () {
            store.destroy();
        };

        return self;
    }]);
})();