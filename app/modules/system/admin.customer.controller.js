(function () {
    'use strict';

    angular.module('SundewApp.Controllers').controller('CustomerCtrl', [
        '$scope', '$mdDialog', '$q', '$http', '$rootScope', '$log', '$location', 'http', 'store', 'config', 'general',
        function ($scope, $mdDialog, $q, $http, $rootScope, $log, $location, http, store, config, general) {
            var self = this;
            self.structure = [];
            self.customer = {};
            self.customers = [];
            self.columns = [];
            self.keys = [
                'id',
                'name',
                'email'
            ];
            self.selectedCustomer = {};

            /*Table Variables*/
            self.page = 1;
            self.pageSize = 10;
            self.pageCount = 0;
            self.total = 0;
            self.pdata = {};

            //Pagination
            self.reload = function (ps) {
                self.pageSize = ps;
                self.paginate(self.page);
            }

            self.next = function (ps) {
                self.pageSize = ps;
                if (self.page == self.pageCount)
                    self.page = 1;
                else
                    self.page += 1;

                self.paginate(self.page);

                return self.page;
            }

            self.loadPage = function (page, ps) {
                self.pageSize = ps;

                self.page = page;

                self.paginate(self.page);
            }

            self.prev = function (ps) {
                self.pageSize = ps;
                if (self.page == 1)
                    self.page = self.pageCount;
                else
                    self.page -= 1;

                self.paginate(self.page);

                return self.page;
            }

            /*Paginate Request*/
            self.paginate = function (page) {
                //$scope.$parent.progress(true);
                http.PAGINATE(config.API_URL + 'sample/customer', page, self.pageSize, store.HEADER(), self.paginateCallback, self.err_callback);
            }

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
            }

            self.paginateCallback = function (response) {
                self.customers = [];
                self.pageCount = response.data.content.page_count;
                self.total = response.data.content.total;
                self.set_pdata();
                self.isTableReady = true;
                angular.forEach(response.data.content.data, function (row, key) {
                    self.customers.push(row);
                });

                //$scope.$parent.progress(false);
            }

            /*Init*/
            self.init = function () {
                self.set_pdata();
                //$scope.$parent.header("Customer Setup");
                //$scope.$parent.progress(true);

                var data = http.GET(config.API_URL + 'sample/customer/struct', store.HEADER(), self.struct_callback, self.err_callback);
                self.page = 1;
                self.paginate(self.page);
            }

            self.struct_callback = function (response) {
                self.structure = response.data.content.data;
                self.keys = [];
                angular.forEach(self.structure, function (value, key) {
                    self.keys.push(value.request_name);
                    self.columns.push(value);
                });
            };

            self.err_callback = function (response) {
                //$scope.$parent.progress(false);
                general.error("Internal Server Error!");
            };

            //Load Dialog
            self.delete_callback = function (response) {
                if (response.data.code == 202) {
                    //Reload and show info
                    self.paginate(self.page);
                    general.success("Delete Success!");
                } else
                    general.error("Internal Server Error!");

                //$scope.$parent.progress(false);
            }

            self.confirmFunc = function () {
                //$scope.$parent.progress(true);
                http.DELETE(config.API_URL + 'sample/customer/' + self.selectedCustomer.id, store.HEADER(), self.delete_callback, self.err_callback);
            }

            //CRUD Dialog
            self.showDialog = function (ev, row, type) {
                self.selectedCustomer = row;
                // Appending dialog to document.body to cover sidenav in docs app
                if (type == "D") {
                    general.confirmation("Customer Delete", "Are you sure to delete " + row.name + "?",
                        "Delete", "Cancel", self.confirmFunc, null, ev);
                    return;
                }

                $mdDialog.show({
                        locals: {
                            structure: angular.copy(self.structure),
                            status: type,
                            event: ev,
                            customer: angular.copy(row)/*,
                            progress: $scope.$parent.progress*/
                        },
                        controller: "CustomerPopupCtrl as rpc",
                        templateUrl: 'view/system/admin.customer.popup.html',
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
            }

            self.init();
        }
    ])
})();