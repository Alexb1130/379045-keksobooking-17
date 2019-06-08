'use strict';

var OFFERS = ['palace', 'flat', 'house', 'bungalo'];
var objectsNumber = 8;

function generateRandomInt(min, max) {
  var length = max - min + 1;
  return Math.floor(Math.random() * length + min);
}

function getRandomIndexArr(arr) {
  return generateRandomInt(0, arr.length);
}

function getRandomElementArr(arr) {
  return arr[getRandomIndexArr(arr)];
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

function generateArrObjects(n) {
  var arr = [];
  for (var i = 1; i <= n; i++) {
    arr.push(generateObj(i));
  }
  return arr;
}

// почему-то не всегда корректно создает коллекцию
// function generateRandomObjectsArr(arr) {
//   var arrCopy = arr.slice();
//   var randomArr = [];
//   for (var i = 0; i < arr.length; i++) {
//     randomArr.push(arrCopy.splice(getRandomIndexArr(arrCopy), 1)[0]);
//   }
//   return randomArr;
// }

var objectsArr = generateArrObjects(objectsNumber);
// var randomArr = generateRandomObjectsArr(objectsArr);

function generatePins() {
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

document.querySelector('.map__pins').appendChild(generatePins());

document.querySelector('.map').classList.remove('map--faded');
