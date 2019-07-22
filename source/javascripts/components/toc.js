(function($) {
  if (!$('.doc__entry').length) {
    return;
  }

  var toc = $('.docs-toc');
  var tocList = toc.find('> ol').first();
  var tocHeadlines = $('h2, h3').not(':contains("Guidelines")');
  var tocGuidelines = $('h2').filter(':contains("Guidelines")');
  var prependText = 'section';

  $.merge(tocHeadlines, tocGuidelines).each(function() {
    var header = $(this).text();
    var id = header.replace(/\s/g, '-').replace(/[?,]/g, '').replace(/&/g, 'and').toLowerCase();

    $(this).attr('id', prependText + '-' + id);

    if (header.indexOf('Guidelines') === -1) {
      tocList.append('<li><a href="#' + prependText + '-' + id + '">' + header + '</a></li>');
    } else {
      toc.find('> ol').last().append('<li><a href="#' + prependText + '-' + id + '">' + header + '</a></li>');
    }

    if ($(this).prop('tagName') === 'H3') {
      var subheading = tocList.find('> li').last();
      subheading.prev().prop('tagName') !== 'UL' && tocList.append('<ul type="none"></ul>');
      toc.find('ul').last().append(subheading);
    }
  });

  if (!tocGuidelines.length) {
    tocList.nextAll().remove();
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
