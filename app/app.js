(function () {
    var app = angular.module('SundewApp', ["ngRoute", "ngMaterial", "material.components.eventCalendar",
        "ngMessages", "ngAnimate", "ngAria", "angularMoment", "base64", "ngContextMenu", "angular-clipboard",
        "widget.scrollbar",
        "ngCookies", "mdDataTable",
        "SundewApp.Controllers"
    ]);

    //Application Theming
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

    //take all whitespace out of string
    app.filter('nospace', function () {
        return function (value) {
            return (!value) ? '' : value.replace(/ /g, '');
        };
    });

    //replace uppercase to regular case
    app.filter('humanizeDoc', function () {
        return function (doc) {
            if (!doc) return;

            if (doc.type === 'directive') {
                return doc.name.replace(/([A-Z])/g, function ($1) {
                    return '-' + $1.toLowerCase();
                });
            }

            return doc.label || doc.name;
        };
    });
/*
    app.run(function ($window, auth) {
        if (auth.isLoggedIn()) {
            return;
        }

        //TODO: Redirect to Login page
        //$window.location = "#";

        //Make sure bootstrap process is stopped
        //throw new Error('Access denied');
    });
*/
})();