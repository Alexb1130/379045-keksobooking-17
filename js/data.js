'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var dataItems;

  var Data = function (method, url) {
    this.method = method;
    this.url = url;
  };

  Data.prototype._requestBody = function (onSucces, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      try {
        onSucces(xhr.response);
      } catch (err) {
        onError();
      }
    });

    xhr.addEventListener('error', onError);
    xhr.addEventListener('timeout', onError);

    xhr.open(this.method, this.url);

    return xhr;
  };

  Data.prototype.load = function (onSucces, onError) {
    this._requestBody(onSucces, onError).send();
  };

  Data.prototype.save = function (data, onSucces, onError) {
    this._requestBody(onSucces, onError).send(data);
  };

  window.data = {
    URL: URL,
    dataItems: dataItems,
    Load: Data,
    Save: Data,
  };

})();
