'use strict';

// Declare app level module which depends on views, and components
angular.module('space.toolbox', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/toolbox/add', {
    templateUrl: 'toolbox/templates/addStaticTmpl.html',
    controller: 'AddStaticCtrl'
  });

  $routeProvider.when('/toolbox/simulation', {
    templateUrl: 'toolbox/templates/simulationTmpl.html',
    controller: 'SimulationCtrl'
  });

  $routeProvider.when('/toolbox/launch', {
    templateUrl: 'toolbox/templates/launchTmpl.html',
    controller: 'LaunchCtrl'
  });

  $routeProvider.when('/toolbox/cam', {
    templateUrl: 'toolbox/templates/cameraTmpl.html',
    controller: 'CameraCtrl'
  });
}]);

angular.module('space', [
  'space.toolbox'
]);
