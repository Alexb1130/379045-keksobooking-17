'use strict';

(function () {
  var OFFERS = ['bungalo', 'flat', 'house', 'palace'];
  var MAX_PIN_LOCATION = document.querySelector('.map__pins').offsetWidth;
  var PIN_WIDTH = 50;

  var generateObj = function (i) {
    return {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: window.utils.getRandomElementArr(OFFERS)
      },
      location: {
        x: window.utils.generateRandomInt(0, (MAX_PIN_LOCATION - PIN_WIDTH)),
        y: window.utils.generateRandomInt(130, 630)
      }
    };
  };

  window.generateArrFeatures = function (number) {

    var arrFeatures = [];

    for (var i = 1; i <= number; i++) {
      arrFeatures.push(generateObj(i));
    }

    return arrFeatures;
  };

})();
