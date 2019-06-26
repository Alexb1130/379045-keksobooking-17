'use strict';

(function () {

  var getRandomIndexArr = function (arr) {
    return window.helpers.generateRandomInt(0, arr.length - 1);
  };

  window.helpers = {
    generateRandomInt: function (min, max) {
      var length = max - min + 1;
      return Math.floor(Math.random() * length + min);
    },
    getRandomElementArr: function (arr) {
      return arr[getRandomIndexArr(arr)];
    }
  };

})();
