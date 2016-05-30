'use strict';

angular.module('space.toolbox')
.controller('SimulationCtrl', function ($scope) {
  $scope.clearSpace = function () {
    console.log('dropping all ' + objects.length + ' objects.');
    _.each(objects, function (o) {
      o.drop();
    });
    objects = [];
  };
});
