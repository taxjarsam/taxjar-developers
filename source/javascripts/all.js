//= require jquery-smooth-scroll/jquery.smooth-scroll
//= require fastclick
//= require particles.js/particles.js
//= require scrollspy
//= require_tree ./components

(function($) {
  var path = window.location.pathname;
  var bodyClass = document.body.classList[0];
  var activeLink = document.querySelector('.menu a[href="' + path + '"], .menu a[href*="' + bodyClass + '"]');
  var scrollSpy = new ScrollSpy('.docs', {
    nav: '.docs-toc li > a',
    className: 'active'
  });

  FastClick.attach(document.body);

  $('.docs-toc a').smoothScroll({ offset: -90 });

  if (activeLink) {
    activeLink.classList.add('active');
  }

  if (document.querySelector('#jar')) {
    particlesJS.load('particles-js', '/javascripts/particles.json');
  }
})(jQuery);
