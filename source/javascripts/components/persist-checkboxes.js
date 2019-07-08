(function() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(function(checkbox) {
    // retrieve state of each checkbox after refresh
    var wasChecked = localStorage.getItem(checkbox.id);
    if (wasChecked === 'true') checkbox.checked = true;

    // save state of each checkbox when clicked
    checkbox.addEventListener('click', function(e) {
        var clickedCheckbox = e.target;
        localStorage.setItem(clickedCheckbox.id, clickedCheckbox.checked);
    });
  });
})();
