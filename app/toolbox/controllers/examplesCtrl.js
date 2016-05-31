'use strict';

angular.module('space.toolbox')
.controller('ExamplesCtrl', function ($scope, bodyFactory) {

  $scope.scenarios = [
    {
      name: "Simple orbit",
      objects: [
        { pos: {x: 0, y: 10, z: 0}, radius: 1, mass: 100000000000 },
        { pos: {x: 0, y: 8.5, z: 8.5}, radius: 1, mass: 1000000000, initial: {x: 1.8, y: 0, z: 0} }
      ]
    },
    {
      name: "Binary pair",
      objects: [
        { pos: {x: -3, y: 11, z: 5}, radius: 1, mass: 10000000000, initial: {x: -0.4, y: 0, z: 0} },
        { pos: {x: 3, y: 9, z: -5}, radius: 1, mass: 10000000000, initial: {x: 0.4, y: 0, z: 0} }
      ]
    },
    {
      name: "Complex orbit",
      objects: [
        { pos: {x: 0, y: 10, z: 0}, radius: 1, mass: 100000000000 },
        { pos: {x: 0, y: 8.5, z: 8.5}, radius: 1, mass: 1000000000, initial: {x: 1.8, y: 0, z: 0} },
        { pos: {x: 0, y: 11, z: 15}, radius: 1, mass: 1000000000, initial: {x: 1.2, y: 0, z: 0} },
        { pos: {x: 0, y: 10, z: 25}, radius: 1, mass: 10000000000, initial: {x: 1.35, y: 0, z: 0} }
      ]
    },
  ];

  $scope.runScenario = function (scenario) {
    _.each(objects, function (o) {
      o.drop();
    });
    objects = [];

    _.each(scenario.objects, function (model) {
      bodyFactory.create(model);
    });
  };
});
