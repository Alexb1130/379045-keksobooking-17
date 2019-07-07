'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.elements.address;
  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var cardContainer = document.querySelector('.map__filters-container');
  var cards;
  var activeState = false;
  var MAP_WIDTH = map.offsetWidth;
  var OFFSET = 20;

  var mainPinProps = {
    height: mainPin.offsetHeight,
    width: mainPin.offsetWidth,
    maxXcoord: MAP_WIDTH - mainPin.offsetWidth,
    minXcoord: 0,
    maxYcoord: 630,
    minYcoord: 130,
    sharpEnd: 20,
  };

  var setDefaultPinCoodrs = function () {
    var currentPinX = parseInt(mainPinProps.height / 2, 10);
    var currentPinY = parseInt(mainPinProps.width / 2, 10);

    addressField.value = currentPinX + ', ' + currentPinY;
  };

  var onSetPinCoodrs = function () {
    var currentPinX = parseInt(mainPin.offsetLeft + (mainPinProps.width / 2), 10);
    var currentPinY = parseInt(mainPin.offsetTop + (mainPinProps.height + mainPinProps.sharpEnd), 10);

    addressField.value = currentPinX + ', ' + currentPinY;
  };

  var preventLossMainPin = function (removeHandler) {
    if (mainPin.offsetLeft <= mainPinProps.minXcoord) {
      mainPin.style.left = OFFSET + 'px';
      document.removeEventListener('mousemove', removeHandler);
    } else if (mainPin.offsetLeft >= mainPinProps.maxXcoord) {
      mainPin.style.left = mainPinProps.maxXcoord - OFFSET + 'px';
      document.removeEventListener('mousemove', removeHandler);
    } else if (mainPin.offsetTop <= mainPinProps.minYcoord) {
      mainPin.style.top = (mainPinProps.minYcoord + OFFSET) + 'px';
      document.removeEventListener('mousemove', removeHandler);
    } else if (mainPin.offsetTop >= mainPinProps.maxYcoord) {
      mainPin.style.top = (mainPinProps.maxYcoord - OFFSET) + 'px';
      document.removeEventListener('mousemove', removeHandler);
    }
  };

  var onSucces = function (data) {
    var mapPins = window.mapPins.generatePins(data);
    cards = window.card.generateCards(data);

    mapPinsContainer.appendChild(mapPins);
  };

  var onError = function () {
    document.body.appendChild(window.data.errorMessage);
  };


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onClickMapPin = function (clickEvt) {
      var mapPin = clickEvt.target.closest('.map__pin');
      var card;
      var activePin = mapPinsContainer.querySelector('.map__pin--active');
      var activeCard = map.querySelector('.map__card--active');

      var cardHidden = function () {
        cards.appendChild(card);
        var pin = map.querySelector('[data-user="' + card.dataset.user + '"]');
        pin.classList.remove('map__pin--active');
      };

      if (mapPin && !mapPin.classList.contains('map__pin--main')) {
        if (activePin && activeCard) {
          cards.appendChild(activeCard);
          activeCard.classList.remove('map__card--active');
          activePin.classList.remove('map__pin--active');
        }

        mapPin.classList.add('map__pin--active');
        card = cards.querySelector('[data-user="' + mapPin.dataset.user + '"]');
        card.classList.add('map__card--active');
        map.insertBefore(card, cardContainer);

        card.querySelector('.popup__close').addEventListener('click', cardHidden);
      }
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (!activeState) {
        window.utils.onActiveState(map, adForm, function () {
          window.form.disableFields(false);

          window.data.load(onSucces, onError);

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
