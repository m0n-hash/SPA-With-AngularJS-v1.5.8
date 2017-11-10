(function () {
    'use strict';

    angular.module('SundewApp.Controllers').controller('DashboardCtrl', [
        '$scope', '$mdDialog', '$rootScope', '$log', '$timeout', '$location', 'menu',
        function ($scope, $mdDialog, $rootScope, $log, $state, $timeout, $location) {
            var self = this;
            var min = 300;
            var max = 3600;
            var mainmin = 200;
            
            

            self.init = function () {
                self.testdd = {
                    "name1": "test",
                    "extension1": "jpg"
                };
                //$scope.$parent.header("Dashboard");
                console.log('dashboard init');
            };

            self.test = function (ev) {
                console.log(self.testdd);
                console.log('Drive reloaded');

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
                        if (data.selectClick) {

                        }
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