angular.module('common.components').controller('MiconDialogCtrl', [
    '$scope', '$mdDialog',
    function ($scope, $mdDialog) {
        var self = this;
        self.selected = null;

        self.init = function () {
            self.selected = null;
        };

        self.answer = function (value) {
            if (value) {
                $mdDialog.hide({
                    "selected": value
                });
            } else {
                $mdDialog.hide();
            }
        };

        self.init();
    }
]);