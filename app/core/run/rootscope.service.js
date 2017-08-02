(function () {
    'use strict';

    function assignServicesToRootScope($rootScope, auth, store) {
        $rootScope.auth = auth;

        $rootScope.store = store;
    }

    //Inject Dependencies
    assignServicesToRootScope.$inject = ['$rootScope', 'auth', 'store'];

    //Export
    angular.module('SundewApp')
        .run(assignServicesToRootScope);

})();