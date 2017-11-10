angular.module('common.components').controller('TreeviewDialogCtrl', [
    '$scope', '$mdDialog',
    function ($scope, $mdDialog) {
        var self = this;
        self.selected = null;
        self.types = ["module", "toggle", "link"];

        self.init = function () {
            self.selected = null;
        };

        self.answer = function (value) {
            if (value) {
                $mdDialog.hide({
                    selected: self.selected
                });
            } else {
                $mdDialog.hide();
            }
        };

        self.init();
    }
]);