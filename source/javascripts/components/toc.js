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
    var id = header.replace(/\s/g, '-').replace(/[?]/g, '').toLowerCase();

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
})(jQuery);
