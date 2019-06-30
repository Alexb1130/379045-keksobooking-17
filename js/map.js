'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.elements.address;
  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var activeState = false;

  var MAIN_PIN_HEIGHT = mainPin.offsetHeight;
  var MAIN_PIN_WIDTH = mainPin.offsetWidth;
  var MAP_WIDTH = mapPinsContainer.offsetWidth;
  var MAIN_PIN_SHARP_END = 20;
  var OFFSET = 20;
  var MIN_Y_COORD = 130;
  var MAX_Y_COORD = 630;
  var MIN_X_COORD = 0;
  var MAX_X_COORD = MAP_WIDTH - MAIN_PIN_WIDTH;

  var setDefaultPinCoodrs = function () {
    var currentPinX = parseInt(MAIN_PIN_HEIGHT / 2, 10);
    var currentPinY = parseInt(MAIN_PIN_WIDTH / 2, 10);

    addressField.value = currentPinX + ', ' + currentPinY;
  };

  var onSetPinCoodrs = function () {
    var currentPinX = parseInt(mainPin.offsetLeft + (MAIN_PIN_WIDTH / 2), 10);
    var currentPinY = parseInt(mainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_SHARP_END, 10);

    addressField.value = currentPinX + ', ' + currentPinY;
  };

  var preventLossMainPin = function (removeHandler) {
    if (mainPin.offsetLeft <= MIN_X_COORD) {
      mainPin.style.left = OFFSET + 'px';
      document.removeEventListener('mousemove', removeHandler);
    } else if (mainPin.offsetLeft >= MAX_X_COORD) {
      mainPin.style.left = MAX_X_COORD - OFFSET + 'px';
      document.removeEventListener('mousemove', removeHandler);
    } else if (mainPin.offsetTop <= MIN_Y_COORD) {
      mainPin.style.top = (MIN_Y_COORD + OFFSET) + 'px';
      document.removeEventListener('mousemove', removeHandler);
    } else if (mainPin.offsetTop >= MAX_Y_COORD) {
      mainPin.style.top = (MAX_Y_COORD - OFFSET) + 'px';
      document.removeEventListener('mousemove', removeHandler);
    }
  };

  var onSucces = function (mapPins) {
    mapPinsContainer.appendChild(mapPins);
  };

  var onError = function () {
    document.body.appendChild(window.card.errorMessage);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onClickMapPin = function (clickEvt) {
      var mapPin = clickEvt.target.closest('.map__pin');
      var activePin = mapPinsContainer.querySelector('.map__pin--active');

      if (mapPin && !mapPin.classList.contains('map__pin--main')) {
        if (activePin) {
          activePin.classList.remove('map__pin--active');
        }
        mapPin.classList.add('map__pin--active');
      }
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (!activeState) {
        window.utils.onActiveState(map, adForm, function () {
          window.disableFields(false);

          window.load(onSucces, onError);

          document.addEventListener('click', onClickMapPin);

        });
      }

      activeState = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      preventLossMainPin(onMouseMove);

      mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
      mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      preventLossMainPin(onMouseMove);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseup', onSetPinCoodrs);

  });

  setDefaultPinCoodrs();

})();
