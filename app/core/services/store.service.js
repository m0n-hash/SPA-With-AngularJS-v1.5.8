(function () {
    'use strict';

    angular.module('common.services').factory('store', ['$base64', '$cookieStore', function ($base64, $cookieStore) {
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

        self.AUTHORIZE=function(){
            return "Bearer eyJhbGciOiJIUzUxMiIsInppcCI6IkRFRiJ9.eNqsj0EOgjAQRa_SdKUJhc7YFoG9rtSNCUsjtCRVYg0FJBrvLhC9gcls_vvJm5kX9V1BU9p50zCgAbXej3Hnnrauz5EMOVnk9qbdw5P9kagQMpIfciUy0vSpFCFfkq0pry5CDnwcIBvbmMoN0VROwnNLU5Ccr5RA4AE1w30GmEg1g0trx5USQYKqOIsxVkxorVlSYskSYdBAoXCNxajTprelOVn93yu_Wjc9_zPF9P0BAAD__w.4YyuE8UHQfN08UalEweagzcLieu9HceHkGV5RVT3grhyiHO4yWmAwxLD8EfdVRriYs9MNBDRpjWsga2QdNkd-A";
        };

        return this;
    }]);
})();