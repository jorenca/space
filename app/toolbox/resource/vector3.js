'use strict'

angular.module('space.toolbox').factory('Vector3', function () {
  var make = function (x, y, z) {
    return {
      x: x,
      y: y,
      z: z,
      distTo: function (o) {
        return Math.sqrt(
          (this.x - o.x)*(this.x - o.x) +
          (this.y - o.y)*(this.y - o.y) +
          (this.z - o.z)*(this.z - o.z)
        )
      },
      add: function (o) {
        this.x += o.x;
        this.y += o.y;
        this.z += o.z;
        return this;
      },
      sub: function (o) {
        this.x -= o.x;
        this.y -= o.y;
        this.z -= o.z;
        return this;
      },
      mul: function (x) {
        return make(this.x * x, this.y * x, this.z * x);
      },
      div: function (x) {
        return make(this.x / x, this.y / x, this.z / x);
      }
    };
  };

  return make;
});
