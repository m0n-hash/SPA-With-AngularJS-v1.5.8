angular.module('common.components').controller('ImageCtrl', [
    '$scope', '$window', '$mdDialog', 'http', 'general', 'config', 'store',
    function ($scope, $window, $mdDialog, http, general, config, store) {
        var self = this;
        self.href = "";

        self.init = function () {
            self.pLoadImg = {
                refresh: self.setImgModel
            };
            self.load_image();
        };

        self.open_dialog = function (ev) {
            console.log('open-dialog');
            if (self.pLoad) {
                self.pLoad();
            } else {
                $mdDialog.show({
                        locals: {
                            load_self: self.open_dialog
                        },
                        controller: "DriveDialogCtrl as ddc",
                        templateUrl: 'app/core/components/sundew-drive.dialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        fullscreen: $scope.customFullscreen
                    })
                    .then(function (data) {
                        self.setImgModel(data);
                    }, function () {

                    });
            }
        };

        self.setImgModel = function (data) {
            console.clear();
            console.log('set img model');
            console.log(data);
            self.imgModel = data.selected;
            console.log(self.imgModel);
            self.load_image();
        };

        self.remove = function () {
            self.imgModel = {};
            self.load_image();
        };

        self.isHide = function () {
            if (
                self.imgModel === undefined ||
                !self.imgModel["&file_links"] ||
                !self.imgModel["&file_links"].private.href) {
                return true;
            } else return false;
        };

        self.load_image = function () {
            if (self.imgModel === undefined ||
                !self.imgModel["&file_links"] ||
                !self.imgModel["&file_links"].private.href) {
                self.href = "resources/img/default.png";

            } else {
                var header = store.IMGHEADER();

                var url = config.API_URL + self.imgModel["&file_links"].private.href + "?is64=true";

                http.GET(url, header, self.callback, self.error_callback);
            }
        };

        self.callback = function (response) {
            self.href = "data:image/png;base64," + response.data;
        };

        self.error_callback = function (response) {
            general.data_error(response);
        };

        self.getCaption = function () {
            if (self.imgModel === undefined || !self.imgModel.name)
                return "Empty";
            else
                return self.imgModel.name + "." + self.imgModel.extension;
        };

        self.init();
    }
]);