'use strict';

angular.module('space.toolbox', [])
.controller('AddStaticCtrl', function ($scope) {
  $scope.newObj = {
    pos: {
      x: 0,
      y: 0,
      z: 0
    },
    radius: 1,
    mass: 1
  };
  $scope.add = function (model) {
    var object = {
      mecho: ball([model.pos.x, model.pos.y, model.pos.z], model.radius),
      mass: model.mass
    }
    object.mecho.material = Mecho.RED;
  };
});
