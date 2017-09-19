angular.module('common.components').controller('MiconCtrl', [
    '$scope', 'http', 'config', 'safeApply',
    function ($scope, http, config, safeApply) {
        var self = this;
        self.micons = [];

        self.init = function () {
            console.log(config.MICON);
            http.READ_JSON(config.MICON, self.miconCallback);
        };

        self.miconCallback = function (response) {
            self.micons = response.data;
            console.log(self.micons);
        };

        self.icon_click = function (ic) {
            if (self.pSelectClick) {
                self.pSelectClick({
                    "value": ic
                });
            }
        };

        self.init();
    }
]);