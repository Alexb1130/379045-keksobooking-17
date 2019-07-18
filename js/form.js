'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var errorField = '1px solid tomato';

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
  };

  var onError = function () {
    window.utils.showMessage(window.utils.messages.error);

    document.addEventListener('click', function () {
      window.utils.hideMessage('.error');
    }, {once: true});

    document.addEventListener('keydown', function (evt) {
      window.utils.onKeydownMessage(evt, '.error');
    });
  };

  var onSucces = function () {
    window.utils.showMessage(window.utils.messages.success);

    document.addEventListener('click', function () {
      window.utils.hideMessage('.success');
    }, {once: true});

    document.addEventListener('keydown', function (evt) {
      window.utils.onKeydownMessage(evt, '.success');
    });
  };

  var disableFields = function (state) {
    var fields = document.querySelectorAll('fieldset');

    fields.forEach(function (field) {
      field.disabled = state;
    });
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    var formData = new FormData(adForm);
    data.save(formData, onSucces, onError);
    adForm.reset();

    window.map.setDefaultPinCoodrs();

    window.utils.deactivatePage(map, adForm, function () {
      mainPin.style.left = '570px';
      mainPin.style.top = '375px';
      document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {
        pin.remove();
      });

      disableFields(true);

      window.utils.activePageState = false;

    });
  };

  var onValidateFormFieldsChanges = function (evt) {
    var priceField = adForm.elements.price;
    var titleFiled = adForm.elements.title;
    var addressField = adForm.elements.address;
    var typeSelect = adForm.elements.type;
    var timeinSelect = adForm.elements.timein;
    var timeoutSelect = adForm.elements.timeout;
    var roomNumberSelect = adForm.elements.rooms;
    var capacitySelect = adForm.elements.capacity;

    priceField.placeholder = OffersProps[typeSelect.value];
    priceField.min = OffersProps[typeSelect.value];

    if (evt.target === titleFiled || addressField || priceField) {
      if (!evt.target.validity.valid) {
        evt.target.style.border = errorField;
      } else {
        evt.target.style.border = 'none';
      }
    }

    if (evt.target === roomNumberSelect) {

      capacitySelect.value = CapacityProps[roomNumberSelect.value];

      Array.from(capacitySelect.options).forEach(function (option) {
        option.disabled = false;
      });

      CapacityDisablesdFields[roomNumberSelect.value].forEach(function (value) {
        capacitySelect.querySelector('option' + '[value="' + value + '"]').disabled = true;
      });
    }

    if (CapacityDisablesdFields[roomNumberSelect.value].includes(capacitySelect.value)) {
      capacitySelect.value = CapacityProps[roomNumberSelect.value];
      capacitySelect.style.border = errorField;
    } else {
      capacitySelect.style.border = 'none';
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

  var data = new window.data.Save('POST', window.data.URL);

  adForm.addEventListener('change', onValidateFormFieldsChanges);

  adForm.addEventListener('submit', onFormSubmit);

})();
