(function () {
    'use strict';

    angular.module('SundewApp.Controllers').controller('PermissionRouteCtrl', [
        '$scope', '$location', 'http', 'config', 'store', 'general',
        function ($scope, $location, http, config, store, general) {
            var self = this;
            self.keys = []; //lsheader
            self.routes = {}; //ls
            self.tempRoutes = {};
            self.roles = []; //cb
            self.role = null; //cbselect

            self.init = function () {
                self.getRoute();
                self.getRole();
            };

            self.getRoute = function (role) {
                if (role)
                    http.GET(config.API_URL + "permissions/role/" + role.id, store.HEADER(), self.selectRoleCallback, self.errCallback);
                else
                    http.GET(config.API_URL + "permissions/routes", store.HEADER(), self.routeCallback, self.errCallback);
            };

            self.routeCallback = function (response) {
                
                self.tempRoutes = angular.copy(response.data.content);
                self.routes = angular.copy(response.data.content);
                self.keys = general.getJSONKeys(self.routes);
                console.log(self.routes);
            };

            self.errCallback = function (response) {
                general.data_error(response);
            };

            self.getRole = function () {
                http.GET(config.API_URL + 'roles/all', store.HEADER(), self.roleCallback, self.errCallback);
            };

            self.roleCallback = function (response) {
                self.roles = response.data.content.data;
            };

            self.selectRoleCallback = function (response) {
                self.routes = angular.copy(self.tempRoutes);

                var selectedRoles = response.data.content.data;

                angular.forEach(self.keys, function (valuek, keyk) {
                    angular.forEach(selectedRoles, function (value, key) {
                        var result = general.filterArray(self.routes[valuek], function (d) {

                            return d.resource_class === value.resource_class &&
                                d.resource_method === value.resource_method &&
                                d.method === value.request_method;
                        });

                        if (result) {
                            var idx = self.routes[valuek].indexOf(result);
                            self.routes[valuek][idx].checked = true;
                            self.routes[valuek][idx].id = value.id;
                        }
                    });
                });
            };

            self.isChecked = function (key) {
                var result = general.filterArrays(self.routes[key], function (d) {
                    return d.checked === true;
                });

                if (result === null)
                    return false;
                else {
                    return result.length === self.routes[key].length;
                }
            };

            self.toggleAll = function (key) {
                var val = !self.isChecked(key);

                angular.forEach(self.routes[key], function (value, k) {
                    var idx = self.routes[key].indexOf(value);
                    self.routes[key][idx].checked = val;
                });
            };

            self.selectChange = function (role) {
                self.getRoute(role);
            };

            self.checkChange = function (key, route) {
                var idx = self.routes[key].indexOf(route);
                self.routes[key][idx].isChanged = true;
            };

            self.saveCallback = function (response) {
                if (response.data.code == 201) {
                    general.success("Update Permission Success!");

                    self.selectChange(self.role);
                }
            };

            self.save = function () {
                if (!self.role) {
                    general.warn("Please select role!");
                    return;
                }

                var data = self.collectData();

                http.POST(config.API_URL + 'permissions/modify', store.HEADER(), data, self.saveCallback, self.errCallback);
            };

            self.collectData = function () {
                var results = [];
                //Loop Keys
                angular.forEach(self.keys, function (valuek, keyk) {
                    //Loop routes
                    angular.forEach(self.routes[valuek], function (value, key) {
                        if (value.isChanged) {
                            results.push({
                                checked: value.checked,
                                permission: {
                                    id: value.id,
                                    role_id: self.role.id,
                                    resource_class: value.resource_class,
                                    resource_method: value.resource_method,
                                    request_method: value.method
                                }
                            });
                        }
                    });
                });

                return results;
            };

            self.clear = function () {
                self.role = null;
                self.routes = angular.copy(self.tempRoutes);
            };

            self.l_class = function (key) {
                if (self.keys.indexOf(key) % 2 == 0) {
                    return "list-lwrap-left";
                } else {
                    return "list-lwrap-right";
                }

            };

            self.init();
        }
    ]);
})();