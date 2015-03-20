/* Copyrignt (C) 2013 Qianye(hohai_wow@hotmail.com) All rights reserved. */

var util = require(util);

/* 最小二乘法拟合多项式曲线 */
exports.getCoefficient = getCoefficient;

/* 计算多项式的系数 a0 + a1 * X + a2 * Math.pow(X, 2) + ... + an * Math.pow(X, n)
 * @param x {Array} 自变量数据数组
 * @param y {Array} 应变量数据数组
 * @return {Array} 多项式系数数组
 */
function getCoefficient(x, y){
  if(!util.isArray(x) || !util.isArray(y)){
    throw Error("The first and the second argument must be an array.");
  }
  
  if(x.length != y.length){
    throw Error("The first and the second argument must be an array, their length must be equal.");
  }
  
  l = x.length
  
  if(l < 2){
    throw Error("The first and the second argument must be an array, their length must be greater than or equal to 2.");
  }
  
  var powMatrix, coefficientMatrix, constantVector;
  
  powMatrix = getPowMatrix(x);
  coefficientMatrix = getCoefficientMatrix(powMatrix);
  constantVector = getConstantVector(powMatrix, y);
  
  return getCoefficientVector(coefficientMatrix, constantVector);  
}

/* 
 * @param {Array} 应变量数据数组
 * @return {Matrix} 对应变量数据指数[0, 2*x.length - 2]运算后生成的矩阵 
 */
function getPowMatrix(x){
  var l = x.length,
      n = 2*l - 1,
      c = [],
      i, j;
  
  for(i = 0; i < n; i++){
    c[i] = [];
    for(j = 0; j < l; j++){
      c[i][j] = Math.pow(x[j], i);
    }
  }
  
  return c;
}

/* 
 * @param {Matrix} 对应变量数据指数[0, 2*x.length - 2]运算后生成的矩阵
 * @return {Matrix}  根据最小二乘法生成的系数矩阵
 */
function getCoefficientMatrix(x){
  var l = x.length,
      m = x[0].length,
      i, j,
      z = [],
      c = [];
  
  for(i = 0; i < l; i++){
    z[i] = 0;
    for(j = 0; j < m; j++){
      z[i] += x[i][j];
    }
  }
  
  for(i = 0; i < m; i++){
    c[i] = [];
    for(j = 0; j < m; j++){
      c[i][j] = z[j + i];
    }
  }

  return c;
}

/* 
 * @param {Matrix} 对应变量数据指数[0, 2*x.length - 2]运算后生成的矩阵
 * @param {Array} 应变量数据数组
 * @return {Array}  根据最小二乘法生成的常数向量
 */
function getConstantVector(x, y){
  var l = x.length,
      m = x[0].length,
      i, j,
      c = [];
  
  for(i = 0; i < m; i++){
    c[i] = 0;
    for(j = 0; j < m; j++){
      c[i] += y[j] * x[i][j];
    }
  }

  return c;
}

/* 高斯消元法求多项式系数
 * @param {Matrix} 根据最小二乘法生成的系数矩阵
 * @param {Array} 根据最小二乘法生成的常数向量
 * @param {Array} 多项式系数数组
 */
function getCoefficientVector(x, y){
  var l = y.length,
      i, j, k, m, t1, t2,
      c = [];
      
  for(i = 0; i < l; i++){
    t1 = x[i][i];
    if(t1 == 0){
      throw Error("The system of linear equations is not the only solution or no solution.");
      return null;
    }
    for(k = i + 1; k < l; k++){
      t2 = x[k][i] / t1;
      for(m = i; m < l; m++){
        x[k][m] = x[k][m] - x[i][m] * t2;
      }
      y[k] = y[k] - y[i] * t2;
    }
  }
  
  c[l - 1] = y[l - 1] / x[l - 1][l - 1];
  for(i = l - 2; i >= 0; i--){
    temp = 0;
    for(j = i + 1; j < l; j++){
      temp += x[i][j] * c[j];
    }
    c[i] = (y[i] - temp) / x[i][i];
  }
  
  return c;
}