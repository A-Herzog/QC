/*
Copyright 2024 Alexander Herzog

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export {factorial, binom, calcOpCharacteristics};

/**
 * Precalculated n! values for 0! to 16!
 */
const factorialValues=[
  1,1,2,6,24,120,720,5040,40320,362880, /* 0..9 */
  3628800,39916800,479001600,6227020800,87178291200,1307674368000,20922789888000 /* 10..16 */
];

/**
 * Calculates n!.
 * @param {Number} n Parameter
 * @returns n!
 */
function factorial(n) {
  if (n>=0 && n<=factorialValues.length-1) return factorialValues[n];
  let result=1;
  for (let i=2;i<=n;i++) result*=i;
  return result;
}

/**
 * Calculates the binomial coefficient
 * @param {Number} n Number n of the binomial coefficient
 * @param {Number} k Number k of the binomial coefficient
 * @returns Returns binom(n,k)
 */
function binom(n,k) {
  let coeff=1;
  for (let i=1;i<=k;i++) coeff*=(n+1-i)/i;
  return coeff;
}

/**
 * Calculates the operation characteristics for some x values.
 * @param {Number} mode Distribution to be used (Hypergeometric=0, Binomial=1, Poisson=2)
 * @param {Number} n Number of pieces to be checked
 * @param {Number} c Maximum number of allowed defects
 * @param {Number} N Delivery size (in case of the use of the hypergeometric distribution)
 * @param {Array} xValues x values for which the operation characteristic is to be used
 * @returns
 */
function calcOpCharacteristics(mode, n, c, N, xValues) {
  const data=[];
  for (let x of xValues) {
    let y=0;
    /* P(X<=c) */
    for (let k=0;k<=c;k++) switch (mode) {
      case 0:
        const R=Math.round(N*x);
        y+=binom(R,k)*binom(N-R,n-k)/binom(N,n);
        break;
      case 1:
        y+=binom(n,k)*Math.pow(x,k)*Math.pow(1-x,n-k);
        break;
      case 2:
        const lambda=x*n;
        y+=Math.pow(lambda,k)/factorial(k)*Math.exp(-lambda);
        break;
    }
    data.push(y);
  }
  return data;
}
