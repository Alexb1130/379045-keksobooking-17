'use strict';

(function () {
  var MAX_SIZE = 300 * 1024;
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'svg+xml'];
  var color = '#ff5635';
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var uploadPhoto = document.querySelector('.ad-form__upload');
  var photoDropZone = document.querySelector('.ad-form__drop-zone');

  var createPhoto = function (result) {
    var emptyBlock = photoContainer.querySelector('.ad-form__photo:empty');
    var photo = document.createElement('div');
    var image = new Image();

    if (emptyBlock) {
      emptyBlock.remove();
    }

    image.src = result;
    photo.classList.add('ad-form__photo');
    photo.appendChild(image);

    photoContainer.append(photo);
  };

  var uploadFiles = function (files) {
    Array.from(files).forEach(function (file) {
      var fileReader = new FileReader();
      var fileType = file.type.split('/')[1];

      if (file) {
        if (file.size <= MAX_SIZE && FILE_TYPES.includes(fileType)) {
          fileReader.readAsDataURL(file);
        }
      }

      fileReader.addEventListener('load', function () {
        createPhoto(fileReader.result);
      });

    });
  };

  var uploadPhotos = function (evt) {
    var files;

    try {
      files = evt.target.files;
      uploadFiles(files);
    } catch (e) {
      files = evt.dataTransfer.files;
      uploadFiles(files);
    }
  };

  uploadPhoto.addEventListener('change', uploadPhotos);

  photoDropZone.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    evt.target.style.borderColor = color;
  });

  photoDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  photoDropZone.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    evt.target.removeAttribute('style');
  });

  photoDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    evt.target.removeAttribute('style');
    uploadPhotos(evt);
  });

})();
