'use strict';

// form
function disableFields(state) {
  var fields = document.querySelectorAll('fieldset');
  for (var i = 0; i < fields.length; i++) {
    fields[i].disabled = state;
  }
}

disableFields(true);
