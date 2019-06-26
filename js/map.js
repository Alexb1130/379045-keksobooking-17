'use strict';

(function () {
  var OBJECTS_NUMBER = 8;

  window.generatePins = function () {
    var arrFeatures = window.generateArrFeatures(OBJECTS_NUMBER);
    var fragment = document.createDocumentFragment();
    var pinTemplate = document.querySelector('#pin').content;

    for (var i = 0; i < arrFeatures.length; i++) {
      var pin = pinTemplate.querySelector('.map__pin').cloneNode(true);
      var avatar = pin.querySelector('img');
      pin.style.left = arrFeatures[i].location.x + 'px';
      pin.style.top = arrFeatures[i].location.y + 'px';
      avatar.src = arrFeatures[i].author.avatar;
      avatar.alt = arrFeatures[i].offer.type;
      fragment.appendChild(pin);
    }
    return fragment;
  };

})();
