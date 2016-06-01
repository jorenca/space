'use strict'

angular.module('space.toolbox').factory('bodyFactory', function () {
  var idc = 0;
  return {
    create: function (model) {
      model = _.cloneDeep(model);
      var object = {
        id: idc++,
        mecho: ball([model.pos.x, model.pos.z, model.pos.y /*this is correct!*/], model.radius),
        trace: pencil([1, 1, 1], 6, 1.5, 1),
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
          if(this.merged) return;
          this.mecho.center.x += this.nextMovement.x;
          this.mecho.center.y += this.nextMovement.y;
          this.mecho.center.z += this.nextMovement.z;
          this.trace.center = this.mecho.center;
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
                z: this.z / x,
                distTo: this.distTo
              };
            }
          };
        },
        distTo: function (other) {
            return this.pos().distTo(other.pos());
        },

        merged: false,
        attraction: function (other) {
          var dist = this.distTo(other);
          return G * ((this.mass / dist) * (other.mass / dist));
        },
        vectorTo: function (other) {
          var vect = this.pos().sub(other.pos());
          return vect.div(this.distTo(other));
        },
        tryMerge: function (other) {
          if (this.merged) return 2; // already merged
          if (this.distTo(other)*2 < this.mecho.width + other.mecho.width) {
            if(this.mass <= other.mass) {
              console.log('merging', this, other);
              this.merged = true;
              this.mecho.parent = other.mecho;
              this.mecho.center = [Math.min(Math.random(), 0.6)-0.3, Math.min(Math.random(), 0.6)-0.3, Math.min(Math.random(), 0.6)-0.3];
              console.log('adding own mV to other\'s mV.', this.motionVector, other.motionVector);
              other.motionVector.x += this.motionVector.x*this.mass / other.mass;
              other.motionVector.y += this.motionVector.y*this.mass / other.mass;
              other.motionVector.z += this.motionVector.z*this.mass / other.mass;
              console.log('other mV is now', other.motionVector);
              this.motionVector = {x: 0, y: 0, z: 0};
              other.mass += this.mass;
              this.mass = 0;
              return 1; // now merged
            } else {
              other.tryMerge(this);
            }
          }
          return 0; // not merged
        },
        motionVector: model['initial'] || {x: 0, y: 0, z: 0},
        acceleration: function (objects) {
          if (this.merged) return this.motionVector;
          var motionVector = this.motionVector;
          var mass = this.mass;
          _.each(objects, function (other) {
            if (object !== other && !other.merged) {
              if(object.tryMerge(other) === 1) {
                return object.motionVector;
              }
              var attract = object.attraction(other);
              var vector = object.vectorTo(other);// console.log('vector dist', vector.distTo({x: 0, y:0, z:0}))
              if(attract != 0) {
                motionVector.x += attract * vector.x / mass;
                motionVector.y += attract * vector.y / mass;
                motionVector.z += attract * vector.z / mass;
              }
            }
          });
          return motionVector;
        },
        invalid: function () {
          var pos = this.pos();
          return isNaN(pos.x) || isNaN(pos.y) || isNaN(pos.z);
        },
        drop: function () {
          this.mecho.visible = false;
          this.trace.down = false;
        }
      };
      object.mecho.material = {color: [Math.random(), Math.random(), Math.random()]};
      //object.trace.parent = object.mecho; // FIXME MECHO pencils with parent dont trace!
      object.trace.down = false;
      object.trace.visible = false; // this is the pencil itself, not the trace
      console.log('Adding ', object);
      objects.push(object);
    }
  };
});
