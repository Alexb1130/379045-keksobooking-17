'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  var OffersProps = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

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

    priceField.placeholder = OffersProps[typeSelect.value];
    priceField.min = OffersProps[typeSelect.value];

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
