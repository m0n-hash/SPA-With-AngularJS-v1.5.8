(function () {

    /*Enter key press directive*/
    angular.module('common.components').component('sdTable', {

        templateUrl: "app/core/components/sundew-table.component.html",
        controller: "TableCtrl as tc",
        bindings: {
            pData: '=',
            columns: '=',
            data: '=',
            pNext: '&?',
            pPrev: '&?',
            pReload: '&?',
            pLoad: '&?',
            pCrud: '&?',
            pLoadImg: '=?'
        }
    });

})();