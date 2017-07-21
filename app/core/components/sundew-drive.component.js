angular.module('common.components').controller('DriveCtrl', [
    '$scope','$window', 'general', 'http', 'store', 'config', 'clipboard', '$mdDialog',
    function ($scope, $window, general, http, store, config, clipboard, $mdDialog) {
        var self = this;
        self.filesToUpload = {};
        self.files = [];

        self.getFile = function () {
            http.GET(config.API_URL + "file/", store.HEADER(), self.GetCallback, self.ErrCallback);
        }

        self.GetCallback = function (response) {
            if (response.data.code != 200)
                return;

            self.files = response.data.content.data;

            angular.forEach(self.files, function (row, key) {
                self.files[self.files.indexOf(row)].fileIc = self.fileIcon(row);
            });
            console.log(self.files);
        }

        self.init = function () {
            //console.log($window.innerHeight);
            self.getFile();
        }

        self.loadFile = function () {
            document.getElementById('uploadFile').click();
        }

        self.fileChanged = function () {
            console.log('file to upload');
            console.log(self.filesToUpload);

            var fd = new FormData();
            fd.append('uploadedFile', self.filesToUpload.data);
            //fd.append('uploadedFile', self.filesToUpload.json);

            http.FD_POST(config.API_URL + 'file/upload', fd, store.FD_HEADER(), self.UploadCallback, self.ErrCallback);

        }

        self.UploadCallback = function (response) {
            console.log(response);
        }

        self.ErrCallback = function (response) {
            if (!response.data) {
                general.error("Response data is null.");
            }
            console.log(response);
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
        }

        self.MenuClick = function (type, data, ev) {
            console.log(data);
            switch (type) {
                case "pre":
                    //TODO: Preview with view components
                    break;
                case "sha":
                    clipboard.copyText(data.public_url);
                    general.info("Link copied to the clipboard.");
                    break;
                case "mov":
                    //TODO: Move to a customer location folder, when api support customizable folder
                    break;
                case "ren":
                    self.rename_file(data);
                    break;
                case "rem":
                    general.confirmation(data, "Remove", general.formatString("Are you sure to remove '{0}.{1}'", data.name, data.extension),
                        "Confirm", "Cancel", self.delete_file, null, ev);
                    break;
                case "det":
                    var filedetails = "";
                    filedetails += general.formatString('Name : {0}.{1}<br>', data.name, data.extension);
                    filedetails += general.formatString('Size : {0}<br>', data.size);
                    filedetails += general.formatString('Type : {0}<br>', data.type);
                    filedetails += general.formatString('Create Date : {0}', general.TimestampToDate(data.created_at));
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
        }

        self.rename_file = function (data) {
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
            }, function () {
                console.log('Dialog Cancel!');
            });
        }

        self.delete_file = function (data) {
            //TODO: To Delete File Data
            http.DELETE(config.API_URL + "file/" + data.id, store.HEADER(), self.delete_callback, self.ErrCallback);
        }

        self.delete_callback = function (response) {
            if (response.data.code == 202) {
                general.success(response.data.content.message);
                self.getFile();
            }
        }

        self.init();
    }
]);