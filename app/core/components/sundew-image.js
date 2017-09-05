(function () {

    angular.module('common.components').component('sdImg', {
        templateUrl: "app/core/components/sundew-image.component.html",
        controller: "ImageCtrl as ic",
        bindings: {
            imgModel: '='
        }
    });
})();