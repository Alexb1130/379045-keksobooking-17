'use strict';

(function () {
  var avatarInput = document.querySelector('.ad-form__field');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var fileReader = new FileReader();
  var MAX_SIZE = 300 * 1024;
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'svg+xml'];
  var color = '#ff5635';

  var uploadAvatar = function (evt) {
    var file;

    try {
      file = evt.target.files[0];
    } catch (e) {
      file = evt.dataTransfer.files[0];
    }

    var fileType = file.type.split('/')[1];

    if (file) {
      if (file.size <= MAX_SIZE && FILE_TYPES.includes(fileType)) {
        fileReader.readAsDataURL(file);
      }
    }
  };

  avatarInput.addEventListener('change', uploadAvatar);

  fileReader.addEventListener('load', function () {
    avatarPreview.src = fileReader.result;
  });

  avatarPreview.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  avatarPreview.addEventListener('drop', function (evt) {
    evt.preventDefault();
  });

  avatarDropZone.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    evt.target.style.borderColor = color;
  });

  avatarDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  avatarDropZone.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    evt.target.removeAttribute('style');
  });

  avatarDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    evt.target.removeAttribute('style');
    uploadAvatar(evt);
  });

})();
