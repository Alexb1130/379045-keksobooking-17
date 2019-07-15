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

  var onMapFiltered = function (dataFilters) {
    var filteredItems = dataFilters.filter(function (item) {
      return housingType.value === item.offer.type;
    });

    var filteredMapPins = window.mapPins.generatePins(filteredItems);

    mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {

      pin.remove();

      if (housingType.value === 'any') {
        window.mapPins.generatePins(dataFilters);
      }
    });

    mapPinsContainer.appendChild(filteredMapPins);
  };

  mapFilters.addEventListener('change', function () {
    data.load(onMapFiltered, onError);
  });
})();
