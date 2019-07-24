// persists checkbox state on refresh:
(function() {
  'use-strict';
  var checkboxes = Array.prototype.slice.call(document.querySelectorAll('input[type="checkbox"]'));

  // retrieve checkbox state after refresh
  var state = JSON.parse(localStorage.getItem('integration_guide_checklists')) || {};

  checkboxes.forEach(function(checkbox) {
    // recheck the checkboxes based on state
    var checkboxState = state[getHash(checkbox)];
    checkbox.checked = checkboxState && checkboxState.checked;
    checkbox.indeterminate = checkboxState && checkboxState.indeterminate;

    // update state when any checkbox is clicked
    checkbox.onchange = function() {
      localStorage.setItem('integration_guide_checklists', updateState(checkbox));
    };
  });

  function getHash(checkbox) {
    // concatenate pathname (e.g., /integrations/testing/) and checkbox label
    // in case the same label appears on multiple checklists
    return window.location.pathname + checkbox.parentNode.innerText.trim();
  };

  function updateState(checkbox) {
    state[getHash(checkbox)] = {
      checked: checkbox.checked,
      indeterminate: checkbox.indeterminate
    };
    return JSON.stringify(state);
  };
})();

// Add functionality to nested checkboxes:
(function() {
  'use-strict';
  var parentCheckboxes = toArray(document.querySelectorAll('input[type="checkbox"]'))
    .filter(function(checkbox) {
      return checkbox.parentNode.parentNode.nextSibling
        && checkbox.parentNode.parentNode.nextSibling.nextSibling
        && checkbox.parentNode.parentNode.nextSibling.nextSibling
          .querySelectorAll('ul input[type="checkbox"]').length > 1;
    });

  parentCheckboxes.forEach(function(parentCheckbox) {
    var childCheckboxes = toArray(
      parentCheckbox.parentNode.parentNode.nextSibling.nextSibling
        .querySelectorAll('input[type="checkbox"]')
    );

    // when parent is clicked, check/uncheck all children
    parentCheckbox.onclick = function() {
      childCheckboxes.forEach(function(childCheckbox) {
        childCheckbox.checked = parentCheckbox.checked;
        childCheckbox.onchange();
      });
    };

    // set parent state based on children; when:
    childCheckboxes.forEach(function(childCheckbox) {
      childCheckbox.oninput = function() {
        var numChecked = childCheckboxes.filter(function(checkbox) {
          return checkbox.checked;
        }).length;

        if (numChecked === childCheckboxes.length) {
          // all children checked, check parent
          parentCheckbox.checked = true;
          parentCheckbox.indeterminate = false;
        }
        else if (numChecked) {
          // some children checked, indeterminate parent
          parentCheckbox.indeterminate = true;
        } else {
          // all children unchecked, uncheck parent
          parentCheckbox.checked = false;
          parentCheckbox.indeterminate = false;
        }
        parentCheckbox.onchange();
      };
    });
  });

  function toArray(arr) {
    return Array.prototype.slice.call(arr);
  };
})();
