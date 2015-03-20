var ls = require('../lib/leastSquares');
var eq = require('../lib/number').nearlyEqual;
var assert = require('assert');

var e = 1e-6;

describe('linearEquations.columnPivot(a, b)', function(){
  it('test common linear equations [1]', function(){
    var q = [179.89, 174.64, 172.37, 168.12, 160.52, 154.04, 141.44, 136.12];
    var p = [209.82, 264.07, 287.13, 331.53, 396.51, 453.75, 596.47, 666.45];
    var n = [0.1798, 0.2018, 0.2228, 0.2518, 0.2987, 0.3327, 0.4206, 0.4676];
    var k = [ 57.16,  59.57,  60.49,  60.28,  58.03,  57.21,  54.64,  52.84];
    
    x = [0, 0.5, 1, 1.5, 2, 2.5];
    y = [0.693147, 0, -0.10536, -0.51083, -0.91629, -1.20397];
    
    var res = ls(q, k, 64);
    var val = res.value;
    
    for(var i = 0, l = qn.length; i < l; i++){
      var t = 0;
      for(var j = 0, len = val.length; j < len; j++){
        t += val[j] * Math.pow(q[i], j);
      }
      
      console.log(k[i]);
      console.log(t);
      console.log('----------');
    }
  });
});