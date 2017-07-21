(function () {
    'use strict';

    angular.module("common.services", []);
    angular.module("common.components", []);
    angular.module("common.directives", ["common.services"]);
    angular.module("SundewApp.Controllers", ["common.directives", "common.components"]);
})();

/*
angular.module("common.services", []);
angular.module("common.directives", ["common.services"]);
angular.module("common.components", ["common.directives"]);
angular.module("SundewApp.Controllers",["common.components"]);
 */