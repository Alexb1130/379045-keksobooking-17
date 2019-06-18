'use strict';

var OFFERS = ['palace', 'flat', 'house', 'bungalo'];
var OBJECTS_NUMBER = 8;

var mainPin = document.querySelector('.map__pin--main');
var addressField = document.querySelector('#address');

var MAIN_PIN_HEIGHT = mainPin.clientHeight;
var MAIN_PIN_WIDTH = mainPin.clientWidth;

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
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.map__pins').appendChild(pins);
}

function setDefaultPinCoors() {
  addressField.value = MAIN_PIN_HEIGHT / 2 + ', ' + MAIN_PIN_WIDTH / 2;
}

function onSetPinCoors() {
  addressField.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;
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
      x: generateRandomInt(0, document.querySelector('.map__overlay').clientWidth),
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

disableFields(true);

setDefaultPinCoors();

mainPin.addEventListener('click', onActiveState);

mainPin.addEventListener('mouseup', onSetPinCoors);
