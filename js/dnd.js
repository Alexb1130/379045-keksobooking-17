'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var pins = window.generatePins();
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var addressField = document.querySelector('#address');

  var MAIN_PIN_HEIGHT = mainPin.offsetHeight;
  var MAIN_PIN_WIDTH = mainPin.offsetWidth;
  var MAP_WIDTH = mapPins.offsetWidth;
  var MAIN_PIN_SHARP_END = 20;
  var OFFSET = 10;
  var MIN_Y_COORD = 130;
  var MAX_Y_COORD = 630;
  var MIN_X_COORD = 0;
  var MAX_X_COORD = MAP_WIDTH - MAIN_PIN_WIDTH;

  function onActiveState() {
    window.disableFields(false);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapPins.appendChild(pins);
  }

  // form
  function onSetPinCoodrs() {
    var currentPinX = parseInt(mainPin.offsetLeft + (MAIN_PIN_WIDTH / 2), 10);
    var currentPinY = parseInt(mainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_SHARP_END, 10);

    addressField.value = currentPinX + ', ' + currentPinY;
  }

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      // main
      onActiveState();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetLeft <= MIN_X_COORD) {
        mainPin.style.left = OFFSET + 'px';
      } else if (mainPin.offsetLeft >= MAX_X_COORD) {
        mainPin.style.left = MAX_X_COORD - OFFSET + 'px';
      } else if (mainPin.offsetTop <= MIN_Y_COORD) {
        mainPin.style.top = MIN_Y_COORD + 'px';
      } else if (mainPin.offsetTop >= MAX_Y_COORD) {
        mainPin.style.top = MAX_Y_COORD + 'px';
      }

      mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
      mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    document.addEventListener('mouseup', onSetPinCoodrs);

  });

})();
