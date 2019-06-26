'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  var OFFERS_PROPS = [
    {
      offer: 'bungalo',
      price: 0
    },
    {
      offer: 'flat',
      price: 1000
    },
    {
      offer: 'house',
      price: 5000
    },
    {
      offer: 'palace',
      price: 10000
    },
  ];

  window.disableFields = function (state) {
    var fields = document.querySelectorAll('fieldset');

    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = state;
    }

  };

  var onValidateFormFieldsChanges = function (evt) {
    var typeSelect = adForm.elements.type;
    var priceField = adForm.elements.price;
    var timeinSelect = adForm.elements.timein;
    var timeoutSelect = adForm.elements.timeout;

    for (var i = 0; i < OFFERS_PROPS.length; i++) {
      if (typeSelect.value === OFFERS_PROPS[i].offer) {
        priceField.placeholder = OFFERS_PROPS[i].price;
        priceField.min = OFFERS_PROPS[i].price;
      }
    }

    if (evt.target === timeinSelect || evt.target === timeoutSelect) {
      timeinSelect.value = evt.target.value;
      timeoutSelect.value = evt.target.value;
    }
  };

  window.disableFields(true);

  adForm.addEventListener('change', onValidateFormFieldsChanges);

})();
