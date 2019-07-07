'use strict';

(function () {

  var getRandomIndexArr = function (arr) {
    return window.utils.generateRandomInt(0, arr.length - 1);
  };

  var generateRandomInt = function (min, max) {
    var length = max - min + 1;
    return Math.floor(Math.random() * length + min);
  };

  var getRandomElementArr = function (arr) {
    return arr[getRandomIndexArr(arr)];
  };

  var onActiveState = function (mapEl, formEl, activate) {
    mapEl.classList.remove('map--faded');
    formEl.classList.remove('ad-form--disabled');
    activate();
  };

  window.utils = {
    generateRandomInt: generateRandomInt,
    getRandomElementArr: getRandomElementArr,
    onActiveState: onActiveState
  };

})();
