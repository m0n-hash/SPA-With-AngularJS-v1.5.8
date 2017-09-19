(function () {
    'use strict';

    angular.module('common.services').factory('route', ['$rootScope', function ($rootScope) {

        var self = {
            validateView: function (path) {
                switch (path) {
                    case "#/":
                        //TODO: To Change Root Url To someting 
                        return {
                            templateUrl: 'view/dashboard.html',
                            controller: 'DashboardCtrl',
                            controllerAs: 'sample'
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
                        return {
                            templateUrl: 'view/hr/user.setup.html',
                            controller: 'UserCtrl',
                            controllerAs: 'uc'
                        };
                    case "#/hr/role/setup":
                        return {
                            templateUrl: 'view/hr/role.setup.html',
                            controller: 'RoleCtrl',
                            controllerAs: 'rc'
                        };
                    case "#/setting/route/permission":
                        return {
                            templateUrl: 'view/system/permission.route.html',
                            controller: 'PermissionRouteCtrl',
                            controllerAs: 'prc'
                        };
                    case "#/setting/menu":
                        return {
                            templateUrl: 'view/system/menu.setup.html',
                            controller: 'MenuCtrl',
                            controllerAs: 'mc'
                        };
                    case "#/setting/menu/permission":
                        return {
                            templateUrl: 'view/system/permission.menu.html',
                            controller: 'PermissionMenuCtrl',
                            controllerAs: 'pmc'
                        };
                    default:
                        {
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