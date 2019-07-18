'use strict';

(function () {

  var Utils = function () {
    this.messages = {
      error: '#error',
      success: '#success'
    };
    this.ESC_CODE = 27;
    this.DEBOUNCE_INTERVAL = 500;
    this.activePageState = false;
    this.lastTimeout = null;
  };

  Utils.prototype.debounce = function (cb) {
    if (this.lastTimeout) {
      window.clearTimeout(this.lastTimeout);
    }
    this.lastTimeout = window.setTimeout(cb, this.DEBOUNCE_INTERVAL);
  };

  Utils.prototype.showMessage = function (message) {
    var messageItem = document.querySelector(message).content.cloneNode(true);
    document.body.appendChild(messageItem);
  };

  Utils.prototype.hideMessage = function (message) {
    var messageItem = document.querySelector(message);
    if (messageItem) {
      document.body.removeChild(messageItem);
    }
  };

  Utils.prototype.onKeydownMessage = function (evt, message) {
    if (evt.keyCode === this.ESC_CODE) {
      this.hideMessage(message);
    }
  };

  Utils.prototype.generateRandomInt = function (min, max) {
    var length = max - min + 1;
    return Math.floor(Math.random() * length + min);
  };

  Utils.prototype.getRandomIndexArr = function (arr) {
    return this.generateRandomInt(0, arr.length - 1);
  };

  Utils.prototype.getRandomElementArr = function (arr) {
    return arr[this.getRandomIndexArr(arr)];
  };

  Utils.prototype.activetePage = function (mapEl, formEl, activate) {
    mapEl.classList.remove('map--faded');
    formEl.classList.remove('ad-form--disabled');
    activate();
  };

  Utils.prototype.deactivatePage = function (mapEl, formEl, deactivate) {
    mapEl.classList.add('map--faded');
    formEl.classList.add('ad-form--disabled');
    deactivate();
  };

  window.utils = new Utils();

})();
