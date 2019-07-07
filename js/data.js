'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var errorMessage = document.querySelector('#error').content.cloneNode(true);

  var load = function (onSucces, onError) {
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

    xhr.open('GET', URL);
    xhr.send();
  };

  window.data = {
    load: load,
    errorMessage: errorMessage
  };

})();
