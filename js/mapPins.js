'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin').content;

  window.generatePins = function (data) {

    for (var i = 0; i < data.length; i++) {
      var pin = pinTemplate.querySelector('.map__pin').cloneNode(true);
      var avatar = pin.querySelector('img');
      pin.style.left = data[i].location.x + 'px';
      pin.style.top = data[i].location.y + 'px';
      avatar.src = data[i].author.avatar;
      avatar.alt = data[i].offer.type;
      fragment.appendChild(pin);
    }

    return fragment;

  };

})();
