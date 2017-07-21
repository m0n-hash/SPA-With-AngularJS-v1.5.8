angular.module('common.components').controller('TableCtrl', [
    '$scope', '$mdDialog', 'general',
    function ($scope, $mdDialog, general) {
        var self = this;
        self.val = "hello";
        self.isOpen = false;
        self.filterText = "";
        self.filterData = [];
        self.currentPage = self.pData.page;
        self.currentRow = null;

        self.fabSearch = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };
        self.showColumns = null;

        self.init = function () {
            //Initialize Sundew Table Visible Columns
            if (!self.showColumns)
                self.showColumns = self.columns;
        }

        self.showDialog = function (ev) {
            $mdDialog.show({
                    locals: {
                        columns: self.columns,
                        showColumns: self.showColumns
                    },
                    controller: "TableConfigCtrl as tc",
                    templateUrl: 'app/core/components/sundew-table-config.template.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function (selectedCols) {
                    $scope.status = 'You said the information was "' + selectedCols + '".';

                    //Set Checked Columns Return From Dialog Box
                    self.setShowColumns(selectedCols);
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }

        self.getFilters = function () {
            if (self.filterText) {
                return self.filterData;
            } else {
                return self.data;
            }
        }

        //Initialize Columns And Add selected columns
        self.setShowColumns = function (columns) {
            self.showColumns = [];
            angular.forEach(columns, function (row, key) {
                self.showColumns.push(row);
            });
        }

        self.isShow = function (col) {
            return self.showColumns.indexOf(col) > -1;
        }

        self.isCenter = function (col) {
            if (col.request_name == "id")
                return "text-align:center";
            else
                return "";
        }

        self.page_change = function (page) {
            if (general.isNumber(page)) {
                self.pLoad({
                    'page': page,
                    'ps': self.pData.pageSize
                });
            } else {
                alert('Invalid Page Number!');
            }
        }

        self.prev = function () {
            self.currentPage = self.pPrev({
                ps: self.pData.pageSize
            });
        }

        self.next = function () {
            self.currentPage = self.pNext({
                ps: self.pData.pageSize
            });
        }

        self.crud = function (e, status) {
            var msg = "";
            switch (status) {
                case "E":
                    msg = "Please select row to edit.";
                    break;
                case "D":
                    msg = "Please select row to delete.";
                    break;
            }

            var data = {};

            if (status != "I")
                data = self.currentRow;

            if (!self.currentRow && status != "I") {
                general.warn(msg);
                return;
            }

            self.pCrud({
                ev: e,
                row: data,
                type: status
            });
        }

        self.check_changed = function (data) {
            if (!data.isChecked) {
                self.currentRow = null;
                return;
            }

            self.currentRow = data;
            angular.forEach(self.filterData, function (row, key) {
                var idx = self.filterData.indexOf(row);
                if (self.filterData.indexOf(data) != self.filterData.indexOf(row)) {
                    self.filterData[idx].isChecked = false;
                }
            });

            angular.forEach(self.data, function (row, key) {
                var idx = self.data.indexOf(row);
                if (self.data.indexOf(data) != self.data.indexOf(row)) {
                    self.data[idx].isChecked = false;
                }
            });
        }

        self.td_val = function (data, col) {
            if (col.type == "Date") {
                return general.formatDate(new Date(data[col.request_name]));
            } else
                return data[col.request_name];
        }

        self.init();
    }
]);