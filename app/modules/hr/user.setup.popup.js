/* 
TODO:   Skip Is Online <To Skip in entry>
        Skip Facebook <Pend for later insert>
        Skip Extra <Pend for later insert>
        TO Connect Role Setup Form With User Setup 2nd Tab Communication
        TO Finish User Setup After Sundew Drive Image manager Finish To Use That Component in User Popup
*/
(function () {
    'use strict';

    angular.module('SundewApp.Controllers').controller('UserPopupCtrl', [
        '$scope', '$mdDialog', 'structure', 'status', 'event', 'user', 'general', 'http', 'config', 'inputc',
        function ($scope, $mdDialog, structure, status, event, user, general, http, config, inputc) {
            var self = this;
            self.structure = structure;
            self.status = status;
            self.event = event;
            self.title = "";
            self.user = user;
            self.selectedTab = null;

            self.icons = [{}, {
                icon: 'perm_identity',
                color: 'green-A700',
            }];

            self.test = "";
            self.init = function () {
                angular.forEach(structure, function (data, key) {

                });
            };

            self.goto = function (navi) {
                //TODO: Go to role tab back and forth, and reload role selector values
            };

            self.compileStruct = function (data) {

                if (data.name == "id" ||
                    data.name == "online" ||
                    data.name == "facebook_id" ||
                    data.name == "extra" ||
                    data.name == "roles" ||
                    data.name == "status") {
                    return "";
                }

                var iconSets = inputc.whIcon(data.name);

                var extra = {
                    color: iconSets.data.color,
                    icon: iconSets.data.icon,
                    icon2: iconSets.data.icon2,
                    attr_style: "",
                    model: "urc.user." + data.name,
                    model2: "urc.user." + data.name + "2",
                    max_len: data.length,
                    form_err: "userForm['txt" + data.name + "'].$error",
                    msg_exp: "'required', 'minlength', 'maxlength'",
                };

                return inputc.whInput(data.label, data.input_type, extra);
            };

            self.cancel = function () {
                /*
                var myEl = angular.element(document.querySelector('#test'));
                console.log('test #cancel1');
                console.log(myEl);
                */
                $mdDialog.cancel();
            };

            self.answer = function () {
                console.log(self.user);
            };

            self.init();
        }
    ]);
})();