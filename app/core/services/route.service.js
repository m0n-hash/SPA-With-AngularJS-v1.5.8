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
                    case "#/staff/calendar":
                        return {
                            templateUrl: 'view/dashboard/staff.calendar.html',
                            controller: 'StaffCtrl',
                            controllerAs: 'sc'
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