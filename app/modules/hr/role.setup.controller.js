(function () {
    'use strict';

    angular.module('SundewApp.Controllers').controller('RoleCtrl', [
        '$scope', '$q', '$rootScope', '$log', '$location', 'http', 'config', 'general',
        function ($scope, $q, $rootScope, $log, $location, http, config, general) {
            var self = this;
            var store = $rootScope.store;
            self.structure = [];
            self.role = {};
            self.roles = [];
            self.columns = [];
            self.keys = [];
            self.selectedRole = {};

            /*Table Variables*/
            self.page = 1;
            self.pageSize = 5;
            self.pageCount = 0;
            self.total = 0;
            self.pdata = {};

            self.disabled = false;

            //Pagination
            self.reload = function (ps) {
                self.pageSize = ps;
                self.paginate(self.page);
            };

            self.next = function (ps) {
                self.pageSize = ps;
                if (self.page == self.pageCount)
                    self.page = 1;
                else
                    self.page += 1;

                self.paginate(self.page);

                return self.page;
            };

            self.loadPage = function (page, ps) {
                self.pageSize = ps;

                self.page = page;

                self.paginate(self.page);
            };

            self.prev = function (ps) {
                self.pageSize = ps;
                if (self.page == 1)
                    self.page = self.pageCount;
                else
                    self.page -= 1;

                self.paginate(self.page);

                return self.page;
            };

            /*Paginate Request*/
            self.paginate = function (page) {
                //TODO: Start Progress
                //$scope.$parent.progress(true);
                http.PAGINATE(config.API_URL + 'roles', page, self.pageSize, store.HEADER(), self.paginateCallback, self.err_callback);
            };

            self.isTableReady = false;
            self.set_pdata = function () {
                self.pdata = {
                    "header": self.header,
                    "page": self.page,
                    "pageSize": self.pageSize,
                    "pageCount": self.pageCount,
                    "total": self.total,
                    "pageSizeValue": [5, 10, 20, 50, 100]
                };
            };

            self.paginateCallback = function (response) {
                self.roles = [];
                self.pageCount = response.data.content.page_count;
                self.total = response.data.content.total;
                self.set_pdata();
                self.isTableReady = true;
                angular.forEach(response.data.content.data, function (row, key) {
                    self.roles.push(row);
                });

                //TODO: Stop Progress
                //$scope.$parent.progress(false);
            };

            /*Init*/
            self.init = function () {
                self.set_pdata();
                //TODO: Start Progress
                //$scope.$parent.progress(true);
                self.disabled = true;
                var data = http.GET(config.API_URL + "roles/struct", store.HEADER(), self.struct_callback, self.err_callback);
                self.page = 1;
                self.paginate(self.page);
            };

            self.struct_callback = function (response) {
                self.structure = response.data.content.data;

                self.keys = [];
                angular.forEach(self.structure, function (value, key) {
                    self.keys.push(value.name);

                    self.columns.push(value);
                });
            };

            self.err_callback = function (response) {
                general.data_error(response);
            };

            //Load Dialog
            self.delete_callback = function (response) {
                if (response.data.code == 202) {
                    //Reload and show info
                    self.paginate(self.page);
                    general.success("Delete Success!");
                } else
                    general.data_error(response);

                //$scope.$parent.progress(false);
            };

            self.confirmFunc = function (data) {
                console.log(data);
                //$scope.$parent.progress(true);
                http.DELETE(config.API_URL + 'roles/' + data.id, store.HEADER(), self.delete_callback, self.err_callback);
            };

            //CRUD Dialog
            self.showDialog = function (ev, row, type) {
                self.selectedRole = row;
                // Appending dialog to document.body to cover sidenav in docs app
                if (type == "D") {
                    general.confirmation(row, "Role Delete", "Are you sure to delete " + row.name + "?",
                        "Delete", "Cancel", self.confirmFunc, null, ev);
                    return;
                }
                
                self.disabled = false;

                if (type == "I") {
                    self.role = {};
                } else if (type == "E") {
                    self.role = angular.copy(row);
                }
                /*
                $mdDialog.show({
                        locals: {
                            structure: angular.copy(self.structure),
                            status: type,
                            event: ev,
                            user: angular.copy(row)
                            //progress: $scope.$parent.progress
                        },
                        controller: "UserPopupCtrl as rpc",
                        templateUrl: 'view/hr/user.setup.popup.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        fullscreen: $scope.customFullscreen
                    })
                    .then(function (data) {
                        if (data.reload) {
                            if (data.status == "I") {
                                self.page = self.pageCount;
                                self.paginate(self.pageCount);
                            } else
                                self.paginate(self.page);
                        }
                    }, function () {

                    });
                */
            };

            self.isDisabled = function (errDisable) {
                if (!errDisable && !self.disabled) {
                    return false;
                } else
                    return true;
            };

            //CRUD Start
            self.icons = [{}, {
                icon: 'label',
                color: 'blue-800'
            }, {
                icon: 'list',
                color: 'light-green-A700'
            }];

            self.isIdNText = function (name, type) {
                return name != "id" && type == "String";
            };

            self.input_height = function (input) {
                if (input == "textarea") {
                    return 'height:80px;';
                }

                return "";
            };

            self.refresh = function (page) {
                self.page = page;
                self.paginate(page);
                self.role = {};
                self.disabled = true;
            };

            self.edit_callback = function (response) {
                if (response.data.code == 202) {
                    general.success("Update Success!");
                    //TODO: To Reload Table With Current Index
                    self.refresh(self.page);
                } else {
                    general.error("Internal Server Error!");
                }

                //TODO: Progress False
            };

            self.insert_callback = function (response) {
                if (response.data.code == 201) {
                    general.success("Insert Success!");
                    //TODO: To Reload Table With Latest Index
                    self.refresh(self.pageCount);

                } else
                    general.error("Internal Server Error!");

                //TODO: Progress False
            };

            self.error_callback = function (response) {
                console.log(response);
                //TODO: Error Handling general.data_error ...
            };

            self._save = function () {
                //TODO: Progress True
                var ro = self.collectRole();
                if (self.role.id) {
                    ro.id = self.role.id;
                    
                    http.PUT(config.API_URL + 'roles/' + self.role.id, store.HEADER(), ro, self.edit_callback, self.error_callback);
                } else {
                    http.POST(config.API_URL + 'roles', store.HEADER(), ro, self.insert_callback, self.error_callback);
                }
            };

            self.collectRole = function () {
                return {
                    "name": self.role.name,
                    "description": self.role.description,
                    "permissions": []
                };
            };

            self.init();
        }
    ]);

})();