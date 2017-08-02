(function () {
    'use strict';

    angular.module('SundewApp.Controllers').controller('MainCtrl', [
        '$scope', '$location', '$rootScope', '$log', '$timeout', '$interval', '$mdSidenav', 'menu', 'config', 'route',
        function ($scope, $location, $rootScope, $log, $timeout, $interval, $mdSidenav, menu, config, route) {
            var mc = this;
            //Variables
            mc.config = config;
            mc.menu = menu;
            mc.childMenu = {};
            mc.menu_toggle = true;
            //Loaded Navs
            mc.menu_navs = [];
            //View Tab
            mc.selectedTab = -1;

            mc.init = function () {
                mc.loadingControl = true;
                mc.menu_navs = [];
                mc.selectedTab = -1;
            };

            //Load Sub, child menus
            mc.load_child = function (cm) {
                /*Toggle Menu Section To Hide Or Not*/
                if (mc.menu_toggle)
                    mc.menu_toggle = !mc.menu_toggle;
                else if (!mc.menu_toggle && mc.childMenu == cm)
                    mc.menu_toggle = !mc.menu_toggle;

                mc.childMenu = cm;

                mc.prepareNav(mc.childMenu.pages);
            };

            mc.prepareNav = function (pages) {
                for (var i = 0; i < pages.length; i++) {
                    if (pages[i].type == "toggle") {
                        mc.prepareNav(pages[i].pages);
                    } else {
                        pages[i].addNav = mc.addNav;
                    }
                }
            };

            //Old Menu Handling <continue to use or not>
            /*mc.autoFocusContent = false;

            mc.status = {
                isFirstOpen: true,
                isFirstDisabled: false
            };
            */

            //Menu toggling
            mc.isOpen = function (section) {
                return mc.menu.isSectionSelected(section);
            };

            mc.toggleOpen = function (section) {
                mc.menu.toggleSelectSection(section);
            };

            //Nav Bar Nav Add
            mc.addNav = function (nav) {
                var idx = searchNav(nav);
                //Don't Continute When Exist
                if (idx === null) {
                    //Retrieve Route
                    var vwData = route.validateView(nav.state);
                    //Add To Loaded Nav Menu
                    mc.menu_navs.push({
                        name: nav.name,
                        icon_mi: nav.icon_mi,
                        state: nav.state,
                        func: nav.addNav,
                        template: vwData.templateUrl,
                        controller: vwData.controller,
                        controllerAs: vwData.controllerAs
                    });
                    mc.selectedTab = mc.menu_navs.length - 1;
                    //An Ugly work around for selectedTab to update. XD
                    //Set selectedTab to SelectedTab
                    mc.selectedTab = mc.selectedTab;
                } else
                    mc.nav_click(nav);
            };

            mc.nav_click = function (nav) {
                var idx = searchNav(nav);
                if (idx !== null) {
                    $location.path(nav.state.replace("#", ""));
                    mc.selectedTab = idx;
                    //An Ugly work around for selectedTab to update. XD
                    //Set selectedTab to SelectedTab
                    mc.selectedtab = mc.selectedtab;
                }
            };

            function searchNav(nav) {
                var idx = null;
                mc.menu_navs.forEach(function (item, $i) {
                    if (item.name === nav.name &&
                        item.state == nav.state) {
                        idx = $i;
                    }
                });
                return idx;
            }

            //Nav Bar Nav Remove
            mc.close_click = function (nav) {
                var idx = searchNav(nav);

                if (idx !== null)
                    mc.menu_navs.splice(idx, 1);
            };

            mc.getClass = function (path) {
                return ('#' + $location.path().substr(0, path.length) === path) ? 'active' : '';
            };

            //Initializing
            mc.init();
        }
    ]);
})();