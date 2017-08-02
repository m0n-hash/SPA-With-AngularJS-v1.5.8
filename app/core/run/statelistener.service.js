(function (angular) {
    'use strict';

    function checkAccessOnStateChange($window, $rootScope, auth) {
        $rootScope.preventDefault = false;
        //Listen for location changes
        //This happens before route or state changes
        $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            //            console.log('location change');
            if (!auth.isLoggedIn()) {
                //TODO: Redirect to login
                $window.location = "auth/login.html";

                //Prevent location change
                event.preventDefault();
            }
        });

        //Listen for route changes when using ngRoute
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            //         console.log('route change');
            if (!auth.isLoggedIn()) {
                //TODO: Redirect to login
                $window.location = "auth/login.html";

                //Prevent state change
                event.preventDefault();
            }
        });

        //Listen for state changes when using ui-router
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //          console.log('state change');
            if (!auth.isLoggedIn()) {
                //TODO: Redirect to login
                $window.location = "auth/login.html";

                //Prevent state change
                event.preventDefault();
            }
        });
    }

    //Inject Dependencies
    checkAccessOnStateChange.$inject = ['$window', '$rootScope', 'auth'];

    //Export
    angular.module('SundewApp').run(checkAccessOnStateChange);

})(angular);