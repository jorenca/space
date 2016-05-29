'use strict';

// Declare app level module which depends on views, and components
angular.module('space', [
  'space.toolbox',
  'ngRoute'
])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/toolbox/add', {
    templateUrl: 'toolbox/templates/addStatic.html',
    controller: 'AddStaticCtrl'
  });
}]);
