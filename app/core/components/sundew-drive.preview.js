(function () {
    'use strict';
    angular.module('common.components').controller('DrivePreviewCtrl', [
        '$scope', 'image', 'status', 'event', 'store', 'config', 'http', 'general', '$window', '$sce',
        function ($scope, image, status, event, store, config, http, general, $window, $sce) {
            var self = this;
            self.img = image;
            self.href = "";
            self.init = function () {
                console.clear();
                console.log(self.img);

                var header = store.IMGHEADER();

                //Currently Us Is64 To Encode From API
                var url = config.API_URL + self.img["&file_links"].private.href + "?is64=true";

                http.GET(url, header, self.callback, self.error_callback);
            };

            self.callback = function (response) {
                self.href = "data:image/png;base64," + response.data;
            };

            self.error_callback = function (response) {
                console.log(response);
            };

            self.cancel = function () {
                $mdDialog.cancel();
            };

            self.init();
        }
    ]);
})();