var number = require('../lib/number');
var assert = require('assert');

describe('number.isInteger(value)', function() {
  it('test number.isInteger(value)', function() {
    assert.equal(number.isInteger(1), true);
    assert.equal(number.isInteger(3), true);
    assert.equal(number.isInteger(-4), true);
    assert.equal(number.isInteger(0), true);
    assert.equal(number.isInteger(12000), true);
    assert.equal(number.isInteger(-3000), true);

    assert.equal(number.isInteger(1.1), false);
    assert.equal(number.isInteger(0.1), false);
    assert.equal(number.isInteger(-2.3), false);
    assert.equal(number.isInteger(-2.3), false);
    assert.equal(number.isInteger(NaN), false);
  });
});
  
describe('number.nearlyEqual(x, y, epsilon)', function () {
  it('should test whether two numbers are nearly equal', function () {
    var epsilon = 1e-2;

    assert.equal(number.nearlyEqual(1, 0.9, epsilon), false);
    assert.equal(number.nearlyEqual(1, 0.95, epsilon), false);
    assert.equal(number.nearlyEqual(1, 0.98, epsilon), false);
    // false ???
    assert.equal(number.nearlyEqual(1, 0.99, epsilon), false);
    assert.equal(number.nearlyEqual(1, 0.991, epsilon), true);
    assert.equal(number.nearlyEqual(1, 1.1, epsilon), false);
    assert.equal(number.nearlyEqual(1, 1.05, epsilon), false);
    assert.equal(number.nearlyEqual(1, 1.02, epsilon), false);
    assert.equal(number.nearlyEqual(1, 1.01, epsilon), true);
    assert.equal(number.nearlyEqual(1, 1, epsilon), true);

    // smaller epsilon
    var epsilon2 = 1e-4;
    assert.equal(number.nearlyEqual(1, 0.99, epsilon2), false);
    assert.equal(number.nearlyEqual(1, 0.999, epsilon2), false);
    assert.equal(number.nearlyEqual(1, 0.9999, epsilon2), true);

    // test one of these famous round-off errors
    assert.equal((0.1+0.2) == 0.3, false);
    assert.equal(number.nearlyEqual(0.1+0.2, 0.3, 1e-14), true);
  });

  it('should test whether a positive and negative number are nearly equal', function () {
    var epsilon = 1e-3;
    assert.equal(number.nearlyEqual( 1.2,  1.2, epsilon), true);
    assert.equal(number.nearlyEqual( 1.2, -1.2, epsilon), false);
    assert.equal(number.nearlyEqual(-1.2,  1.2, epsilon), false);
    assert.equal(number.nearlyEqual(-1.2, -1.2, epsilon), true);
  });

  it('should test whether two large numbers are nearly equal', function () {
    var epsilon = 1e-2;
    assert.equal(number.nearlyEqual(1e200, 0.90e200, epsilon), false);
    assert.equal(number.nearlyEqual(1e200, 0.95e200, epsilon), false);
    assert.equal(number.nearlyEqual(1e200, 0.98e200, epsilon), false);
    assert.equal(number.nearlyEqual(1e200, 0.99e200, epsilon), true);
  });

  it('should test whether two small numbers are nearly equal (always true)', function () {
    var epsilon = 1e-2;
    assert.equal(number.nearlyEqual(1e-200, 0.99e-200, epsilon), true);
    assert.equal(number.nearlyEqual(1e-200, 10e-200, epsilon), true);
  });

  it('should compare with zero', function () {
    var epsilon = 1e-3;
    var num = 2.66453591003756e-7;
    assert.equal(number.nearlyEqual(0, 0, epsilon), true);
    assert.equal(number.nearlyEqual(0, -0, epsilon), true);
    assert.equal(number.nearlyEqual(0, 1.2, epsilon), false);
    assert.equal(number.nearlyEqual(0, 1e30, epsilon), false);
    assert.equal(number.nearlyEqual(0, 1e-30, epsilon), true);
    assert.equal(number.nearlyEqual(0, -1e-30, epsilon), true);
    assert.equal(number.nearlyEqual(0, num, 1e-6), true);
    assert.equal(number.nearlyEqual(0, -num, 1e-6), true);
  });

  it('should compare with Infinity', function () {
    var epsilon = 1e-3;

    assert.equal(number.nearlyEqual(1.2, Infinity, epsilon), false);
    assert.equal(number.nearlyEqual(Infinity, 1.2, epsilon), false);
    assert.equal(number.nearlyEqual(Infinity, Infinity, epsilon), true);
    assert.equal(number.nearlyEqual(Infinity, -Infinity, epsilon), false);
    assert.equal(number.nearlyEqual(-Infinity, Infinity, epsilon), false);
    assert.equal(number.nearlyEqual(-Infinity, -Infinity, epsilon), true);
  });

  it('should compare with NaN', function () {
    var epsilon = 1e-3;
    assert.equal(number.nearlyEqual(1.2, NaN, epsilon), false);
    assert.equal(number.nearlyEqual(NaN, 1.2, epsilon), false);
    assert.equal(number.nearlyEqual(NaN, NaN, epsilon), false);
  });

  it('should do exact comparison when epsilon is null or undefined', function () {
    assert.equal(number.nearlyEqual(1.2, 1.2), true);
    assert.equal(number.nearlyEqual(1.2, 1.2, null), true);

    assert.equal(number.nearlyEqual(0.1 + 0.2, 0.3), false);
    assert.equal(number.nearlyEqual(0.1 + 0.2, 0.3, null), false);
  });
});