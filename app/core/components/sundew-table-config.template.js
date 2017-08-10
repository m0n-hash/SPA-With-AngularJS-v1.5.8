angular.module('common.components').controller('TableConfigCtrl', [
    '$scope', 'columns', 'showColumns', '$mdDialog',
    function ($scope, columns, showColumns, $mdDialog) {
        var self = this;
        self.columns = columns;
        self.showColumns = showColumns;
        self.selectAll = false;

        self.init = function () {
            angular.forEach(self.showColumns, function (row, key) {
                self.selected.push(row);
            });
        };

        self.isShow = function (column) {
            return !column.is_hide_in_grid;
        };

        self.selected = [];

        self.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        };

        self.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        self.checkAll = function () {
            self.selected = [];
            if (self.selectAll) {
                angular.forEach(self.columns, function (row, key) {
                    self.selected.push(row);
                });
            }
        };

        self.cancel = function () {
            $mdDialog.cancel();
        };

        self.answer = function () {
            $mdDialog.hide(self.selected);
        };

        self.init();
    }
]);