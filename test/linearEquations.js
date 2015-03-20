var le = require('../lib/linearEquations');
var eq = require('../lib/number').nearlyEqual;
var assert = require('assert');

var e = 1e-6;

describe('linearEquations.columnPivot(a, b)', function(){
  it('test common linear equations [1]', function(){
    var a = [
      [-3,  2, 6],
      [10, -7, 0],
      [ 5, -1, 5]
    ];
    
    var b = [4,  7, 6];
    var s = [0, -1, 1];
    
    var res = le.columnPivot(a, b);

    for(var i = 0, l = b.length; i < l; i++){
      assert.ok(eq(s[i], res.value[i], e));
    }
  });
  
  it('test common linear equations [2]', function(){
    var a = [
      [8, -1,  1],
      [2, 10, -1],
      [1,  1, -5]
    ];
    
    var b = [8, 11, -3];
    var s = [1,  1,  1];
    
    var res = le.columnPivot(a, b); 
    for(var i = 0, l = b.length; i < l; i++){
      assert.ok(eq(s[i], res.value[i], e));
    }
  });
    
  it('test ill-conditioned equations [1]', function(){
    var a = [
      [1,      1],
      [1, 1.0001],
    ];
    
    var b = [2, 2];
    var s = [2, 0];
    
    var res = le.columnPivot(a, b); 
    for(var i = 0, l = b.length; i < l; i++){
      assert.ok(eq(s[i], res.value[i], e));
    }
  });
  
  it('test ill-conditioned equations [2]', function(){
    var a = [
      [1,      1],
      [1, 0.9999],
    ];
    
    var b = [2, 1.9999];
    var s = [1,      1];
    
    var res = le.columnPivot(a, b); 
    for(var i = 0, l = b.length; i < l; i++){
      assert.ok(eq(s[i], res.value[i], e));
    }
  });
  
  it('test coefficient matrix or constant vector not array, length not equal or !>= 1.', function(){ 
    var a = [
      [8, -1,  1],
      [2, 10, -1]
    ];
    
    var b = [8, 11, -3];
    var res;
    
    res = le.columnPivot();
    assert.ok(!!res.error);
    
    res = le.columnPivot(undefined, b);
    assert.ok(!!res.error);
    
    res = le.columnPivot(a);
    assert.ok(!!res.error);
    
    res = le.columnPivot(a, b);
    assert.ok(!!res.error);
    
    res = le.columnPivot([], []);
    assert.ok(!!res.error);
  });
  
  it('test coefficient matrix row not array.', function(){
    var a = [
      [1]
    ];
    
    var a1 = [1];
    var b = [1];
    var s = [1];
    var res;
    
    res = le.columnPivot(a, b);
    assert.ok(eq(s[1], res.value[1], e));
    
    res = le.columnPivot(a1, b);
    assert.ok(!!res.error);
  });
  
  it('test coefficient matrix element is not number', function(){  
    var a = [
      [8, '-1',  1],
      ['2', 10, -1],
      [1,  1, -5]
    ];
    
    var b = [8, '11', '-3'];
    var s = [1,  1,  1];
    var res;
    
    res = le.columnPivot(a, b);
    for(var i = 0, l = b.length; i < l; i++){
      assert.ok(eq(s[i], res.value[i], e));
    }
    
    var a1 = [
      [8, 'a-1',  1],
      ['2', 10, -1],
      [1,  1, -5]
    ];
    
    res = le.columnPivot(a1, b);
    assert.ok(!!res.error);
    
    var a2 = [
      [8, '-1',  1],
      ['a2', 10, -1],
      [1,  1, -5]
    ];
    
    res = le.columnPivot(a2, b);
    assert.ok(!!res.error);
    
    var a3 = [
      [8, '-1',  1],
      ['2', 10, -1],
      [,  1, -5]
    ];
    
    res = le.columnPivot(a3, b);
    assert.ok(!!res.error);
    
    var a4 = [
      [8, '-1',],
      ['2', 10, -1],
      [1,  1, -5]
    ];
    
    res = le.columnPivot(a4, b);
    assert.ok(!!res.error);
  });
  
  it('test constant vector element is not number', function(){
    var a = [
      [8, -1,  1],
      [2, 10, -1],
      [1,  1, -5]
    ];
    
    var b = [8, '11', 'a-3'];
    var res;
    
    res = le.columnPivot(a, b);
    assert.ok(!!res.error);
    
    var b1 = [ , '11', '-3'];
    res = le.columnPivot(a, b1);
    assert.ok(!!res.error);
  });
});

