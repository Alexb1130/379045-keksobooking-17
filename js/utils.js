'use strict';

(function () {

  var Utils = function () {
    this.messages = {
      error: document.querySelector('#error').content.cloneNode(true),
      success: document.querySelector('#success').content.cloneNode(true)
    };
    this.activePageState = false;
    this.lastTimeout = null;
    this.DEBOUNCE_INTERVAL = 500;
  };

  Utils.prototype.debounce = function (cb) {
    if (this.lastTimeout) {
      window.clearTimeout(this.lastTimeout);
    }
    this.lastTimeout = window.setTimeout(cb, this.DEBOUNCE_INTERVAL);
  };

  Utils.prototype.showMessage = function (message) {
    document.body.appendChild(message);
  };

  Utils.prototype.hideMessage = function (message) {
    var messageItem = document.querySelector(message);
    if (messageItem) {
      document.body.removeChild(messageItem);
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
