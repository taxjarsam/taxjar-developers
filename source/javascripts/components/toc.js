(function($) {
  if (!$('.doc__entry').length) {
    return;
  }

  var toc = $('.docs-toc');
  var tocHeadlines = $('h2').not(':contains("Guidelines")');
  var tocGuidelines = $('h2').filter(':contains("Guidelines")');
  var prependText = 'section';

  $.merge(tocHeadlines, tocGuidelines).each(function() {
    var header = $(this).text();
    var id = header.replace(/\s/g, '-').replace(/[?,]/g, '').replace(/&/g, 'and').toLowerCase();

    $(this).attr('id', prependText + '-' + id);

    if (header.indexOf('Guidelines') === -1) {
      toc.find('> ol').first().append('<li><a href="#' + prependText + '-' + id + '">' + header + '</a></li>');
    } else {
      toc.find('> ol').last().append('<li><a href="#' + prependText + '-' + id + '">' + header + '</a></li>');
    }
  });

  if (!tocGuidelines.length) {
    toc.find('> ol').first().nextAll().remove();
  }

  ScrollSpy.prototype.isInView = function (el) {
    var winH = this.winH,
      scrollTop = (this.doc.documentElement.scrollTop || this.doc.body.scrollTop),
      scrollBottom = scrollTop + winH,
      rect = el.getBoundingClientRect(),
      elTop = rect.top + scrollTop - 69,
      elBottom = elTop + el.offsetHeight;

    return (elTop < scrollBottom) && (elBottom > scrollTop);
  };

  var scrollSpy = new ScrollSpy('.docs', {
    nav: '.docs-toc li > a',
    className: 'active'
  });
})(jQuery);
