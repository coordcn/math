/**
 * @reference https://github.com/josdejong/mathjs/blob/master/lib/util/number.js
 */

/**
 * Check if a number is integer
 * @param {Number | Boolean} value
 * @return {Boolean} isInteger
 */
exports.isInteger = function(value) {
  return (value == Math.round(value));
  // Note: we use ==, not ===, as we can have Booleans as well
};

/**
 * Minimum number added to one that makes the result different than one
 */
exports.DBL_EPSILON = Number.EPSILON || 2.2204460492503130808472633361816E-16;

/**
 * Compares two floating point numbers.
 * @param {Number} x          First value to compare
 * @param {Number} y          Second value to compare
 * @param {Number} [epsilon]  The maximum relative difference between x and y
 *                            If epsilon is undefined or null, the function will
 *                            test whether x and y are exactly equal.
 * @return {boolean} whether the two numbers are equal
*/
exports.nearlyEqual = function(x, y, epsilon) {
  // if epsilon is null or undefined, test whether x and y are exactly equal
  if (epsilon == null) return x == y;

  // use "==" operator, handles infinities
  if (x == y) return true;

  // NaN
  if (isNaN(x) || isNaN(y)) return false;

  // at this point x and y should be finite
  if(isFinite(x) && isFinite(y)) {
    // check numbers are very close, needed when comparing numbers near zero
    var diff = Math.abs(x - y);
    if (diff < exports.DBL_EPSILON) {
      return true;
    }else {
      // use relative error
      if(diff <= Math.max(Math.abs(x), Math.abs(y)) * epsilon){
        return true;
      }else{
        // 暂时解决比epsilon小的数字跟零比较的问题
        return diff <= epsilon;
      }
    }
  }

  // Infinite and Number or negative Infinite and positive Infinite cases
  return false;
};
