'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin').content;

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

    var mapPinsCopy = mapPins.slice(0, 5);

    mapPinsCopy.forEach(function (pin) {
      fragment.appendChild(pin);
    });

    return fragment;

  };

  window.mapPins = {
    generatePins: generatePins
  };

})();
