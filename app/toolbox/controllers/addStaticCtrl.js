'use strict';

angular.module('space.toolbox', [])
.controller('AddStaticCtrl', function ($scope) {
  $scope.newObj = {
    pos: {
      x: 0,
      y: 0,
      z: 0
    },
    posToMecho: function () {
      return [parseInt(this.pos.x), parseInt(this.pos.y), parseInt(this.pos.z)];
    },
    radius: 1,
    mass: 1,
    gravity: {
      x: 0,
      y: 0,
      z: 0
    }
  };

  var idc = 0;
  $scope.add = function (model) {
    var object = {
      id: idc++,
      mecho: ball(model.posToMecho(), model.radius),
      mass: model.mass,
      applyMovement: function (dTime, objects) {
        var acceleration = this.acceleration(objects);
        var oldpos = this.pos();
        this.mecho.center.x += -acceleration.x * dTime;
        this.mecho.center.y += -acceleration.y * dTime;
        this.mecho.center.z += -acceleration.z * dTime;
        if(acceleration.x!=0 || acceleration.y!=0 || acceleration.z!=0) {
          console.log('acceleration', acceleration, dTime);
          console.log('new pos of', object.id, 'is', object.pos(), 'old', oldpos);
        }
      },
      pos: function () {
        return {
          x: object.mecho.center.x,
          y: object.mecho.center.y,
          z: object.mecho.center.z,
          distTo: function (o) {
            return Math.sqrt(
              (this.x - o.x)*(this.x - o.x) +
              (this.y - o.y)*(this.y - o.y) +
              (this.z - o.z)*(this.z - o.z)
            )
          },
          sub: function (o) {
            this.x -= o.x;
            this.y -= o.y;
            this.z -= o.z;
            return this;
          },
          div: function (x) {
            return {
              x: this.x / x,
              y: this.y / x,
              z: this.z / x
            };
          }
        };
      },
      distTo: function (other) {
          return this.pos().distTo(other.pos());
      },
      attraction: function (other) {
        var dist = this.distTo(other);
        return dist > 0e-2 ? G * this.mass * other.mass / dist : 0;
      },
      vectorTo: function (other) {
        var vect = this.pos().sub(other.pos());
        console.log('vectFrom', this.id, 'To', other.id, 'dist', this.distTo(other), 'res', vect.div(this.distTo(other)));
        return vect.div(this.distTo(other));
      },
      acceleration: function (objects) {
        var acceleration = {x: 0, y: 0, z: 0};
        var mass = this.mass;
        _.each(objects, function (other) {
          if(object !== other) {
            var attract = object.attraction(other);
            var vector = object.vectorTo(other); console.log('attract', attract, 'vector', vector, 'mass', mass);
            acceleration.x += attract * vector.x / mass;
            acceleration.y += attract * vector.y / mass;
            acceleration.z += attract * vector.z / mass;
          }
        });
        return acceleration;
      },
      invalid: function () {
        var pos = this.pos();
        return isNaN(pos.x) || isNaN(pos.y) || isNaN(pos.z);
      }
    };
    object.mecho.material = Mecho.RED;
    objects.push(object);
  };
});
