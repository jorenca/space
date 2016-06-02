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

  $scope.time = timePassed;
  $scope.lastFlow = 0;
  $scope.setTimeFlow = function (time) {
    $scope.lastFlow = timePassed;
    timePassed = time;
  }
  $scope.pause = function () {
    timePassed ? $scope.setTimeFlow(0) : $scope.setTimeFlow($scope.lastFlow);
  }
});
