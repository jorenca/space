'use strict';

angular.module('space.toolbox').controller('ObjectsCtrl', function ($scope) {
  $scope.objects = objects;

  $scope.remove = function (objectId) {
    console.log('removing ID', objectId);
    _.each(_.remove(objects, {'id': objectId}), function (removed) { removed.drop(); });
    $scope.objects = objects;
  };

  $scope.trace = function (objectId, state) {
    _.find(objects, {'id': objectId}).trace.down = state;
  };
});
