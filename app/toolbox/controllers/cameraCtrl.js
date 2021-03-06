'use strict';

angular.module('space.toolbox')
.controller('CameraCtrl', function ($scope, $interval) {

  $scope.attachId = 0;
  $scope.scaleFactor = 10;
  $scope.objectIds = _(objects).filter({'merged': false}).map('id').value();

  $scope.attach = function (toId) {
    cameraCoords = function () {
      var tracked = _.find(objects, {'id': toId});
      if(tracked == undefined) {
        cameraCoords = null;
        return {eye: [10, 10, 10], target: [0, 0, 10]};
      }
      var normalize = Math.sqrt(tracked.nextMovement.x*tracked.nextMovement.x + tracked.nextMovement.y*tracked.nextMovement.y + tracked.nextMovement.z*tracked.nextMovement.z);
      var eye = [
        tracked.mecho.center.x - tracked.nextMovement.x*$scope.scaleFactor/normalize,
        tracked.mecho.center.y - tracked.nextMovement.y*$scope.scaleFactor/normalize,
        tracked.mecho.center.z - tracked.nextMovement.z*$scope.scaleFactor/normalize + Math.abs($scope.scaleFactor/4)
      ];
      var target = [
        tracked.mecho.center.x + tracked.nextMovement.x,
        tracked.mecho.center.y + tracked.nextMovement.y,
        tracked.mecho.center.z + tracked.nextMovement.z
      ];
      return {
        eye: eye,
        target: target
      };
    }
  };

  $scope.free = function () {
    cameraCoords = null;
  };

  $interval(function () {
    $scope.cam = {
      pos: scene.viewObject.eye,
      target: scene.viewObject.target
    };
  }, 500);
});
