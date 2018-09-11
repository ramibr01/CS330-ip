/* jshint esversion: 6 */
/* jshint node: true */
"use strict";

function isPrime(n) {
    for (var i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

function getNPrimes(n) {
    const primeList = [];
    let i = 2
  
    while (primeList.length < n) {
      if (isPrime(i)) {
        primeList.push(i)
      }
      i++
    } 
    return primeList;
}