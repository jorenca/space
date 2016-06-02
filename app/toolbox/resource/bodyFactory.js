'use strict'

angular.module('space.toolbox').factory('bodyFactory', function (Vector3) {
  var idc = 0;
  return {
    create: function (model) {
      model = _.cloneDeep(model);
      var object = {
        id: idc++,
        mecho: ball([model.pos.x, model.pos.z, model.pos.y /*this is correct!*/], model.radius),
        trace: pencil([1, 1, 1], 6, 1.5, 1),
        mass: model.mass,
        nextMovement: Vector3(0, 0, 0),
        prepareMovement: function (dTime, objects) {
          this.nextMovement = this.acceleration(objects).mul(-dTime);  // FIXME why is there a '-' here?
        },
        applyMovement: function () {
          if(this.merged) return;
          this.mecho.center.x += this.nextMovement.x;
          this.mecho.center.y += this.nextMovement.y;
          this.mecho.center.z += this.nextMovement.z;
          this.trace.center = this.mecho.center;
        },
        pos: function () {
          return Vector3(object.mecho.center.x, object.mecho.center.y, object.mecho.center.z);
        },
        distTo: function (other) {
            return this.pos().distTo(other.pos());
        },
        merged: false,
        mergedChildren: [],
        attraction: function (other) {
          var dist = this.distTo(other);
          return G * ((this.mass / dist) * (other.mass / dist));
        },
        vectorTo: function (other) {
          return this.pos().sub(other.pos()).div(this.distTo(other));
        },
        tryMerge: function (other) {
          if (this.merged) return 2; // already merged
          if (this.distTo(other)*2 < this.mecho.width + other.mecho.width) {
            if(this.mass <= other.mass) {
              console.log('merging', this, other);
              this.merged = true;
              this.mecho.parent = other.mecho;
              this.mecho.center = [Math.min(Math.random(), 0.6)-0.3, Math.min(Math.random(), 0.6)-0.3, Math.min(Math.random(), 0.6)-0.3];
              this.trace.down = false;
              other.mergedChildren.push(this);

              console.log('adding own mV to other\'s mV.', this.motionVector, other.motionVector);
              other.motionVector.add(this.motionVector.mul(this.mass / other.mass));
              console.log('other mV is now', other.motionVector);
              this.motionVector = Vector3(0, 0, 0);
              other.mass += this.mass;
              this.mass = 0;
              return 1; // now merged
            } else {
              return other.tryMerge(this);
            }
          }
          return 0; // not merged
        },
        motionVector: model['initial'] ? Vector3(model['initial'].x, model['initial'].y, model['initial'].z) : Vector3(0, 0, 0),
        acceleration: function (objects) {
          if (!this.merged) {
            _.each(objects, function (other) {
              if (object === other || object.merged || other.merged || object.tryMerge(other) === 1) return;
              var attract = object.attraction(other);
              if(attract != 0) {
                object.motionVector.add(object.vectorTo(other).mul(attract / object.mass));
              }
            });
          }
          return this.motionVector;
        },
        invalid: function () {
          var pos = this.pos();
          return isNaN(pos.x) || isNaN(pos.y) || isNaN(pos.z);
        },
        drop: function () {
          this.mecho.visible = false;
          this.trace.down = false;
          _.each(this.mergedChildren, function(child) {
            child.drop();
          });
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
