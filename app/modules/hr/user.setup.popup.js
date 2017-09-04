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

            self.icons = [{}, {
                icon: 'perm_identity',
                color: 'green-A700',
            }];

            self.test = "";
            self.init = function () {
                console.log('in popup');
                console.log(structure);
                console.log(user);

                self.roles = [{
                    id: 1,
                    name: "CEO",
                    description: "CEO Desc"
                }, {
                    id: 2,
                    name: "Manager",
                    description: "Manager Desc"
                }];
                self.multiple = "";

                var result = inputc.whInput('name', 'checkbox', {
                    color: "blue",
                    icon: "healing",
                    attr_style: "height:200px;",
                    model: "urc.tmodel",
                    model2: "tmodel2",
                    objs: "urc.roles",
                    objToShow: "{{item.name}}",
                    multi: "multiple",
                    max_len: "25",
                    form_err: "userForm['txtname'].$error",
                    msg_exp: "'required'"
                });

                self.test = result;
                var myEl = angular.element('#test');

                myEl.append('Hi<br/>');
                console.log(myEl);
                console.log('test #2');
            };

            self.goto=function(navi){
                //TODO: Go to role tab back and forth, and reload role selector values
            }

            self.testing = function () {
                return self.test;
            };

            self.cancel = function () {
                console.log(self.tmodel);
                /*
                var myEl = angular.element(document.querySelector('#test'));
                console.log('test #cancel1');
                console.log(myEl);
                */
                $mdDialog.cancel();
            };

            self.init();
        }
    ]);
})();