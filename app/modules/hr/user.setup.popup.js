(function () {
    'use strict';

    angular.module('SundewApp.Controllers').controller('UserPopupCtrl', [
        '$scope', '$mdDialog', 'structure', 'status', 'event', 'user', 'general', 'http', 'config',
        function ($scope, $mdDialog, structure, status, event, user, general, http, config) {
            var self = this;
            self.structure = structure;
            self.status = status;
            self.event = event;
            self.title = "";
            self.user = user;

            self.icons = [{}, {
                icon: 'perm_identity',
                color: 'green-A700',
            }];

            self.init = function () {
                console.log('in popup');
                console.log(structure);
                console.log(user);
            };

            self.cancel = function () {
                $mdDialog.cancel();
            };

            self.test = function (elem, name, type) {
                console.log(name);
                console.log(type);
            };

            self.init();
        }
    ]);
})();