'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.elements['housing-type'];
  var housingPrice = mapFilters.elements['housing-price'];
  var housingRooms = mapFilters.elements['housing-rooms'];
  var housingGuests = mapFilters.elements['housing-guests'];
  var housingFeatures;
  var mapPinsContainer = document.querySelector('.map__pins');

  var housingFiltered = function (prop) {
    if (housingType.value === 'any') {
      return true;
    }
    return housingType.value === prop.offer.type;
  };

  var priceFiltered = function (prop) {

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

  var roomsFiltered = function (prop) {
    if (housingRooms.value === 'any') {
      return true;
    }
    return parseInt(housingRooms.value, 10) === prop.offer.rooms;
  };

  var guestsFiltered = function (prop) {
    if (housingGuests.value === 'any') {
      return true;
    }
    return parseInt(housingGuests.value, 10) === prop.offer.guests;
  };

  var featuresFiltered = function (prop) {
    housingFeatures = mapFilters.querySelectorAll('#housing-features input:checked');
    return Array.from(housingFeatures).every(function (feature) {
      return prop.offer.features.includes(feature.value);
    });
  };

  var mainFiltered = function (prop) {
    return housingFiltered(prop) && priceFiltered(prop) && roomsFiltered(prop) && guestsFiltered(prop) && featuresFiltered(prop);
  };

  var onMapFiltered = function () {

    var filteredItems = window.data.dataItems.filter(mainFiltered).slice(0, 5);

    var filteredMapPins = window.mapPins.generatePins(filteredItems);

    window.utils.debounce(function () {
      window.mapPins.clearPins();
      var card = document.querySelector('.map__card');
      if (card) {
        window.card.cardHide(card);
      }
      mapPinsContainer.appendChild(filteredMapPins);
    });
  };

  mapFilters.addEventListener('change', onMapFiltered);

})();
