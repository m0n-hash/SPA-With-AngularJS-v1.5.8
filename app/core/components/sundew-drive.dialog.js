angular.module('common.components').controller('DriveDialogCtrl', [
    '$scope', '$mdDialog', 'general', 'load_self',
    function ($scope, $mdDialog, general, load_self) {
        var self = this;
        self.selected = null;

        self.init = function () {
            self.selected = null;
            self.load_self = load_self;
        };

        self.answer = function (status) {
            if (status) {
                $mdDialog.hide({
                    "selected": self.selected
                });
            } else {
                $mdDialog.hide();
            }
        };

        self.cancel = function () {
            $mdDialog.hide();
        };

        self.init();
    }
]);