(function () {
  'use strict';

  angular.module('common.directives')
    .run(['$templateCache', function ($templateCache) {
      $templateCache.put('partials/menu-link.tmpl.html',
        '<md-button ng-class="getClass(\'{{section.state}}\')" ui-sref-active="active" \n' +
        '  href="{{section.state}}" ng-click="focusSection(section)">\n' +

        '<md-icon md-font-icon="material-icons">{{section.icon_mi}}</md-icon>' +

        '  {{section | humanizeDoc}}\n' +
        '  <span  class="md-visually-hidden "\n' +
        '    ng-if="isSelected()">\n' +
        '    current page\n' +
        '  </span>\n' +
        '</md-button>\n' +
        '');
    }])
    .directive('menuLink', ['$location', function ($location) {
      return {
        scope: {
          section: '='
        },
        templateUrl: 'partials/menu-link.tmpl.html',
        link: function ($scope, $element) {
          var controller = $element.parent().controller();

          $scope.focusSection = function (nav) {
            // set flag to be used later when
            // $locationChangeSuccess calls openPage()
            controller.autoFocusContent = true;
            if (nav.addNav)
              nav.addNav(nav);
          };

          $scope.getClass = function (path) {
            return ('#' + $location.path().substr(0, path.length) === path) ? 'active' : '';
          };
        }
      };
    }]);
})();