(function () {
    'use strict';

    angular.module('common.services').factory('store', ['$base64', '$cookieStore', 'localstorage', '$window', function ($base64, $cookieStore, localstorage, $window) {
        var self = this;

        self.HEADER = function () {
            var xheaders = {};
            xheaders['Content-Type'] = "application/json";
            //TODO: Cookie To store User Data For Log in and Create Authorization Token
            xheaders['Authorization'] = self.AUTHORIZE();
            xheaders['Access-Control-Allow-Credentials'] = true;

            return xheaders;
        };

        //multipart/form-data <or> application/x-www-form-urlencoded
        self.FD_HEADER = function () {
            var xheaders = {};
            xheaders['Content-Type'] = undefined;
            //TODO: Cookie To store User Data For Log in and Create Authorization Token
            xheaders['Authorization'] = self.AUTHORIZE();
            xheaders['Access-Control-Allow-Credentials'] = true;

            return xheaders;
        };

        //Get User Data
        self.USER_DATA = function () {
            return $base64.decode(self._user);
        };

        //Get Auth Data
        self.AUTHORIZE = function () {
            return $base64.decode(self._accessToken);
            //return "Bearer eyJhbGciOiJIUzUxMiIsInppcCI6IkRFRiJ9.eNqsj0EOgjAQRa_SdKUJhc7YFoG9rtSNCUsjtCRVYg0FJBrvLhC9gcls_vvJm5kX9V1BU9p50zCgAbXej3Hnnrauz5EMOVnk9qbdw5P9kagQMpIfciUy0vSpFCFfkq0pry5CDnwcIBvbmMoN0VROwnNLU5Ccr5RA4AE1w30GmEg1g0trx5USQYKqOIsxVkxorVlSYskSYdBAoXCNxajTprelOVn93yu_Wjc9_zPF9P0BAAD__w.4YyuE8UHQfN08UalEweagzcLieu9HceHkGV5RVT3grhyiHO4yWmAwxLD8EfdVRriYs9MNBDRpjWsga2QdNkd-A";
        };

        //Instantiate data when service is loaded
        self._user = null;
        self._accessToken = null;

        self.setUser = function (user) {
            self._user = $base64.encode(JSON.stringify(user));

            localstorage.setItem('session.user', JSON.stringify(user));
        };

        self.setAccessToken = function (token) {
            self._accessToken = $base64.encode(token);
            localstorage.setItem('session.accessToken', token);
            return self;
        };

        //Destroy session
        self.destroy = function destroy() {
            self.setUser(null);
            self.setAccessToken(null);
        };

        self.init = function () {
            var usr = localstorage.getItem('session.user');
            if (usr !== null)
                self._user = JSON.parse($base64.decode(usr));

            var tk = localstorage.getItem('session.accessToken');
            if (tk !== null)
                self._accessToken = JSON.parse($base64.decode());
        };

        self.init();

        return self;
    }]);
})();