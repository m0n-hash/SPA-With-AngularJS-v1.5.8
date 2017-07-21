 
 angular.module('common.directives')
  .run(['$templateCache', function ($templateCache) {
      $templateCache.put('partials/menu-toggle.tmpl.html',
        '<md-button class="md-button-toggle" \n' +
        '  ng-click="toggle()"\n' +
        '  aria-controls="docs-menu-{{section.name | nospace}}"\n' +
        '  aria-expanded="{{isOpen()}}">\n' +
        '     <md-icon md-font-icon="material-icons">{{section.icon_mi}}</md-icon>'+
        '     {{section.name}}\n' +
        
        '  <span aria-hidden="true" class=" pull-right md-toggle-icon"\n' +
        '  ng-class="{\'toggled\' : isOpen()}">'+
        '     <md-icon md-font-icon="material-icons">keyboard_arrow_down</md-icon>'+
        '</span>\n' +
        '</md-button>\n' +
        '<ul ng-show="isOpen()" id="docs-menu-{{section.name | nospace}}" class="menu-toggle-list">\n' +
        '  <li ng-repeat="page in section.pages">\n' +
        '    <menu-link section="page"></menu-link>\n' +
        '    <md-divider ng-if="page.separator"></md-divider>'+
        '  </li>\n' +
        '</ul>\n' +
        '');
    }])
 .directive('menuToggle', ['$timeout', function ($timeout ) {
      return {
        scope: {
          section: '='
        },
        templateUrl: 'partials/menu-toggle.tmpl.html',
        link: function (scope, element) {
          var controller = element.parent().controller();

          scope.isOpen = function () {
            return controller.isOpen(scope.section);
          };
          scope.toggle = function () {
            controller.toggleOpen(scope.section);
          };
          
          var parentNode = element[0].parentNode.parentNode.parentNode;
          if (parentNode.classList.contains('parent-list-item')) {
            var heading = parentNode.querySelector('h2');
            element[0].firstChild.setAttribute('aria-describedby', heading.id);
          }
        }
      };
    }]);