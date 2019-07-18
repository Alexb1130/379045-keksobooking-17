'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin').content;
  var pins = null;

  var clearPins = function () {
    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {
      pin.remove();
    });
  };

  var generatePins = function (data) {

    var mapPins = data.map(function (dataItem) {
      var pin = pinTemplate.querySelector('.map__pin').cloneNode(true);
      pin.dataset.user = dataItem.location.x;
      var avatar = pin.querySelector('img');
      pin.style.left = dataItem.location.x + 'px';
      pin.style.top = dataItem.location.y + 'px';
      avatar.src = dataItem.author.avatar;
      avatar.alt = dataItem.offer.type;

      return pin;
    });

    mapPins.forEach(function (pin) {
      fragment.appendChild(pin);
    });

    return fragment;

  };

  window.mapPins = {
    pins: pins,
    generatePins: generatePins,
    clearPins: clearPins
  };

})();
