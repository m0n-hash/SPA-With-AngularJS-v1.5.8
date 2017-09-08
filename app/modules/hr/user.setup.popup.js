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
        '$scope', '$mdDialog', 'structure', 'status', 'event', 'user', 'general', 'http', 'store', 'config', 'inputc', 'safeApply',
        function ($scope, $mdDialog, structure, status, event, user, general, http, store, config, inputc, safeApply) {
            var self = this;
            self.structure = structure;
            self.status = status;
            self.event = event;
            self.title = "";
            self.user;
            self.selectedTab = null;
            self.profile = null;
            self.roles = [];
            self.searchRole;
            self.vegetables = ['Corn', 'Onions', 'Kale', 'Arugula', 'Peas', 'Zucchini'];
            self.vegetable = [];

            self.icons = [{}, {
                icon: 'perm_identity',
                color: 'green-A700',
            }];

            self.init = function () {
                console.log('init', user);

                self.user = angular.copy(user);

                if (self.user.status == "A")
                    self.user.status = true;
                else
                    self.user.status = false;

                self.buttonVisibility(0);
                self.loadRoles();
            };

            self.loadRoles = function () {
                http.GET(config.API_URL + 'roles/all', store.HEADER(), self.roleCallback, self.errorCallback);
            };

            self.roleCallback = function (response) {
                if (response.data.code == 200) {
                    self.roles = response.data.content.data;

                    self.user.roles = [];

                    if (!user.roles) user.roles = [];

                    for (var i = 0; i < user.roles.length; i++) {
                        for (var j = 0; j < self.roles.length; j++) {
                            if (user.roles[i].id == self.roles[j].id)
                                self.user.roles.push(self.roles[j]);
                        }
                    }
                }
            };

            self.errorCallback = function (response) {
                console.log(response);
                //general.data_error(response);
            };

            self.clearSearchRole = function () {
                self.searchRole = "";
            };

            self.compileStruct = function (data) {

                if (data.name == "id" ||
                    data.name == "online" ||
                    data.name == "facebook_id" ||
                    data.name == "extra"
                ) {
                    return "";
                }

                var iconSets = inputc.whIcon(data.name);
                var extra = {
                    //TO Generate Controls set
                    color: iconSets.data.color,
                    icon: iconSets.data.icon,
                    icon2: iconSets.data.icon2,
                    attr_style: "",
                    //modelObj: "urc.user",
                    model: "urc.user." + data.name,
                    model2: "urc.user." + data.name + "2",
                    searchModel: "urc.searchRole",
                    list: "urc.roles",
                    max_len: data.length,
                    form_err: "userForm['ip" + data.label + "'].$error",
                    form_err2: "userForm['ipconfirm" + data.label + "'].$error",
                    msg_exp: "'required', 'minlength', 'maxlength'",
                    //Parse Data To Component
                    onClose: 'urc.clearSearchRole()',
                    reload: 'urc.load()', //Parse function To call when Img Component Click
                    refresh: 'urc.refresh_img' //Variable Send To Sundew Img Component To Force Image To Reload Changes
                };

                return inputc.whInput(data.label, data.input_type, extra);
            };

            self.refresh_img = {};

            self.load = function () {
                self.profile = null;
                self.loadTab(2);
            };

            //Force Sundew Image Component To Change
            self.setProfile = function (data) {
                console.log(data);
                safeApply($scope, function () {
                    self.user.profile_image = angular.copy(data);
                    self.loadTab(0);
                    if (self.refresh_img.refresh) {
                        self.refresh_img.refresh({
                            selected: data
                        });
                    }
                });
            };

            //0:default, 1:role, 2:drive
            self.loadTab = function (idx) {
                self.buttonVisibility(idx);
                if (self.selectedTab == 1) {
                    self.loadRoles();
                }
                self.selectedTab = idx;
            };

            self.buttonVisibility = function (idx) {
                switch (idx) {
                    case 0:
                        self.btnActions = {
                            btnBak: false,
                            btnSelect: false,
                            btnSave: true,
                            btnRole: true
                        };
                        break;
                    case 1:
                        self.btnActions = {
                            btnBak: true,
                            btnSelect: false,
                            btnSave: false,
                            btnRole: false
                        };
                        break;
                    case 2:
                        self.btnActions = {
                            btnBak: true,
                            btnSelect: true,
                            btnSave: false,
                            btnRole: false
                        };
                        break;
                }
            };

            self.cancel = function () {
                $mdDialog.hide({
                    data: {
                        reload: true,
                        status: self.status
                    }
                });
            };

            self.answer = function () {
                //TODO: Progress
                var usr = self.collectUser();

                if (self.user.id) {
                    usr.id = self.user.id;
                    http.PUT(config.API_URL + 'users/' + self.user.id, store.HEADER(), usr, self.putCallback, self.errorCallback);
                    //TODO: Update PUT
                } else {

                    console.log(usr);
                    http.POST(config.API_URL + 'users/', store.HEADER(), usr, self.postCallback, self.errorCallback);
                }
            };

            self.putCallback = function (response) {
                console.log('postcallback', response);
                //TODO: Progress
                if (response.data.code == 202) {
                    self.init();
                    self.user = {};
                    general.success("Update Success!");

                    $mdDialog.hide({
                        data: {
                            reload: true,
                            status: self.status
                        }
                    });
                } else
                    general.error("Internal Server Error!");
                console.log(response);
            };

            self.postCallback = function (response) {
                console.log('postcallback', response);
                //TODO: Progress
                if (response.data.code == 201) {
                    self.init();
                    self.user = {};
                    general.success("Insert Success!");
                } else
                    general.error("Internal Server Error!");
                console.log(response);
            };

            self.collectUser = function () {
                var usr = {
                    "email": self.user.email,
                    "display_name": self.user.display_name,
                    "roles": [],
                    "password": self.user.password,
                    "status": "I",
                };

                if (self.user.roles) {
                    angular.forEach(self.user.roles, function (value, key) {
                        delete value["&detail_link"];
                        usr.roles.push({
                            "id": value.id
                        });
                    });
                }

                if (self.user.profile_image) {
                    usr.profile_image = {
                        "id": self.user.profile_image.id
                    };
                    //delete usr.profile_image["&file_links"];
                    //delete usr.profile_image.fileIc;
                }

                if (self.user.status)
                    usr.status = "A";

                if (usr.profile_image.id === undefined)
                    usr.profile_image.id = 0;

                console.log(usr);
                return usr;
            };

            self.init();
        }
    ]);
})();