'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFromReset = adForm.querySelector('.ad-form__reset');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var errorField = '1px solid tomato';

  var mainPinDefaultCoords = {
    x: '570px',
    y: '375px'
  };

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
    }, {once: true});
  };

  var onSucces = function () {
    window.utils.showMessage(window.utils.messages.success);

    document.addEventListener('click', function () {
      window.utils.hideMessage('.success');
    }, {once: true});

    document.addEventListener('keydown', function (evt) {
      window.utils.onKeydownMessage(evt, '.success');
    }, {once: true});
  };

  var disableFields = function (state) {
    var fields = document.querySelectorAll('fieldset');
    adForm.elements.address.disabled = true;

    fields.forEach(function (field) {
      field.disabled = state;
    });
  };

  var resetToDefaultState = function () {
    window.utils.deactivatePage(map, adForm, function () {
      mainPin.style.left = mainPinDefaultCoords.x;
      mainPin.style.top = mainPinDefaultCoords.y;
      window.map.setDefaultPinCoodrs();
      window.mapPins.clearPins();
      disableFields(true);
      window.utils.activePageState = false;
    });
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    adForm.elements.address.disabled = false;

    var formData = new FormData(adForm);
    data.save(formData, onSucces, onError);
    adForm.reset();
    resetToDefaultState();
  };

  var onFormReset = function (evt) {
    evt.preventDefault();
    adForm.reset();
    resetToDefaultState();
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
  adFromReset.addEventListener('click', onFormReset);

})();
