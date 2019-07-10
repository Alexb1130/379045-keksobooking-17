'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.elements['housing-type'];
  var mapPinsContainer = document.querySelector('.map__pins');
  var data = new window.data.load('GET', window.data.URL + '/data');

  var onMapFiltered = function (data) {
    var filteredItems = data.filter(function (item) {
      return housingType.value === item.offer.type;
    });

    var filteredMapPins = window.mapPins.generatePins(filteredItems);

    mapPinsContainer.querySelectorAll('.map__pin').forEach(function (pin) {

      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      } else if (housingType.value === 'any') {
        window.mapPins.generatePins(data);
      }
    });

    mapPinsContainer.appendChild(filteredMapPins);
  };

  mapFilters.addEventListener('change', function () {
    data.load(onMapFiltered);
  });
})();
