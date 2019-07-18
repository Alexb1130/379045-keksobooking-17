'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.elements.address;
  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var cardContainer = document.querySelector('.map__filters-container');

  var MAIN_PIN_HEIGHT = mainPin.offsetHeight;
  var MAIN_PIN_WIDTH = mainPin.offsetWidth;
  var MAP_WIDTH = mapPinsContainer.offsetWidth;
  var MAIN_PIN_SHARP_END = 20;
  var OFFSET = 20;
  var MIN_Y_COORD = 130;
  var MAX_Y_COORD = 630;
  var MIN_X_COORD = 0;
  var MAX_X_COORD = MAP_WIDTH - MAIN_PIN_WIDTH;

  var data = new window.data.Load('GET', window.data.URL + '/data');

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

  var onSucces = function (dataObj) {
    window.data.dataItems = dataObj.slice(0, 5);
    window.mapPins.pins = window.mapPins.generatePins(window.data.dataItems);
    window.card.cards = window.card.generateCards(window.data.dataItems);
    mapPinsContainer.appendChild(window.mapPins.pins);
  };

  var onError = function () {
    window.utils.showMessage(window.utils.messages.error);

    document.addEventListener('click', function () {
      window.utils.hideMessage('.error');
      data.load(onSucces, onError);
    }, {once: true});

    document.addEventListener('keydown', function (evt) {
      window.utils.onKeydownMessage(evt, '.error');
    });
  };

  var onClickMapPin = function (clickEvt) {
    var mapPin = clickEvt.target.closest('.map__pin:not(.map__pin--main)');
    var card;
    var activePin = mapPinsContainer.querySelector('.map__pin--active');
    var activeCard = map.querySelector('.map__card--active');

    if (mapPin) {
      if (activePin && activeCard) {
        window.card.cards.appendChild(activeCard);
        activeCard.classList.remove('map__card--active');
        activePin.classList.remove('map__pin--active');
      }

      mapPin.classList.add('map__pin--active');
      card = window.card.cards.querySelector('[data-user="' + mapPin.dataset.user + '"]');
      card.classList.add('map__card--active');
      map.insertBefore(card, cardContainer);

      card.querySelector('.popup__close').addEventListener('click', function () {
        window.card.cardHidden(card);
      });

      document.addEventListener('keydown', function (e) {
        if (e.keyCode === window.utils.KEY_CODE.ESC) {
          window.card.cardHidden(card);
        }
      }, {once: true});
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (!window.utils.activePageState) {
        window.utils.activetePage(map, adForm, function () {
          window.form.disableFields(false);

          data.load(onSucces, onError);

          document.addEventListener('click', onClickMapPin);
        });
      }

      window.utils.activePageState = true;

      onSetPinCoodrs();

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

      preventLossMainPin(onMouseUp);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.KEY_CODE.ENTER && !window.utils.activePageState) {
      window.utils.activetePage(map, adForm, function () {
        window.form.disableFields(false);
        data.load(onSucces, onError);
        document.addEventListener('click', onClickMapPin);
      });
      window.utils.activePageState = true;
      onSetPinCoodrs();
    }

  });

  setDefaultPinCoodrs();

  window.map = {
    setDefaultPinCoodrs: setDefaultPinCoodrs,
  };

})();
