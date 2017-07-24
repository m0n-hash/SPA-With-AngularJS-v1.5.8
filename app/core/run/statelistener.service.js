(function (angular) {
    'use strict';

    function checkAccessOnStateChange($rootScope, auth) {
        $rootScope.preventDefault=false;
        console.log('its here on state listener.js');
        //Listen for location changes
        //This happens before route or state changes
        $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            if (!auth.isLoggedIn()) {
                //TODO: Redirect to login
                console.log('location change start');
                //Prevent location change
                event.preventDefault();
            }
        });

        //Listen for route changes when using ngRoute
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            if (!auth.isLoggedIn()) {
                //TODO: Redirect to login
                console.log('route change start');
                //Prevent state change
                event.preventDefault();
            }
        });

        //Listen for state changes when using ui-router
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (!auth.isLoggedIn()) {
                //TODO: Redirect to login
                console.log('state change start');
                //Prevent state change
                event.preventDefault();
            }
        });
    }

    //Inject Dependencies
    checkAccessOnStateChange.$inject = ['$rootScope', 'auth'];

    //Export
    angular.module('SundewApp').run(checkAccessOnStateChange);

})(angular);