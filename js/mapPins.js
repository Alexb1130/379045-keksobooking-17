'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin').content;

  var generatePins = function (data) {

    var mapPins = data.map(function (item, index) {
      var pin = pinTemplate.querySelector('.map__pin').cloneNode(true);
      pin.dataset.user = index;
      var avatar = pin.querySelector('img');
      pin.style.left = item.location.x + 'px';
      pin.style.top = item.location.y + 'px';
      avatar.src = item.author.avatar;
      avatar.alt = item.offer.type;

      return pin;
    });

    mapPins.slice(0, 5).forEach(function (pin) {
      fragment.appendChild(pin);
    });

    return fragment;

  };

  window.mapPins = {
    generatePins: generatePins
  };

})();
