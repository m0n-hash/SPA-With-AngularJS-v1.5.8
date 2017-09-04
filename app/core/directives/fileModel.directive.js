(function () {

    angular.module('common.directives').directive('sdFileModel', function () {
        return {
            scope: {
                sdFileModel: "=",
                sdFileChanged: "&?"
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    //TODO: to set sd-file-model with file data not some Json
                    console.log(element[0].files[0]);
                    //Result file data
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        
                        if (!scope.$$phase) {
                            scope.$apply(function () {
                                /*
                                scope.sdFileModel.data = loadEvent.target.result;

                                scope.sdFileModel.json = changeEvent.target.files[0];
                                */

                                scope.sdFileModel.data = element[0].files[0];
                            });
                        }
                        if (scope.sdFileChanged)
                            scope.sdFileChanged();
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);

                    //Result JSON file input
                    /*
                    scope.$apply(function () {
                        scope.sdFileModel = changeEvent.target.files[0];

                        // or all selected files:
                        // scope.fileread = changeEvent.target.files;
                    });
                    if (scope.sdFileChanged)
                            scope.sdFileChanged();
                    */

                });
            }
        }

    });
})();