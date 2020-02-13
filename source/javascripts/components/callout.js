// show 'Submit your integration' callout when scrolling to bottom of page
(function() {
  'use-strict';
  $(window).on('scroll resize', function() {
    var $toc = $('.docs-toc');
    var $callout = $('.callout');

    if (!$toc.length) {
      return;
    }

    if ($toc.css('display') === 'none') {
      return $callout.hide();
    }

    if (Math.ceil($(window).scrollTop() + window.innerHeight) === $(document).height()) {
      $callout.slideDown();
    }

    $callout.css({left: $toc.offset().left});
  });

  $('.close-callout-btn').on('click', function() {
    $(this.parentElement).hide();
  });
})();
