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
export default function Numbrify(object, deep = true) {
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
      var val = object[prop];
      if (deep && typeof val === 'object') {
        result[prop] = Numbrify(val);
      } else {
        result[prop] = toNumber(val);
      }

    }
  }
  return result;
}

// Helper function to convert a value into a Number
// if it can be converted to one. Will only attempt
// the conversion on strings.
function toNumber(object){
  if (typeof object !== "string") {
    return object;
  }

  var potential = Number(object);
  if (isNaN(potential)) {
    return object;
  } else {
    return potential;
  }
}
