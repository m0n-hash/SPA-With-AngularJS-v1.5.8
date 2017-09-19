(function () {
    angular.module('common.components').component('sdMicon', {
        templateUrl: 'app/core/components/sundew-micon.component.html',
        controller: 'MiconCtrl as mic',
        bindings: {
            pSelectClick: '&?'
        }
    });
})();