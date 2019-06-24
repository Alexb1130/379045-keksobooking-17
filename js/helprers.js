'use strict';

function generateRandomInt(min, max) {
  var length = max - min + 1;
  return Math.floor(Math.random() * length + min);
}

function getRandomIndexArr(arr) {
  return generateRandomInt(0, arr.length - 1);
}

function getRandomElementArr(arr) {
  return arr[getRandomIndexArr(arr)];
}
