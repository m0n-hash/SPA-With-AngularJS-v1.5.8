(function () {
    'use strict';

    function assignServicesToRootScope($rootScope, auth, store) {
        $rootScope.auth = auth;

        $rootScope.store = store;

        console.log('its here on rootscope.service.js');
    }

    //Inject Dependencies
    assignServicesToRootScope.$inject = ['$rootScope', 'auth', 'store'];

    //Export
    angular.module('SundewApp')
        .run(assignServicesToRootScope);

})();