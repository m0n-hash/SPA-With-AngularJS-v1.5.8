(function () {
    'use strict';

    angular.module('common.services').factory('menu', ['$location', '$rootScope', function ($location) {
        /*Menu Json*/
        var dashboardSection = {
            name: "Dashboard",
            icon_mi: "extension",
            pages: [{
                name:"Sample",
                icon_mi:"beach_access",
                type:"toggle",
                separator:false,
                pages:[{
                    name:"Customer",
                    state:"#/admin/customer",
                    icon_mi:"wc",
                    type:"link",
                    separator:true
                },{
                    name:"Dashboard",
                    state:"#/admin/dashboard",
                    icon_mi:"dashboard",
                    separator:false
                }]
            },{
                name: "User Home",
                icon_mi: "home",
                type: "toggle",
                separator: false,
                pages: [{
                    name: "Calendar",
                    state: "#/user/calendar",
                    icon_mi: "event_note",
                    type: "link",
                    separator: false
                }, {
                    name: "Cash (W/D)",
                    state: "#/user/cash",
                    icon_mi: "attach_money",
                    type: "link",
                    separator: false
                }, {
                    name: "Attendance",
                    state: "#/user/attendance",
                    icon_mi: "event_available",
                    type: "link",
                    separator: false
                }]
            }, {
                name: "Project-1",
                icon_mi: "star",
                type: "toggle",
                separator: false,
                pages: [{
                    name: "Timeline",
                    state: "#/project/timeline/1",
                    icon_mi: "event_note",
                    type: "link",
                    separator: false
                }, {
                    name: "Documents",
                    state: "#/project/documents",
                    icon_mi: "folder",
                    type: "link",
                    separator: false
                }, {
                    name: "Report",
                    state: "#/project/report",
                    icon_mi: "poll",
                    type: "link",
                    separator: false
                }]
            }]
        };

        var hrSection = {
            name: "Human Resource",
            icon_mi: "work",
            pages: [{
                name:"HR Setup",
                icon_mi:"assignment_ind",
                type:"toggle",
                separator:false,
                pages:[{
                    name:"Position",
                    state:"#/hr/position",
                    icon_mi:"dashboard",
                    separator:false
                },{
                    name:"Department",
                    state:"#/hr/department",
                    icon_mi:"assessment",
                    separator:false
                },{
                    name:"Staff Registration",
                    state:"#/hr/staff/setup",
                    icon_mi:"person",
                    separator:false
                }]
            }]
        };

        var projectSection = {
            name: "Project Manage",
            icon_mi: "cloud",
            pages: [{

            }]
        };

        var crmSection = {
            name: "CRM",
            icon_mi: "favorite",
            pages: [{

            }]
        };

        var accountSection = {
            name: "Accounting",
            icon_mi: "account_balance_wallet",
            pages: [{

            }]
        };

        var settingSection = {
            name: "Settings",
            icon_mi: "settings",
            pages: [{

            }]
        };

        var self = {
            menus: [
                dashboardSection, hrSection, projectSection, crmSection, accountSection, settingSection
            ],
            toggleSelectSection: function (section) {
                self.openSection = (self.openSection === section ? null : section);
            },
            isSectionSelected: function (section) {
                return self.openSection === section;
            },
            selectPage: function (section, page) {
                page && page.url && $location.path(page.url);
                self.currentSection = section;
                self.currentPage = page;
            }
        };

        function sortByHumanName(a, b) {
            return (a.humanName < b.humanName) ? -1 :
                (a.humanName > b.humanName) ? 1 : 0;
        }

        return self;
    }]);
})();