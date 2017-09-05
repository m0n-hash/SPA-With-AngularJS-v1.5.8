(function () {

    angular.module('common.components').component('sdDrive', {
        templateUrl: "app/core/components/sundew-drive.component.html",
        controller: "DriveCtrl as dc",
        bindings: {
            pReload: '&?',
            pSelect: '=?',
            pContext: '='
        }
    });
})();