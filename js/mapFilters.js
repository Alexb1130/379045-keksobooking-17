'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.elements['housing-type'];
  var housingPrice = mapFilters.elements['housing-price'];
  var housingRooms = mapFilters.elements['housing-rooms'];
  var housingGuests = mapFilters.elements['housing-guests'];
  // housing - features
  var mapPinsContainer = document.querySelector('.map__pins');
  var data = new window.data.Load('GET', window.data.URL + '/data');

  var onError = function () {
    window.utils.showMessage(window.utils.messages.error);
  };

  var housingFilter = function(prop) {
    return housingType.value === prop.offer.type;
  }
  var priceFilter = function(prop) {

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

    return prop.offer.price >= priceValues.MIN && prop.offer.price <= priceValues.MAX
  }

  var roomsFilter = function(prop) {
    return parseInt(housingRooms.value, 10) === prop.offer.rooms;
  }

  var guestsFilter = function(prop) {

  }

  var onMapFiltered = function (dataItems) {
    var filteredItems = dataItems.filter(roomsFilter);

    console.log(dataItems);

    var filteredMapPins = window.mapPins.generatePins(filteredItems);

    mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {
      pin.remove();
    });

    if (housingType.value === 'any') {
      mapPinsContainer.appendChild(window.mapPins.generatePins(dataItems));
    }

    mapPinsContainer.appendChild(filteredMapPins);
  };

  mapFilters.addEventListener('change', function () {
    data.load(onMapFiltered, onError);
  });
})();
