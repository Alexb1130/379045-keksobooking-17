'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var cards = null;

  var OffersTypes = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var cardHidden = function (cardItem) {
    window.card.cards.appendChild(cardItem);
    var pin = document.querySelector('[data-user="' + cardItem.dataset.user + '"]');
    if (pin) {
      pin.classList.remove('map__pin--active');
    }
  };

  var generatePhotos = function (cardItem, photos) {
    var photosContainer = cardItem.querySelector('.popup__photos');
    var imageTemplate = photosContainer.querySelector('.popup__photo');

    photos.forEach(function (photo) {
      var image = imageTemplate.cloneNode(true);
      imageTemplate.remove();
      image.src = photo;
      photosContainer.appendChild(image);
    });

    if (!photos.length) {
      photosContainer.remove();
    }

  };

  var generateFeatures = function (cardItem, features) {
    var featuresContainer = cardItem.querySelector('.popup__features');
    featuresContainer.innerHTML = '';

    features.forEach(function (feature) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', 'popup__feature--' + feature);
      featuresContainer.appendChild(featureItem);
    });

    if (!features.length) {
      featuresContainer.remove();
    }

  };

  var generateCards = function (data) {

    data.forEach(function (dataItem) {
      var card = document.querySelector('#card').content.cloneNode(true);
      var avatar = card.querySelector('.popup__avatar');

      avatar.src = dataItem.author.avatar;
      avatar.alt = dataItem.offer.type;
      card.querySelector('.map__card').dataset.user = dataItem.location.x;
      card.querySelector('.popup__title').textContent = dataItem.offer.title;
      card.querySelector('.popup__text--address').textContent = dataItem.offer.address;
      card.querySelector('.popup__text--price').textContent = dataItem.offer.price + '₽/ночь';
      card.querySelector('.popup__type').textContent = OffersTypes[dataItem.offer.type];
      card.querySelector('.popup__text--capacity').textContent = dataItem.offer.rooms + ' комнаты для ' + dataItem.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataItem.offer.checkin + ', выезд до ' + dataItem.offer.checkout;
      card.querySelector('.popup__description').textContent = dataItem.offer.description;
      generatePhotos(card, dataItem.offer.photos);
      generateFeatures(card, dataItem.offer.features);
      fragment.appendChild(card);
    });

    return fragment;
  };

  window.card = {
    generateCards: generateCards,
    cardHidden: cardHidden,
    cards: cards
  };

})();
