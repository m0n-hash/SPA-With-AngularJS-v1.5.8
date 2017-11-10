(function () {
    'use strict';

    angular.module('SundewApp.Controllers').controller('MenuCtrl', [
        '$scope', '$location', 'http', 'config', 'store', 'general', '$mdDialog',
        function ($scope, $location, http, config, store, general, $mdDialog) {
            var self = this;
            self.selectedMenu = {
                icon_label: "Blank Icon"
            };

            self.init = function () {
                console.log(self.locationData);

                http.GET(config.API_URL + "menus/struct", store.HEADER(), self.struct_callback, self.err_callback);
            };

            self.struct_callback = function (response) {
                console.log(response);
            };

            self.err_callback = function (response) {
                console.log(response);
            };

            /**Ico */
            self.remove = function () {
                self.selectedMenu.icon = null;
                self.selectedMenu.icon_label = "Blank Icon";
            };

            self.isHide = function () {
                console.log(self.selectedMenu.icon);
                if (self.selectedMenu.icon === undefined || self.selectedMenu.icon === null) return true;
                else return false;
            };

            self.open_icodialog = function (ev) {
                $mdDialog.show({
                        controller: "MiconDialogCtrl as idc",
                        templateUrl: 'app/core/components/sundew-micon.dialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        fullscreen: $scope.customFullscreen
                    })
                    .then(function (data) {
                        console.log(data);
                        if (!data)
                            return;
                        self.selectedMenu.icon = data.selected.class;
                        self.selectedMenu.icon_label = data.selected.label;
                    }, function () {});
            };

            self.locationData = [{
                name: 'Test1',
                icon: 'test',
                type: 'module',
                priority: 0,
                children: [{
                    id: 1,
                    name: 'Smashburger',
                    description: 'texas Austin north',
                    state: 'state 1',
                    icon: 'icon 1',
                    type: 'toggle',
                    priority: 0,
                    separator: true,
                    children: [{
                            id: 1,
                            name: 'Item One',
                            description: 'One',
                            state: 'state 1',
                            icon: 'icon 1',
                            type: 'link',
                            priority: 0,
                            separator: true,
                        },
                        {
                            id: 2,
                            name: 'Item two',
                            description: 'two',
                            state: 'state 2',
                            icon: 'icon 2',
                            type: 'link',
                            priority: 1,
                            separator: true,
                        },
                        {
                            id: 3,
                            name: 'Item Three',
                            description: 'three',
                            state: 'state 3',
                            icon: 'icon 3',
                            type: 'link',
                            priority: 2,
                            separator: true,
                        }

                    ]
                }, {
                    id: 2,
                    name: 'Crashpizza',
                    description: 'newyork power south',
                    state: 'state 2',
                    icon: 'icon 2',
                    type: 'toggle',
                    priority: 1,
                    separator: true,
                    children: [{
                            id: 1,
                            name: 'Item One',
                            price: '12.00',
                            description: 'two one',
                            state: 'state 1',
                            icon: 'icon 1',
                            type: 'link',
                            priority: 0,
                            separator: true,
                        },
                        {
                            id: 2,
                            name: 'Item two',
                            description: 'two two',
                            state: 'state 2',
                            icon: 'icon 2',
                            type: 'link',
                            priority: 1,
                            separator: true,
                        },
                        {
                            id: 3,
                            name: 'Item Three',
                            description: 'two three',
                            state: 'state 3',
                            icon: 'icon 3',
                            type: 'link',
                            priority: 2,
                            separator: true,
                        }

                    ]
                }]
            }, {
                name: 'Test2',
                icon: 'test',
                type: 'module',
                priority: 1,
                children: [{
                    id: 2,
                    name: 'Smashburger',
                    description: 'texas Austin north',
                    state: 'state 2',
                    icon: 'icon 2',
                    type: 'toggle',
                    priority: 0,
                    separator: true,
                    children: [{
                            id: 1,
                            name: 'Item One',
                            description: 'One',
                            state: 'state 1',
                            icon: 'icon 1',
                            type: 'link',
                            priority: 0,
                            separator: true,
                        },
                        {
                            id: 2,
                            name: 'Item two',
                            description: 'two',
                            state: 'state 2',
                            icon: 'icon 2',
                            type: 'link',
                            priority: 1,
                            separator: true,
                        },
                        {
                            id: 3,
                            name: 'Item Three',
                            description: 'three',
                            state: 'state 3',
                            icon: 'icon 3',
                            type: 'link',
                            priority: 2,
                            separator: true,
                        }

                    ]
                }, {
                    id: 2,
                    name: 'Crashpizza',
                    description: 'newyork power south',
                    state: 'state 2',
                    icon: 'icon 2',
                    type: 'toggle',
                    priority: 1,
                    separator: true,
                    children: [{
                            id: 1,
                            name: 'Item One',
                            price: '12.00',
                            description: 'two one',
                            state: 'state 1',
                            icon: 'icon 1',
                            type: 'link',
                            priority: 0,
                            separator: true,
                        },
                        {
                            id: 2,
                            name: 'Item two',
                            description: 'two two',
                            state: 'state 2',
                            icon: 'icon 2',
                            type: 'link',
                            priority: 1,
                            separator: true,
                        },
                        {
                            id: 3,
                            name: 'Item Three',
                            description: 'two three',
                            state: 'state 3',
                            icon: 'icon 3',
                            type: 'link',
                            priority: 2,
                            separator: true,
                        }

                    ]
                }]
            }];

            self.init();
        }
    ]);
})();