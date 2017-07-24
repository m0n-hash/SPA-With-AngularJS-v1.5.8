(function () {
    'use strict';

    function checkAccessDuringApplicationBootStrap($window, auth) {
        if (auth.isLoggedIn()) {
            return;
        }
        console.log('its here on run.app.js')
        //TODO: Redirect to third party login page
        //$window.location = "www.google.com";

        //Make sure bootstrap process is stopped
        //throw new Error('Access denied');
    }

    //Inject dependencies
    checkAccessDuringApplicationBootStrap.$inject = ['$window', 'auth'];

    //Export
    angular.module('SundewApp')
        .run(checkAccessDuringApplicationBootStrap);

})();