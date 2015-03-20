/**
  @copyright Copyright (C) 2014 coord.cn All rights reserved. 
  @overview 最小二乘法拟合多项式曲线
            [注意] 使用最小二乘法拟合曲线应选择适合的曲线方程式（多项式，双曲线，指数，幂），双曲线，指数，幂可变换为多项式求解。
  @author QianYe(coordcn@163.com)
  @reference ../paper/风机性能曲线的拟合方法.pdf （第二页求正则方程组系数Sk公式有误，无须与Hi相乘）
             ../paper/曲线拟合的最小二乘法.ppt
 */

var le = require('./linearEquations');
 
/**
  @overview 最小二乘法生成多项式系数数组
  @param x {array} 自变量数组
  @param y {array} 应变量数组
  @param n {number} 多项式次数 n < 1 生成错误
  @param [m] {number} [n, m]次多项式中找出均方误差最小的多项式返回 m <= n 忽略m
  @return {object} {
                     value: {array} 多项式系数数组
                     error: {string} 错误信息
                   }
 */
module.exports = function(x, y, n, m){
  var err = checkParam(x, y, n, m);
  if(err) return err;
  
  // 直接求多项式系数
  if(!m || m <= n){
    var powerMatrix, coefficientMatrix, constantVector;
  
    powerMatrix = createPowerMatrix(x, n);
    coefficientMatrix = createCoefficientMatrix(powerMatrix, n);
    constantVector = createConstantVector(y, powerMatrix, n);
  
    return le.completePivot(coefficientMatrix, constantVector);  
  }
  
  // 在多个次方中选择均方误差最小的多项式
  
};

function leastSquares(x, y, n){
  var powerMatrix, coefficientMatrix, constantVector;
  
  powerMatrix = createPowerMatrix(x, n);
  coefficientMatrix = createCoefficientMatrix(powerMatrix, n);
  constantVector = createConstantVector(y, powerMatrix, n);
  
  var res = le.completePivot(coefficientMatrix, constantVector);

  if(res.error){
    return {error: 'Linear equations error:\n' + res.error};
  }
  
  return res;
}

/** 
  @param x {array} 自变量数组
  @param n {number} 多项式次数
  @return {array[array]} 自变量x做[0, 2n]次方指数运算生成的矩阵
 */
function createPowerMatrix(x, n){
  var l = x.length;
  var m = 2 * n;
  var c = [];
  
  for(var i = 0; i <= m; i++){
    c[i] = [];
    for(var j = 0; j < l; j++){
      c[i][j] = Math.pow(x[j], i);
    }
  }

  return c;
}

/** 
  @param p {array} 自变量x做[0, 2n]次方指数运算生成的矩阵
  @param n {number} 多项式次数
  @return {array[array]} 根据最小二乘法生成的系数矩阵
 */
function createCoefficientMatrix(p, n){
  var l = p[0].length;
  var m = 2 * n;
  var z = [];
  var c = [];
  
  for(var i = 0; i <= m; i++){
    z[i] = 0;
    for(var j = 0; j < l; j++){
      z[i] += p[i][j];
    }
  }
  
  for(var i = 0; i <= n; i++){
    c[i] = [];
    for(var j = 0; j <= n; j++){
      c[i][j] = z[j + i];
    }
  }

  return c;
}

/**
  @param y {array} 应变量数组
  @param p {array} 自变量x做[0, 2n]次方指数运算生成的矩阵
  @param n {number} 多项式次数
  @return {array[array]} 根据最小二乘法生成的常数向量
 */
function createConstantVector(y, p, n){
  var l = y.length;
  var c = [];
  
  for(var i = 0; i <= n; i++){
    c[i] = 0;
    for(var j = 0; j < l; j++){
      c[i] += y[j] * p[i][j];
    }
  }

  return c;
}

function checkParam(x, y, n, m){
  if(!Array.isArray(x)){
    return {error: 'The independent variables[x] must be an array.(x = ' + x + ')'};
  }
  
  if(!Array.isArray(y)){
    return {error: 'The dependent variables[y] must be an array.(y = ' + y + ')'};
  }
  
  if(!x.length){
    return {error: 'The independent variables[x] length shall not be less than 1.(x = ' + x + ')'};
  }
  
  if(!y.length){
    return {error: 'The dependent variables[y] length shall not be less than 1.(y = ' + y + ')'};
  }
  
  if(x.length != y.length){
    return {error: 'The independent variables[x] and dependent variables[y] length must be equal.'};
  }
  
  if(n < 1){
    return {error: 'The polynomial order[n] shall not be less than 1.'};
  }

  for(var i = 0, l = x.length; i < l; i++){
    if(!isFinite(x[i])){
      return {error: 'The independent variables[x] element is NaN or Infinity. (x[' + i + '] = ' + x[i] + ')'};
    }
    
    if(!isFinite(y[i])){
      return {error: 'The dependent variables[y] element is NaN or Infinity. (y[' + i + '] = ' + y[i] + ')'};
    }
  }
}