angular.module('common.components').controller('DriveCtrl', [
    '$scope', '$window', 'general', 'http', 'store', 'config', 'clipboard', '$mdDialog', "download",
    function ($scope, $window, general, http, store, config, clipboard, $mdDialog, download) {
        var self = this;
        self.filesToUpload = {};
        self.files = [];
        self.selected;
        self.rearrange = true;

        self.getFile = function () {
            console.log(store.HEADER());
            console.log(config.API_URL + "files/");
            http.GET(config.API_URL + "files/", store.HEADER(), self.GetCallback, self.ErrCallback);
        };

        self.GetCallback = function (response) {
            if (response.data.code != 200)
                return;

            self.files = response.data.content.data;

            angular.forEach(self.files, function (row, key) {
                self.files[self.files.indexOf(row)].fileIc = self.fileIcon(row);
            });
            console.log(self.files);
        };

        self.init = function () {
            self.rearrange = true;
            //console.log($window.innerHeight);
            self.getFile();
        };

        self.loadFile = function () {
            document.getElementById('uploadFile').click();
        };

        self.reArrange = function () {
            self.rearrange = !self.rearrange;
        };

        self.fileChanged = function () {
            console.log(self.filesToUpload);

            var fd = new FormData();
            fd.append('uploadedFile', self.filesToUpload.data);
            //fd.append('uploadedFile', self.filesToUpload.json);

            var hd = store.FD_HEADER();
            var size = self.filesToUpload.data.size;
            console.log(hd);
            http.FD_POST(config.API_URL + 'files/upload', fd, store.FD_HEADER(), self.UploadCallback, self.ErrCallback);
        };

        self.UploadCallback = function (response) {
            console.log(response);
            if (response.code == 200) {
                general.success("Upload Success!");
                self.getFile();
            }
        };

        self.ErrCallback = function (response) {
            if (!response.data) {
                general.error("Response data is null.");
            }
            general.error(response.message);
        };

        self.fileIcon = function (i) {
            var fileic = {};
            if (i.extension == "txt" || i.extension == "sql" || i.extension == "doc" || i.extension == "docx")
                fileic = {
                    ico: "insert_drive_file",
                    color: "indigo-800"
                };
            else if (i.extension == "mp3" || i.extension == "wav")
                fileic = {
                    ico: "library_music",
                    color: "pink-A700"
                };
            else if (i.extension == "mp4" || i.extension == "flv")
                fileic = {
                    ico: "video_library",
                    color: "green-A700"
                };
            else if (i.extension == "png" || i.extension == "jpg" || i.extension == "jpeg")
                fileic = {
                    ico: "photo",
                    color: "red-600"
                };
            else if (i.extension == "exe" || i.extension == "rar")
                fileic = {
                    ico: "all_inclusive",
                    color: "orange-400"
                };
            else
                fileic = {
                    ico: "do_not_disturb",
                    color: "orange-400"
                };

            return fileic;
        };

        self.MenuClick = function (type, data, ev) {
            self.selected = data;
            switch (type) {
                case "pre":
                    //TODO: Preview with view components
                    $mdDialog.show({
                        locals: {
                            image: angular.copy(data),
                            status: type,
                            event: ev
                            /*TODO: Progress*/
                        },
                        controller: 'DrivePreviewCtrl as dpc',
                        templateUrl: 'app/core/components/sundew-drive.preview.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    });
                    break;
                case "sha":
                    //TODO Hide Or Show After Public is Worked
                    clipboard.copyText(data.public_url);
                    general.info("Link copied to the clipboard.");
                    break;
                case "mov":
                    //TODO: Move to a customer location folder, when api support customizable folder
                    break;
                case "ren":
                    self.rename_file(data, ev);
                    break;
                case "rem":
                    general.confirmation(data, "Remove", general.formatString("Are you sure to remove '{0}.{1}'", data.name, data.extension),
                        "Confirm", "Cancel", self.delete_file, null, ev);
                    break;
                case "dow":
                    var url = config.API_URL + data["&file_links"].private.href + "?is64=true";
                    var header = store.IMGHEADER();
                    header["Content-Disposition"] = "attachment";
                    header["filename"] = data.name + "." + data.extension;
                    http.GET(url, header, self.down_callback, self.ErrCallback);
                    break;
                case "det":
                    var filedetails = "";
                    filedetails += general.formatString('Name : {0}.{1}<br>', data.name, data.extension);
                    filedetails += general.formatString('Size : {0}<br>', data.size);
                    filedetails += general.formatString('Type : {0}<br>', data.type);
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('.sd-drive-container')))
                        .clickOutsideToClose(true)
                        .title('Details...')
                        .htmlContent(filedetails)
                        .ariaLabel('File Detail Popup.')
                        .ok('OK')
                        .targetEvent(ev)
                    );
                    break;
                default:
                    break;
            }
        };

        self.down_callback = function (response) {
            download.fromDataURL('data:' + self.selected.type + ';base64,' + response.data, self.selected.name + "." + self.selected.extension);
        };

        self.rename_file = function (data, ev) {
            console.log('start rename');
            var confirm = $mdDialog.prompt()
                .title('Rename')
                .textContent('Please enter a new name for the file.')
                .clickOutsideToClose(true)
                .placeholder('untitled file')
                .ariaLabel('File Name')
                .initialValue(data.name)
                .targetEvent(ev)
                .ok('Save')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function (result) {
                //TODO: To Update File Data
                var data = angular.copy(self.selected);
                data.name = result;
                delete data.fileIc;
                delete data.size;
                console.log(data);
                http.PUT(config.API_URL + "files/" + data.id + "/ren", store.HEADER(), data, self.rename_callback, self.ErrCallback);
            }, function () {
                console.log('Dialog Cancel!');
            });
        };

        self.rename_callback = function (response) {
            if (response.data.code == 202) {
                general.success(response.data.content.message);
                self.getFile();
            }
        };

        self.delete_file = function (data) {
            //TODO: To Delete File Data
            http.DELETE(config.API_URL + "files/" + data.id, store.HEADER(), self.delete_callback, self.ErrCallback);
        };

        self.delete_callback = function (response) {
            if (response.data.code == 202) {
                general.success(response.data.content.message);
                self.getFile();
            }
        };

        self.init();
    }
]);