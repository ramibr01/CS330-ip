/* jshint esversion: 6 */
/* jshint node: true */
'use strict';


async function getData(url) {
    console.log(url);
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
}

async function start() {
    let num = parseInt(document.getElementById('number').value);
    let [numM1fact, numfact, numP1fact] = await Promise.all([
          getData(`http://numbersapi.com/${num-1}?json`),
          getData(`http://numbersapi.com/${num}?json`),
          getData(`http://numbersapi.com/${num+1}?json`)
    ]);

    let numMinusOneDiv = document.querySelector('#numM1fact');
    numMinusOneDiv.classList.add('container', 'border', 'border-dark', 'rounded', 'mt-3');

    let numDiv = document.querySelector('#numfact');
    numDiv.classList.add('container', 'border', 'border-dark', 'rounded', 'mt-3');

    let numPlusOneDiv = document.querySelector('#numP1fact');
    numPlusOneDiv.classList.add('container', 'border', 'border-dark', 'rounded', 'mt-3');

    let numberFact1 = numM1fact.text;
    let numberFact2 = numfact.text;
    let numberFact3 = numP1fact.text;

    numMinusOneDiv.innerHTML = numberFact1;
    numDiv.innerHTML = numberFact2;
    numPlusOneDiv.innerHTML = numberFact3;
}