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
            xheaders['Cache-Control'] = 'no-cache';
            xheaders['Pragma'] = 'no-cache';

            return xheaders;
        };

        self.IMGHEADER = function () {
            var xheaders = {};
            xheaders['Content-Type'] = "application/json";
            //TODO: Cookie To store User Data For Log in and Create Authorization Token
            xheaders['Authorization'] = self.AUTHORIZE();
            return xheaders;
        }

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
            return get_u();
        };

        //Get Auth Data
        self.AUTHORIZE = function () {
            return "Bearer " + get_t();
        };

        //Instantiate data when service is loaded
        self._user = null;
        self._accessToken = null;

        self.setUser = function (user) {
            self._user = $base64.encode(JSON.stringify(user));

            localstorage.setItem('session.user', self._user);
        };

        self.setAccessToken = function (token) {
            self._accessToken = $base64.encode(token);
            localstorage.setItem('session.accessToken', self._accessToken);
            return self;
        };

        //Destroy session
        self.destroy = function destroy() {
            self.setUser(null);
            self.setAccessToken(null);
        };

        function get_u() {
            self._user = null;
            var usr = localstorage.getItem('session.user');
            if (usr !== null) {
                self._user = JSON.parse($base64.decode(usr));
            }
            return self._user;
        }

        function get_t() {
            self._accessToken = null;
            var tk = localstorage.getItem('session.accessToken');
            if (tk !== null) {
                self._accessToken = $base64.decode(tk);
            }
            return self._accessToken;
        }

        self.init = function () {
            get_u();
            get_t();
        };

        self.init();

        return self;
    }]);
})();