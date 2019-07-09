'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  var OffersProps = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var CapacityProps = {
    '1': '1',
    '2': '2',
    '3': '3',
    '100': '0',
  };

  var CapacityDisablesdFields = {
    '1': ['0', '2', '3'],
    '2': ['0', '3'],
    '3': ['0'],
    '100': ['1', '2', '3']
  }

  var disableFields = function (state) {
    var fields = document.querySelectorAll('fieldset');

    fields.forEach(function (field) {
      field.disabled = state;
    });

  };

  var onValidateFormFieldsChanges = function (evt) {
    var typeSelect = adForm.elements.type;
    var priceField = adForm.elements.price;
    var timeinSelect = adForm.elements.timein;
    var timeoutSelect = adForm.elements.timeout;
    var roomNumberSelect = adForm.elements.rooms;
    var capacitySelect = adForm.elements.capacity;

    priceField.placeholder = OffersProps[typeSelect.value];
    priceField.min = OffersProps[typeSelect.value];

    if (evt.target === roomNumberSelect) {

      capacitySelect.value = CapacityProps[roomNumberSelect.value];

      CapacityDisablesdFields[roomNumberSelect.value].forEach(function (value) {
        capacitySelect.querySelector('option' + '[value="' + value + '"]').disabled = true;
      });
    }

    if (evt.target === timeinSelect || evt.target === timeoutSelect) {
      timeinSelect.value = evt.target.value;
      timeoutSelect.value = evt.target.value;
    }
  };

  window.form = {
    disableFields: disableFields,
  };

  window.form.disableFields(true);

  adForm.addEventListener('change', onValidateFormFieldsChanges);

})();
