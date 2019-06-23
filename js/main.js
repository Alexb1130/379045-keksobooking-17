'use strict';

var OFFERS = ['bungalo', 'flat', 'house', 'palace'];
var OFFERS_PRISES = [0, 1000, 5000, 10000];
var OBJECTS_NUMBER = 8;

var mainPin = document.querySelector('.map__pin--main');
var addressField = document.querySelector('#address');
var adForm = document.querySelector('.ad-form');
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');

var MAIN_PIN_HEIGHT = mainPin.clientHeight;
var MAIN_PIN_WIDTH = mainPin.clientWidth;
var MAIN_PIN_SHARP_END = 22;
var MAP_WIDTH = mapPins.offsetWidth;
var MAP_HEIGHT = mapPins.offsetHeight;
var MAP_SKY_HEIGHT = 100;

var pins = generatePins();

function generateRandomInt(min, max) {
  var length = max - min + 1;
  return Math.floor(Math.random() * length + min);
}

function getRandomIndexArr(arr) {
  return generateRandomInt(0, arr.length - 1);
}

function getRandomElementArr(arr) {
  return arr[getRandomIndexArr(arr)];
}

function disableFields(state) {
  var fields = document.querySelectorAll('fieldset');
  for (var i = 0; i < fields.length; i++) {
    fields[i].disabled = state;
  }
}

function onActiveState() {
  disableFields(false);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapPins.appendChild(pins);
}

function setDefaultPinCoodrs() {
  addressField.value = MAIN_PIN_HEIGHT / 2 + ', ' + MAIN_PIN_WIDTH / 2;
}

function onSetPinCoodrs() {
  addressField.value = mainPin.offsetLeft + ', ' + parseInt(mainPin.offsetTop + MAIN_PIN_SHARP_END, 10);
}

function generateObj(i) {
  return {
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
    offer: {
      type: getRandomElementArr(OFFERS)
    },
    location: {
      x: generateRandomInt(0, MAP_WIDTH),
      y: generateRandomInt(130, 630)
    }
  };
}

function generateArrFeatures(number) {
  var arrFeatures = [];
  for (var i = 1; i <= number; i++) {
    arrFeatures.push(generateObj(i));
  }
  return arrFeatures;
}

function generatePins() {
  var objectsArr = generateArrFeatures(OBJECTS_NUMBER);
  var pinTemplate = document.querySelector('#pin').content;
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objectsArr.length; i++) {
    var pin = pinTemplate.querySelector('.map__pin').cloneNode(true);
    var avatar = pin.querySelector('img');
    pin.style.left = objectsArr[i].location.x + 'px';
    pin.style.top = objectsArr[i].location.y + 'px';
    avatar.src = objectsArr[i].author.avatar;
    avatar.alt = objectsArr[i].offer.type;
    fragment.appendChild(pin);
  }
  return fragment;
}

function onValidateFormFieldsChanges(evt) {
  var typeSelect = adForm.elements.type;
  var priceField = adForm.elements.price;
  var timeinSelect = adForm.elements.timein;
  var timeoutSelect = adForm.elements.timeout;

  for (var i = 0; i < OFFERS.length; i++) {
    if (typeSelect.value === OFFERS[i]) {
      priceField.placeholder = OFFERS_PRISES[i];
      priceField.min = OFFERS_PRISES[i];
    }
  }

  if (evt.target === timeinSelect || evt.target === timeoutSelect) {
    timeinSelect.value = evt.target.value;
    timeoutSelect.value = evt.target.value;
  }
}

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    onActiveState();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (mainPin.offsetLeft <= 0) {
      mainPin.style.left = 0 + 'px';
    } else if (mainPin.offsetLeft >= MAP_WIDTH - MAIN_PIN_WIDTH) {
      mainPin.style.left = MAP_WIDTH - MAIN_PIN_WIDTH + 'px';
    } else if (mainPin.offsetTop <= MAP_SKY_HEIGHT) {
      mainPin.style.top = MAP_SKY_HEIGHT + 'px';
    } else if (mainPin.offsetTop >= MAP_HEIGHT - MAIN_PIN_HEIGHT - MAIN_PIN_SHARP_END) {
      mainPin.style.top = MAP_HEIGHT - MAIN_PIN_HEIGHT - MAIN_PIN_SHARP_END + 'px';
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

});

disableFields(true);

setDefaultPinCoodrs();

adForm.addEventListener('change', onValidateFormFieldsChanges);

mainPin.addEventListener('mouseup', onSetPinCoodrs);
