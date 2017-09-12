(function () {
    'use strict';

    angular.module('common.services').factory('general', ['$window', '$filter', '$mdToast', '$mdDialog', '$base64',
        function ($window, $filter, $mdToast, $mdDialog, $base64) {
            var self = this;

            self.isNumber = function (n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            };

            self.success = function (msg) {
                $window.scrollTo(0, 0);
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(msg)
                    .position("top right")
                    .theme('success-toast')
                    .hideDelay(3000)
                );
            };

            self.warn = function (msg) {
                $window.scrollTo(0, 0);
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(msg)
                    .position("top right")
                    .theme('warn-toast')
                    .hideDelay(3000)
                );
            };

            self.info = function (msg) {
                $window.scrollTo(0, 0);
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(msg)
                    .position("top right")
                    .theme('info-toast')
                    .hideDelay(3000)
                );
            };

            self.error = function (msg) {
                $window.scrollTo(0, 0);
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(msg)
                    .position("top right")
                    .theme('error-toast')
                    .hideDelay(3000)
                );
            };

            self.data_error = function (response) {
                console.log(response);
                if (response.status == 502 || response.status == 400) {
                    self.error(response.statusText + ": Please check your internet connection and try again!");
                } else if (response.data === null) {
                    self.warn("Response is null! Please check your internet connection and try again!");
                } else if (response.data.code == 401) {
                    //Alert Server reply error message
                    self.warn(response.data.content.message);
                }
                //TODO: else if(...)
                //Current only test with login credentials
            };

            self.confirmation = function (data, title, content, confirmLabel, cancelLabel, confirmFunc, cancelFunc, ev) {
                var confirm = $mdDialog.confirm()
                    .title(title)
                    .textContent(content)
                    .ariaLabel('confirm dialog')
                    .targetEvent(ev)
                    .ok(confirmLabel)
                    .cancel(cancelLabel);

                $mdDialog.show(confirm).then(function () {
                    if (confirmFunc)
                        confirmFunc(data);
                    return;
                }, function () {
                    if (cancelFunc)
                        cancelFunc(data);
                    return;
                });
            };

            var hasOwn = Object.prototype.hasOwnProperty;
            self.getJSONKeys = function (obj) {
                //Object.keys = Object_keys;
                var result = Object_keys(obj);
                return result;
            };

            function Object_keys(obj) {
                var keys = [],
                    name;
                for (name in obj) {
                    if (hasOwn.call(obj, name)) {
                        keys.push(name);
                    }
                }
                return keys;
            }

            self.filterArray = function (array, filterfunc) {
                var result = self.filterArrays(array, filterfunc);
                if (result.length > 0)
                    return result[0];
                else
                    return null;
            };

            self.filterArrays = function (array, filterfunc) {
                return $filter('filter')(array, filterfunc);
            };

            self.TimestampToDate = function (timestamp) {
                return self.formatDateHMS(new Date(timestamp));
            };

            self.DateToTimestamp = function (date) {
                return date.getTime();
            };

            self.formatDate = function (fromdate) {
                var dd = fromdate.getDate();
                var mm = fromdate.getMonth() + 1; //January is 0!
                var yyyy = fromdate.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }

                return dd + '-' + mm + '-' + yyyy;
            };

            self.formatDateHMS = function (fromdate) {
                console.log(fromdate);

                var dd = fromdate.getDate();
                var mm = fromdate.getMonth() + 1; //January is 0!
                var yyyy = fromdate.getFullYear();
                var hr = fromdate.getHours();
                var min = fromdate.getMinutes();
                var sec = fromdate.getSeconds();

                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }

                if (hr < 10)
                    hr = '0' + hr;

                if (min < 10)
                    min = '0' + min;

                if (sec < 10)
                    sec = '0' + sec;

                return dd + '-' + mm + '-' + yyyy + ' ' + hr + ':' + min + ':' + sec;
            };

            self.formatString = function (string) {
                if (arguments.length > 1) {
                    // If we have more than one argument (insertion values have been given)
                    var str = string;
                    // Loop through the values we have been given to insert
                    for (var i = 1; i < arguments.length; i++) {
                        // Compile a new Regular expression looking for {0}, {1} etc in the input string
                        var reg = new RegExp("\\{" + (i - 1) + "\\}");
                        // Perform the replace with the compiled RegEx and the value
                        str = str.replace(reg, arguments[i]);
                    }
                    return str;
                }

                return input;
            };

            self._mimeEnc = function (str) {
                console.log(mimelib.foldLine(str, 76));
            };

            self._enc = function (json) {
                return $base64.encode(JSON.stringify(json));
            };

            self._dec = function (enc_str) {
                var str = $base64.decode(enc_str);
                return eval("(" + str + ")");
            };

            return this;
        }
    ]);
})();