(function () {
    'use strict';

    angular.module('common.services').decorator("$xhrFactory", [
        "$delegate", "$injector",
        function ($delegate, $injector) {
            return function (method, url) {
                var xhr = $delegate(method, url);
                var $http = $injector.get("$http");
                var callConfig = $http.pendingRequests[$http.pendingRequests.length - 1];
                if (angular.isFunction(callConfig.onProgress))
                    xhr.addEventListener("progress", callConfig.onProgress);
                return xhr;
            };
        }
    ]);

    angular.module('common.services').factory('http', ['$http', function ($http) {
        var hs = this;
        //Time Out For Http Request Fail after 60s 
        hs.timeout = 6000;

        hs.GET = function (url, headers, callback, errcallback) {
            $http({
                method: "GET",
                url: url,
                headers: headers,
                timeout: hs.timeout
            }).then(function successCallback(response) {
                /*Status 200 if Successfully Select*/
                if (callback) {
                    callback(response);
                }
            }, function errorCallback(response) {
                //TODO: Error Handling 
                if (errcallback)
                    errcallback(response);
            });
        };

        hs.SYN_GET = function (url, headers) {
            return $http({
                method: "GET",
                url: url,
                headers: headers,
                timeout: hs.timeout
            }).then(function (response) {
                return response;
            });
        };

        hs.POST = function (url, headers, jsondata, callback, errcallback) {
            $http({
                method: "POST",
                url: url,
                headers: headers,
                data: jsondata,
                timeout: hs.timeout
            }).then(function successCallback(response) {
                if (callback)
                    callback(response);
            }, function errorCallback(response) {
                //TODO: Error Handling 
                if (errcallback)
                    errcallback(response);
            });
        };

        hs.PUT = function (url, headers, jsondata, callback, errcallback) {
            $http({
                method: "PUT",
                url: url,
                headers: headers,
                data: jsondata,
                timeout: hs.timeout
            }).then(function successCallback(response) {
                if (callback)
                    callback(response);
            }, function errorCallback(response) {
                //TODO: Error Handling 
                if (errcallback)
                    errcallback(response);
            });
        };

        hs.DELETE = function (url, headers, callback, errcallback) {

            $http({
                method: "DELETE",
                url: url,
                headers: headers,
                timeout: hs.timeout
            }).then(function successCallback(response) {
                if (callback)
                    callback(response);
            }, function errorCallback(response) {
                if (errcallback)
                    errcallback(response);
            });
        };

        hs.PAGINATE = function (url, page, pageSize, headers, callback, errcallback) {
            $http({
                method: "GET",
                url: url + "?page=" + page + "&size=" + pageSize,
                headers: headers,
                timeout: hs.timeout
            }).then(function successCallback(response) {
                if (callback)
                    callback(response);
            }, function errorCallback(response) {
                if (errcallback)
                    errcallback(response);
            });
        };

        hs.FD_POST = function (url, formData, headers, callback, errcallback) {
            $http.post(url, formData, {
                    transformRequest: angular.identity,
                    headers: headers,
                    withCredentials : false,
                    timeout: hs.timeout,
                    onProgress: function (event) {

                        if (event.total !== 0)
                            console.log("loaded " + ((event.loaded / event.total) * 100) + "%");
                        else
                            console.log("loaded 100%");
                    }
                })
                .success(function (response) {
                    if (callback)
                        callback(response);
                })
                .error(function (response) {
                    if (errcallback)
                        errcallback(response);
                });
        };
        
        return hs;
    }]);
})();