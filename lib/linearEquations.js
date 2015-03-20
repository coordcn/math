/**
  @copyright Copyright (C) 2014 coord.cn All rights reserved. 
  @overview 高斯消元法解线性方程组
            a11*x1 + a12*x2 + ... + a1n*xn = b1
            a21*x1 + a22*x2 + ... + a2n*xn = b2
              .        .      ...     .      .
              .        .      ...     .      .
            an1*x1 + an2*x2 + ... + ann*xn = bn
  @author QianYe(coordcn@163.com)
  @reference ../paper/线性方程组求解的数值方法.ppt
             http://jingyan.baidu.com/article/39810a23e40c80b636fda63a.html
 */

/**
  @function columnPivot(a, b) 列主元
  @param a {array[array]} 系数矩阵
                          [[a11, a12, ... , a1n],
                           [a21, a22, ... , a2n],
                           [ . ,  . , ... ,  . ],
                           [ . ,  . , ... ,  . ],
                           [an1, an2, ... , ann]]
  @param b {array} 常数向量
                   [b1, b2, ... , bn]
  @return {object} {
                     value: {array} [x1, x2, ... , xn], 解向量
                     error: {string} 错误信息
                   }
 */
exports.columnPivot = function(a, b){
  var err = checkParam(a, b);
  if(err) return err;
  
  var l = b.length;
  var c = [];
  var row;
  var t1;
  var t2;
  var t3;
  
  // 消元
  for(var i = 0; i < l; i++){
    row = i;
    t1 = a[i][i];
    for(var j = i; j < l; j++){
      t2 = a[j][i];

      if(Math.abs(t2) > Math.abs(t1)){
        t1 = t2;
        row = j;
      }
    }
    
    // 无解或多解
    if(t1 == 0){
      return {error: 'The linear equations have no solution or multiple solutions.'};
    }
    
    // 换排
    if(row != i){
      t3 = a[i];
      a[i] = a[row];
      a[row] = t3;
      t3 = b[i];
      b[i] = b[row];
      b[row] = t3;
    }
    
    for(var k = i + 1; k < l; k++){
      t2 = a[k][i] / t1;
      
      for(var m = i; m < l; m++){
        a[k][m] = a[k][m] - a[i][m] * t2;
      }
      
      b[k] = b[k] - b[i] * t2;
    }
  }
  
  // 回代
  c[l - 1] = b[l - 1] / a[l - 1][l - 1];
  for(var i = l - 2; i >= 0; i--){
    t3 = 0;
    for(var j = i + 1; j < l; j++){
      t3 += a[i][j] * c[j];
    }
    c[i] = (b[i] - t3) / a[i][i];
  }
  
  return {value: c};
};

/**
  @function completePivot(a, b) 全主元
  @param a {array[array]} 系数矩阵
                          [[a11, a12, ... , a1n],
                           [a21, a22, ... , a2n],
                           [ . ,  . , ... ,  . ],
                           [ . ,  . , ... ,  . ],
                           [an1, an2, ... , ann]]
  @param b {array} 常数向量
                   [b1, b2, ... , bn]
  @return {object} {
                     value: {array} [x1, x2, ... , xn], 解向量
                     error: {string} 错误信息
                   }
 */
exports.completePivot = function(a, b){
  var err = checkParam(a, b);
  if(err) return err;
  
  var l = b.length;
  var c = [];
  var row;
  var column;
  var t1;
  var t2;
  var t3;
  
  var d = []; //存放解的实际顺序
  for(var i = 0; i < l; i++){
    d[i] = i;
  }
  
  // 消元
  for(var i = 0; i < l; i++){
    row = i;
    column = i;
    t1 = a[i][i];
    for(var j = i; j < l; j++){
      for(var n = i; n < l; n++){
        t2 = a[j][n];

        if(Math.abs(t2) > Math.abs(t1)){
          t1 = t2;
          row = j;
          column = n;
        }
      }
    }
    
    // 无解或多解
    if(t1 == 0){
      return {error: 'The linear equations have no solution or multiple solutions.'};
    }
    
    // 换排
    if(row != i){
      t3 = a[i];
      a[i] = a[row];
      a[row] = t3;
      t3 = b[i];
      b[i] = b[row];
      b[row] = t3;
    }
    
    // 换列
    if(column != i){
      for(var o = 0; o < l; o++){
        t3 = a[o][i];
        a[o][i] = a[o][column];
        a[o][column] = t3;
      }
      
      t3 = d[i];
      d[i] = d[column];
      d[column] = t3;
    }
    
    for(var k = i + 1; k < l; k++){  
      t2 = a[k][i] / t1;

      for(var m = i; m < l; m++){
        a[k][m] = a[k][m] - a[i][m] * t2;
      }
      
      b[k] = b[k] - b[i] * t2;
    }
  }
  
  // 回代
  c[l - 1] = b[l - 1] / a[l - 1][l - 1];
  for(var i = l - 2; i >= 0; i--){
    t3 = 0;
    for(var j = i + 1; j < l; j++){
      t3 += a[i][j] * c[j];
    }
    c[i] = (b[i] - t3) / a[i][i];
  }

  var r = [];
  for(var i = 0; i < l; i++){
    r[i] = c[d[i]];
  }
  
  return {value: r};
};

function checkParam(a, b){
  if(!Array.isArray(a)){
    return {error: 'The coefficient matrix[a] must be an array.(a = ' + a + ')'};
  }
  
  if(!Array.isArray(b)){
    return {error: 'The constant vector[b] must be an array.(b = ' + b + ')'};
  }
  
  if(!a.length){
    return {error: 'The coefficient matrix[a] length shall not be less than 1.(a = ' + a + ')'};
  }
  
  if(!b.length){
    return {error: 'The constant vector[b] length shall not be less than 1.(b = ' + b + ')'};
  }
  
  if(a.length != b.length){
    return {error: 'The coefficient matrix[a] and constant vector[b] length must be equal.'};
  }

  var l = b.length;
  
  for(var i = 0; i < l; i++){
    if(!a[i] || !Array.isArray(a[i])){
      return {error: 'The coefficient matrix[a] row must be array. (a[' + i + '] = ' + a[i] +')'};
    }
    
    for(var j = 0; j < l; j++){
      if(!isFinite(a[i][j])){
        return {error: 'The coefficient matrix[a] element is NaN or Infinity. (a[' + i + '][' + j + '] = ' + a[i][j] + ')'};
      }
    }
    
    if(!isFinite(b[i])){
      return {error: 'The constant vector[b] element is NaN or Infinity. (b[' + i + '] = ' + b[i] + ')'};
    }
  }
  
  return null;
}