'use strict';

angular.module('space.toolbox')
.controller('LaunchCtrl', function ($scope, bodyFactory) {
  $scope.newObj = {
    pos: {
      x: 0,
      y: 0,
      z: 0
    },
    radius: 1,
    mass: 1,
    initial: {
      x: 1,
      y: 0,
      z: 0
    }
  };

  $scope.launch = function (model) {
      bodyFactory.create(model);
  };
});
