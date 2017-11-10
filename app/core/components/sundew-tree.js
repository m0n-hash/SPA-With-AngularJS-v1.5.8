(function () {
    angular.module('common.components').component('sdTreeview', {
        templateUrl: 'app/core/components/sundew-tree.component.html',
        controller: 'TreeViewCtrl as tc',
        bindings: {
            pUp: '&?',
            pDown: '&?',
            pSave: '&?',
            pUpLevel: '&?',
            pEdit: '&?',
            pRemove: '&?',
            pDataSource: '='
        }
    });
})();