
(function(w, d, $){

  if ($('.accordion__item').length > 0) {
    $('.accordion__item').on('click', function(event){
      event.preventDefault();

      var itemBody = $(this).find('.accordion__item-body');

      if (itemBody.is(':visible')) {
        $(this).removeClass('accordion__item--expanded');
        $(this).find('.icon__angle-down').removeClass('fa-angle-up').addClass('fa-angle-down');
        $(itemBody).hide('slow');
      } else {
        $(this).find('.icon__angle-down').removeClass('fa-angle-down').addClass('fa-angle-up');
        $('.accordion').find('.accordion__item--expanded').removeClass('accordion__item--expanded');
        $(this).addClass('accordion__item--expanded');
      }
    })
  }

  $('.nav-accordion').on('click', function(event){
    event.preventDefault();
    if ($(this).find('.nav__list').is(':visible')) {
      $(this).removeClass('nav-accordion--expanded');
    } else {
      $('.nav-accordion').find('.nav-accordion--expanded').removeClass('nav-accordion--expanded');
      $(this).addClass('nav-accordion--expanded');
      $('.nav-accordion').find('.hidden-xs').removeClass('hidden-xs');
    }

  })
  
  
})(window, document, jQuery);

