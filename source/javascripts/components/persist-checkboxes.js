(function() {
  'use-strict';
  var checkboxes = Array.prototype.slice.call(document.querySelectorAll('input[type="checkbox"]'));

  // retrieve checkbox state after refresh
  var state = JSON.parse(localStorage.getItem('integration_guide_checklists')) || {};

  checkboxes.forEach(function(checkbox) {
    // recheck the checkboxes based on state
    var wasChecked = state[getHash(checkbox)];
    if (wasChecked) checkbox.checked = true;

    // update state when any checkbox is clicked
    checkbox.addEventListener('click', function(e) {
      localStorage.setItem('integration_guide_checklists', updateState(e.target));
    });
  });

  function getHash(checkbox) {
    // concatenate pathname (e.g., /integrations/testing/) and checkbox label
    // in case the same label appears on multiple checklists
    return window.location.pathname + checkbox.parentNode.innerText.trim();
  };

  function updateState(checkbox) {
    state[getHash(checkbox)] = checkbox.checked;
    return JSON.stringify(state);
  };
})();
