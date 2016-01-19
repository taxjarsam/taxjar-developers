//= require particles.js/particles.js
//= require walkway.js/src/walkway.js
//= require_tree ./partials

(function() {
  var path = window.location.pathname;
  var bodyClass = document.body.classList[0];
  var activeLink = document.querySelector('.menu a[href="' + path + '"], .menu a[href*="' + bodyClass + '"]');
  
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  if (document.querySelector('#jar')) {
    var svg = new Walkway({
      selector: '#jar',
      duration: 1000,
      easing: 'easeOutCubic'
    });

    particlesJS.load('particles-js', '/javascripts/particles.json', function() {
      var heroIcon = document.querySelector('.hero__icon');
      setTimeout(function() {
        heroIcon.classList.add('active');
        svg.draw(function() {
          document.querySelector('.hero').classList.add('active');
        });
      }, 100);
    });  
  }
})();