describe('linearEquations.completePivot(a, b)', function(){
  it('test common linear equations [1]', function(){
    var a = [
      [-3,  2, 6],
      [10, -7, 0],
      [ 5, -1, 5]
    ];
    
    var b = [4,  7, 6];
    var s = [0, -1, 1];
    
    var res = le.completePivot(a, b);
      
    for(var i = 0, l = b.length; i < l; i++){
      assert.ok(eq(s[i], res.value[i], e));
    }
  });
    
  it('test common linear equations [2]', function(){
    var a = [
      [8, -1,  1],
      [2, 10, -1],
      [1,  1, -5]
    ];
    
    var b = [8, 11, -3];
    var s = [1,  1,  1];
    
    var res = le.completePivot(a, b);
      
    for(var i = 0, l = b.length; i < l; i++){
      assert.ok(eq(s[i], res.value[i], e));
    }
  });
  
  it('test ill-conditioned equations [1]', function(){
    var a = [
      [1,      1],
      [1, 1.0001],
    ];
    
    var b = [2, 2];
    var s = [2, 0];
    
    var res = le.completePivot(a, b); 
    for(var i = 0, l = b.length; i < l; i++){
      assert.ok(eq(s[i], res.value[i], e));
    }
  });
  
  it('test ill-conditioned equations [2]', function(){
    var a = [
      [1,      1],
      [1, 0.9999],
    ];
    
    var b = [2, 1.9999];
    var s = [1,      1];
    
    var res = le.completePivot(a, b); 
    for(var i = 0, l = b.length; i < l; i++){
      assert.ok(eq(s[i], res.value[i], e));
    }
  });
  
  it('test coefficient matrix or constant vector not array, length not equal or !>= 1.', function(){ 
    var a = [
      [8, -1,  1],
      [2, 10, -1]
    ];
    
    var b = [8, 11, -3];
    var res;
    
    res = le.completePivot();
    assert.ok(!!res.error);
    
    res = le.completePivot(undefined, b);
    assert.ok(!!res.error);
    
    res = le.completePivot(a);
    assert.ok(!!res.error);
    
    res = le.completePivot(a, b);
    assert.ok(!!res.error);
    
    res = le.completePivot([], []);
    assert.ok(!!res.error);
  });
  
  it('test coefficient matrix row not array.', function(){
    var a = [
      [1]
    ];
    
    var a1 = [1];
    var b = [1];
    var s = [1];
    var res;
    
    res = le.completePivot(a, b);
    assert.ok(eq(s[1], res.value[1], e));
    
    res = le.completePivot(a1, b);
    assert.ok(!!res.error);
  });
  
  it('test coefficient matrix element is not number', function(){  
    var a = [
      [8, '-1',  1],
      ['2', 10, -1],
      [1,  1, -5]
    ];
    
    var b = [8, '11', '-3'];
    var s = [1,  1,  1];
    var res;
    
    res = le.completePivot(a, b);
    for(var i = 0, l = b.length; i < l; i++){
      assert.ok(eq(s[i], res.value[i], e));
    }
    
    var a1 = [
      [8, 'a-1',  1],
      ['2', 10, -1],
      [1,  1, -5]
    ];
    
    res = le.completePivot(a1, b);
    assert.ok(!!res.error);
    
    var a2 = [
      [8, '-1',  1],
      ['a2', 10, -1],
      [1,  1, -5]
    ];
    
    res = le.completePivot(a2, b);
    assert.ok(!!res.error);
    
    var a3 = [
      [8, '-1',  1],
      ['2', 10, -1],
      [,  1, -5]
    ];
    
    res = le.completePivot(a3, b);
    assert.ok(!!res.error);
    
    var a4 = [
      [8, '-1',],
      ['2', 10, -1],
      [1,  1, -5]
    ];
    
    res = le.completePivot(a4, b);
    assert.ok(!!res.error);
  });
  
  it('test constant vector element is not number', function(){
    var a = [
      [8, -1,  1],
      [2, 10, -1],
      [1,  1, -5]
    ];
    
    var b = [8, '11', 'a-3'];
    var res;
    
    res = le.completePivot(a, b);
    assert.ok(!!res.error);
    
    var b1 = [ , '11', '-3'];
    res = le.completePivot(a, b1);
    assert.ok(!!res.error);
  });
});