'use strict';

(function () {
  var OFFERS = ['bungalo', 'flat', 'house', 'palace'];
  var MAX_PIN_LOCATION = document.querySelector('.map__pins').offsetWidth;

  var generateObj = function (i) {
    return {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: window.helpers.getRandomElementArr(OFFERS)
      },
      location: {
        x: window.helpers.generateRandomInt(0, MAX_PIN_LOCATION),
        y: window.helpers.generateRandomInt(130, 630)
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
