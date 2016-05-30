'use strict'

angular.module('space.toolbox').factory('bodyFactory', function () {
  var idc = 0;
  return {
    create: function (model) {
      model = _.cloneDeep(model);
      var object = {
        id: idc++,
        mecho: ball([model.pos.x, model.pos.z, model.pos.y /*this is correct!*/], model.radius),
        mass: model.mass,
        nextMovement: {},
        prepareMovement: function (dTime, objects) {
          var acceleration = this.acceleration(objects);
          this.nextMovement = {
            x: -acceleration.x * dTime,
            y: -acceleration.y * dTime, // FIXME why is there a '-' here?
            z: -acceleration.z * dTime
          }
        },
        applyMovement: function () {
          this.mecho.center.x += this.nextMovement.x;
          this.mecho.center.y += this.nextMovement.y;
          this.mecho.center.z += this.nextMovement.z;
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
          return dist > 0e-2 ? G * this.mass * other.mass / (dist*dist) : 0;
        },
        vectorTo: function (other) {
          var vect = this.pos().sub(other.pos());
          return vect.div(this.distTo(other));
        },
        lastAcceleration: model['initial'] || {x: 0, y: 0, z: 0},
        acceleration: function (objects) {
          var acceleration = this.lastAcceleration;
          var mass = this.mass;
          _.each(objects, function (other) {
            if(object !== other) {
              var attract = object.attraction(other);
              var vector = object.vectorTo(other);
              acceleration.x += attract * vector.x / mass;
              acceleration.y += attract * vector.y / mass;
              acceleration.z += attract * vector.z / mass;
            }
          });
          return this.lastAcceleration = acceleration;
        },
        invalid: function () {
          var pos = this.pos();
          return isNaN(pos.x) || isNaN(pos.y) || isNaN(pos.z);
        },
        drop: function () {
          this.mecho.visible = false;
        }
      };
      object.mecho.material = Mecho.RED;
      console.log('Adding ', object);
      objects.push(object);
    }
  };
});
