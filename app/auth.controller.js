(function () {

    var app = angular.module('SundewApp.Auth', ["ngRoute", "ngMaterial", "ngMessages", "ngAnimate", "ngCookies",
        "ngAria", "base64",
        "common.directives"
    ]);

    app.config(function ($mdThemingProvider) {
        /*Default Theme*/
        $mdThemingProvider.theme('SundewTheme')
            .primaryPalette('blue', {
                'default': '500',
                'hue-1': '50',
                'hue-2': '100',
                'hue-3': '900'
            })
            .accentPalette('green', {
                'default': 'A400',
                'hue-1': '50',
                'hue-2': 'A100',
                'hue-3': 'A200'
            }).warnPalette('red', {
                'default': 'A700',
                'hue-1': '50',
                'hue-2': '100',
                'hue-3': '600',
            });
    });

    /*
    config -> changable settings and routes
    http -> api communication helper
    store -> user credentials storage helper
    general -> general helpers
    */
    app.controller("AuthCtrl", ["$scope", "$rootScope", "$window", "config", "store", "general", "auth",
        function ($scope, $rootScope, $window, config, store, general, auth) {
            var ac = this;

            ac.config = config;
            ac.user = "";
            ac.password = "";

            ac.init = function () {
                ac.user = "";
                ac.password = "";
            };

            ac.login_click = function () {
                var data = {
                    "email": ac.user,
                    "password": ac.password,
                    "device_id": config.DEVICE_ID,
                    "timestamp": (new Date()).getTime()
                };

                var xheaders = {};
                xheaders["Content-Type"] = "application/json";

                auth.logIn(data, ac.success_callback, ac.error_callback);
            };

            ac.success_callback = function (response) {
                if (response.data.code == 200) {
                    $window.location = "../index.html";
                }
            };

            ac.init();
        }
    ]);

})();