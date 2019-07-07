'use strict';

(function () {
  var errorMessage = document.querySelector('#error').content.cloneNode(true);
  var fragment = document.createDocumentFragment();

  var OffersTypes = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var generatePhotos = function (cardItem, photos) {
    var photosContainer = cardItem.querySelector('.popup__photos');
    var imageTemplate = photosContainer.querySelector('.popup__photo');

    for (var i = 0; i < photos.length; i++) {
      var image = imageTemplate.cloneNode(true);
      imageTemplate.remove();
      image.src = photos[i];
      photosContainer.appendChild(image);
    }

    if (!photos.length) {
      photosContainer.remove();
    }

  };

  var generateFeatures = function (cardItem, features) {
    var featuresContainer = cardItem.querySelector('.popup__features');
    featuresContainer.innerHTML = '';

    for (var i = 0; i < features.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + features[i]);
      featuresContainer.appendChild(feature);
    }

    if (!features.length) {
      featuresContainer.remove();
    }

  };

  var generateCards = function (data) {

    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      var card = document.querySelector('#card').content.cloneNode(true);
      var avatar = card.querySelector('.popup__avatar');

      avatar.src = dataItem.author.avatar;
      avatar.alt = dataItem.offer.type;
      card.querySelector('.map__card').dataset.user = i;
      card.querySelector('.popup__title').textContent = dataItem.offer.title;
      card.querySelector('.popup__text--address').textContent = dataItem.offer.address;
      card.querySelector('.popup__text--price').textContent = dataItem.offer.price;
      card.querySelector('.popup__type').textContent = OffersTypes[dataItem.offer.type];
      card.querySelector('.popup__text--capacity').textContent = dataItem.offer.rooms + ' комнаты для ' + dataItem.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataItem.offer.checkin + ', выезд до ' + dataItem.offer.checkout;
      card.querySelector('.popup__description').textContent = dataItem.offer.description;
      generatePhotos(card, dataItem.offer.photos);
      generateFeatures(card, dataItem.offer.features);
      fragment.appendChild(card);
    }

    return fragment;
  };

  window.card = {
    errorMessage: errorMessage,
    generateCards: generateCards
  };

})();
