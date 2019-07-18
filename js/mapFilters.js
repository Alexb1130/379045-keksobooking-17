'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.elements['housing-type'];
  var housingPrice = mapFilters.elements['housing-price'];
  var housingRooms = mapFilters.elements['housing-rooms'];
  var housingGuests = mapFilters.elements['housing-guests'];
  var housingFeatures;
  var mapPinsContainer = document.querySelector('.map__pins');
  var data = new window.data.Load('GET', window.data.URL + '/data');

  var onError = function () {
    window.utils.showMessage(window.utils.messages.error);
  };

  var housingFilter = function (prop) {
    if (housingType.value === 'any') {
      return true;
    }
    return housingType.value === prop.offer.type;
  };

  var priceFilter = function (prop) {

    var PriceValues = {
      'low': {
        MIN: 0,
        MAX: 10000
      },
      'middle': {
        MIN: 10000,
        MAX: 50000
      },
      'high': {
        MIN: 50000,
        MAX: Infinity
      }
    };

    var priceValues = PriceValues[housingPrice.value];

    if (housingPrice.value === 'any') {
      return true;
    }
    return prop.offer.price >= priceValues.MIN && prop.offer.price <= priceValues.MAX;
  };

  var roomsFilter = function (prop) {
    if (housingRooms.value === 'any') {
      return true;
    }
    return parseInt(housingRooms.value, 10) === prop.offer.rooms;
  };

  var guestsFilter = function (prop) {
    if (housingGuests.value === 'any') {
      return true;
    }
    return parseInt(housingGuests.value, 10) === prop.offer.guests;
  };

  var featuresFilter = function (prop) {
    housingFeatures = mapFilters.querySelectorAll('#housing-features input[name="features"]:checked');
    return Array.from(housingFeatures).every(function (feature) {
      return prop.offer.features.includes(feature.value);
    });
  };

  var mainFilter = function (prop) {
    return housingFilter(prop) && priceFilter(prop) && roomsFilter(prop) && guestsFilter(prop) && featuresFilter(prop);
  };

  var onMapFiltered = function (dataItems) {
    var filteredItems = dataItems.filter(mainFilter).slice(0, 5);

    var filteredMapPins = window.mapPins.generatePins(filteredItems);

    window.utils.debounce(function () {
      mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {
        pin.remove();
      });
      var card = document.querySelector('.map__card');
      if (card) {
        window.card.cardHidden(card);
      }
      mapPinsContainer.appendChild(filteredMapPins);
    });
  };

  mapFilters.addEventListener('change', function () {
    data.load(onMapFiltered, onError);
  });

})();
