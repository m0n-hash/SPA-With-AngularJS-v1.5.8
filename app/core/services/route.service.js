(function () {
    'use strict';

    angular.module('common.services').factory('route', ['$rootScope', function ($rootScope) {

        var self = {
            validateView: function (path) {
                switch (path) {
                    case "#/":
                        //TODO: To Change Root Url To someting 
                        return {
                            templateUrl:'view/dashboard.html',
                            controller:'DashboardCtrl',
                            controllerAs:'sample'
                        };
                    case "#/admin/dashboard":
                        return {
                            templateUrl: 'view/dashboard.html',
                            controller: 'DashboardCtrl',
                            controllerAs: 'dc'
                        };
                    case "#/admin/customer":
                        return {
                            templateUrl: 'view/system/admin.customer.html',
                            controller: 'CustomerCtrl',
                            controllerAs: 'cc'
                        };
                    case "#/user/calendar":
                        return {
                            templateUrl: 'view/dashboard/user.calendar.html',
                            controller: 'UserCtrl',
                            controllerAs: 'sc'
                        };
                        case "#/hr/staff/setup":
                        return{
                            templateUrl:'view/hr/user.setup.html',
                            controller:'UserCtrl',
                            controllerAs:'uc'
                        };
                    default:{
                        return {
                            //TODO: Page not found
                        };
                    }
                }
            }
        };

        return self;

    }]);

})();