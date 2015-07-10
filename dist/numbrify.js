(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("Numbrify", ["exports", "module"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.Numbrify = mod.exports;
  }
})(this, function (exports, module) {
  /**
   * Numbrify converts number-like strings like "123" in an object
   * or array into actual numbers (like 123), while leaving non numerical
   * variables as is.
   *
   * It is basically a helper for iteratively calling parseInt/parseFloat/Number
   * over a collection where you do not expect all of them to be convertible
   *
   * @param {[type]} object the object/array to numbrify
   * @param {boolean} deep do a deep traversal of object when numbrifying
   *
   * @return a copy of the object/array with the converted properties.
   */
  "use strict";

  module.exports = Numbrify;

  function Numbrify(object) {
    var result;
    var potential;
    if (Array.isArray(object)) {
      result = [];
    } else if (Object.prototype.toString.call(object) === "[object Object]") {
      result = {};
    } else {
      if (typeof object === "string") {
        return toNumber(object);
      } else {
        return object;
      }
    }

    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        potential = Number(object[prop]);
        if (isNaN(potential)) {
          result[prop] = object[prop];
        } else {
          result[prop] = potential;
        }
      }
    }
    return result;
  }

  function toNumber(object) {
    var potential = Number(object);
    if (isNaN(potential)) {
      return object;
    } else {
      return potential;
    }
  }
});
