'use strict';

(function () {
  var errorMessage = document.querySelector('#error').content.cloneNode(true);

  var generateCard = function (data) {

    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      var card = document.querySelector('#card').content.cloneNode(true);
      var avatar = card.querySelector('.popup__avatar');

      avatar.src = dataItem.author.avatar;
      avatar.alt = dataItem.offer.type;
      card.querySelector('.popup__title').textContent = dataItem.offer.title;
      card.querySelector('.popup__text--address').textContent = dataItem.offer.address;
      card.querySelector('.popup__text--price').textContent = dataItem.offer.price;
      card.querySelector('.popup__type').textContent = dataItem.offer.type;
      card.querySelector('.popup__text--capacity').textContent = dataItem.offer.rooms + ' комнаты для ' + dataItem.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataItem.offer.checkin + ', выезд до ' + dataItem.offer.checkout;
      // card..querySelector('.popup__features');
      card.querySelector('.popup__description').textContent = dataItem.description;
      // card..querySelector('.popup__photos');

    }

    return card;
  };

  window.card = {
    errorMessage: errorMessage,
    generateCard: generateCard
  };

})();
