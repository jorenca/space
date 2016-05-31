'use strict';

angular.module('space.toolbox').controller('AddStaticCtrl', function ($scope, bodyFactory) {
  $scope.newObj = {
    pos: {
      x: 0,
      y: 10,
      z: 0
    },
    radius: 1,
    mass: 1
  };

  $scope.add = function (model) {
    bodyFactory.create(model);
  };
});
