'use strict';

(function () {

  var getRandomIndexArr = function (arr) {
    return window.utils.generateRandomInt(0, arr.length - 1);
  };

  window.utils = {
    generateRandomInt: function (min, max) {
      var length = max - min + 1;
      return Math.floor(Math.random() * length + min);
    },
    getRandomElementArr: function (arr) {
      return arr[getRandomIndexArr(arr)];
    },
    onActiveState: function (mapEl, formEl, activate) {
      mapEl.classList.remove('map--faded');
      formEl.classList.remove('ad-form--disabled');
      activate();
    },
  };

})();
