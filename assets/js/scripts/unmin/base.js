(function(w, d, $){
  
  // DEFINE GLOBAL FUNCTIONS, VARIABLES & CONSTANTS
  /**
   * @param string triggerElm event listener/trigger
   * @param string event the DOM event
   * @param hiddenElement selector the hidden element
   *   
   * @return object
   */
  w.displayHiddenElement = function(triggerElm, event, hiddenElement) {
    $(triggerElm).on(event, function(){
      $(hiddenElement).show();
    })
  };
  
  /**
   * This function use Slick Slider plugin to create slideshow
   * http://kenwheeler.github.io/slick/
   *
   * @param string selector Selector of a element to initialize slideshow on
   *
   * @param object options Object of config
   
   * @return object
   */
  w.initSlickSlideshow = function(selector, options) {
    
    var defaultOptions = {
      dots: false,
      arrows: true,
      autoplay: true,
      infinite: true,
      speed: 500,
      autoplaySpeed: 4000,
      fade: true,
      cssEase: 'linear',
      prevArrow: '<a href="#" class="slider__nav slider__nav--prev">'+
      '<i class="fa fa-angle-left"></i>'+
      '</a>',
      nextArrow: '<a href="#" class="slider__nav slider__nav--next">'+
      '<i class="fa fa-angle-right"></i>'+
      '</a>'
    };
    
    options = $.extend(true, defaultOptions, options);
    
    var slider = $(selector).slick(options);
    
    return slider;
    
  };

  /**
   * This function use Slick Slider plugin to create Carousel
   * http://kenwheeler.github.io/slick/
   *
   * @param string selector Selector of a element to initialize Carousel on
   *
   * @param object options Object of config
   
   * @return object
   */
  w.initSlickCarousel = function(selector, options) {
    
    if (!selector) {
      selector = '.carousel';
    }
    
    var defaultOptions = {
      dots: false,
      arrows: true,
      autoplay: false,
      infinite: true,
      speed: 500,
      prevArrow: '<a href="#" class="carousel__nav carousel__nav--prev">'+
      '<i class="fa fa-angle-left"></i>'+
      '</a>',
      nextArrow: '<a href="#" class="carousel__nav carousel__nav--next">'+
      '<i class="fa fa-angle-right"></i>'+
      '</a>'

    };
    
    options = $.extend(true, defaultOptions, options);
    
    var slider = $(selector).slick(options);
    
    return slider;
    
  };
  
  /**
   * This function use Pikaday plugin to create datepicker on input field
   * https://github.com/dbushell/Pikaday
   *
   * Dependancy - Moment.js (http://momentjs.com/)
   *
   * @param string selector Selector of a input field on which
   * datepicker will be initialized
   *
   * @param object options Object of config
   
   * @return object
   */
  w.initDatepicker = function(selector, options) {
    
    if (typeof selector !== 'string') {
      console.error('selector is require for initDatepicker method');
      return false;
    }
    
    var defaults = {
      format: 'DD/MM/YYYY',
      minDate: new Date()
    };
    
    options = $.extend(true, defaults, options);
    
    $(selector).each(function(i, input){
      options.field = input;
      
      $(input).attr('autocomplete', 'off');
      
      var picker = new Pikaday(options);
      
    });
    
  };
  
  /**
   * This function create a tooltip for an element based on the data-tooltip
   * attribute
   *
   * @param string selector Selector of a element to initialize Tooltip on
   *
   * @return object
   */
  w.initTooltip = function(selector) { 
    
    var block = 'tooltip',
        blockSelector = '.'+block;

    $(d).on('mouseover', selector, function (e) {
      
      var self           = $(this),
          tooltipContent = self.data('tooltip');

      if (tooltipContent) {
      
        var compiledTooltip = '<div class="'+block+'">'+tooltipContent+'</div>';
        
        $(compiledTooltip).appendTo('body');
        
      };

    }).on('mouseleave', selector, function () {

      $(blockSelector).remove();
      
    }).on('mousemove', selector, function(e) {

      var mouseX = e.pageX, // X coordinates of cursor
          mouseY = e.pageY; // Y coordinates of cursor

      $(blockSelector).css({
        top: mouseY-50,
        left: mouseX - ($(blockSelector).width() / 2)
      });
      
    });
    
  };
  
  /**
   * Toggle the main navigation on mobile device when toggle button is clicked.
   *
   * @return void
   */
  
  function togglePrimaryNav() {
    
    var toggleBtnSel        = '.header__nav-toggler',
        toggleBtnActiveCls  = 'header__nav-toggler--active',
        targetActiveCls     = 'header__nav--shown',
        currentHashValue    = window.location.hash,
        menuActiveBlock     = 'menu-active',
        menuTriggerElmBlock = 'menu-toggle',
        menuElmSel          = '.header__nav-link, .header__nav-sub-menu-link';
        
    // if (currentHashValue == $(toggleBtnSel).attr('href')) {
    //   $(toggleBtnSel).addClass(toggleBtnActiveCls);
    // }
    
    // ADD/REMOVE MENU TOGGLE BLOCK FROM MENU ITEMS
    
    var toggleMenuBlock = function () {
      
      var menuItems = $(menuElmSel);
      
      if ($(window).width() < 992) {
        $(menuElmSel).addClass(menuTriggerElmBlock);
      } else if($(menuElmSel).hasClass(menuTriggerElmBlock)) {
        $('.'+menuTriggerElmBlock).removeClass(menuTriggerElmBlock);
      }
      
    };
    
    toggleMenuBlock();
    
    $(window).on('resize', function(){
      toggleMenuBlock();
    });

    $(d).on('click', toggleBtnSel, function(e){
      e.preventDefault();
      
      var self      = $(this),
          targetSel = self.attr('href'),
          hashVal   = '';
          
      if (!self.hasClass(toggleBtnActiveCls)) {
        
        $('body').addClass('no-scroll');
        self.addClass(toggleBtnActiveCls);
        $(targetSel).addClass(targetActiveCls);
        
        hashVal = targetSel;
        
      } else {
        
        $('body').removeClass('no-scroll');
        self.removeClass(toggleBtnActiveCls);
        $(targetSel).removeClass(targetActiveCls);
      }
      
      window.location.hash = hashVal;
      
    }).on('click', '.'+menuTriggerElmBlock, function(e) {
      e.preventDefault();
      
      var self = $(this);
      
      self.parents('li').addClass(menuActiveBlock);
      
    }).on('click', '.header__nav-sub-menu-back', function(e){
      e.preventDefault();
      var self = $(this);
      
      self.closest('.'+menuActiveBlock).removeClass(menuActiveBlock);
    });
    
  }
  
  /**
   * This function Hide/Show the taget element.
   *
   * @return void
   */
  
  function toggleElement() {
    
    var toggleBtnSel = '.toggle-elm';
        
    $(d).on('click', toggleBtnSel, function(e){
      e.preventDefault();
      
      var self         = $(this),
          targetSel    = self.attr('href'),
          btnActiveCls = self.attr('data-active-block');
          
          self.toggleClass(btnActiveCls);
          $(targetSel).toggleClass('hidden');
      
    });
    
  }
  
  
  /**
   * When element clicked page is scrolled to the top of given target
   *
   * @param string selector Selector of a element which is clicked
   *
   * @param string attr Selector of a target element defined as attribute value.
   *                    If left empty href will be default attribute
   
   * @return void
   */
  function triggerPageScroll(selector, attr) {
    
    if (!attr) attr = 'href';
    
    $(d).on('click', selector, function(e){
      e.preventDefault();
      
      var self      = $(this),
          targetSel = self.attr(attr);
          
      if (targetSel === '#') {
        
        $('html, body').delay(150).animate({
            scrollTop: 0
          }, {
            duration: 300, 
            easing: 'swing'
          }
        );
        
      } else {
        var target = $(targetSel);
        
        if (target.length > 0) {
          var scrollPoint = (target.offset().top - 150);
          
          $('html, body').delay(150).animate({
              scrollTop: scrollPoint
            }, {
              duration: 300, 
              easing: 'swing'
            }
          );
          
        }
            
      }
      
    });
    
  }

  /**

   * When element clicked a popup will show galleries of photos and videos
   *
   * @param string selector Selector of a element which is clicked
   *
   * @param string attr Selector of a target element defined as attribute value.
   *                    If left empty href will be default attribute
   
   * @return void
   */
  w.initSwipeBox = function(selector, options) {

    if (typeof selector !== 'string') {
      console.error('selector is required for initSwipeBox');
      return false;
    }

    var defaults = {
      selector: selector
    };

    options = $.extend(true, defaults, options);

    $(selector).swipebox(options);

  };

  
  
  /**
   * This function use Slick Slider plugin to create Gallery Slider
   * http://kenwheeler.github.io/slick/
   *
   * @param string selector Selector of a element to initialize Gallery Slider on
   *
   * @param object options Object of config
   
   * @return object
   */
  w.initSlickSlider = function(selector, options) {
    
    if (!selector) {
      selector = '.gallery_slider';
    }
    
    var defaultOptions = {
      dots: false,
      arrows: true,
      autoplay: false,
      infinite: true,
      speed: 500,
      prevArrow: '<a href="#" class="gallery-slider__nav gallery-slider__nav--prev"><i class="fa fa-angle-left"></i></a>',
      nextArrow: '<a href="#" class="gallery-slider__nav gallery-slider__nav--next"><i class="fa fa-angle-right"></i></a>'
    };
    
    options = $.extend(true, defaultOptions, options);
    
    var slider = $(selector).slick(options);
    
    return slider;
    
  };

   /**
   * A selector will be an anchor tag and will provide the href value which will be the id of the content
   *
   * @param string selector Selector of a element which is the anchor tag href value
   *
   * @return void
   */
  w.initScrollToSection = function(selector) {

    $(selector).click(function(e) {
      e.preventDefault();

      var elemId    = $(this).attr('href'),
          offset    = $(elemId).offset().top,
          newOffset = parseInt(offset) - 120;

        $('html, body').animate({
            scrollTop: newOffset
        }, 1500);

    });

  };

  /**
   * A div will show and hide when the selector is toggled
   *
   * @param string selector Selector of a element which is the link to toggle
   * @param string selector Element of a element which is the hidden div to toggle
   *
   * @return void
   */
  w.initFolded = function(selector, element) {

    $(selector).click(function(e) {
      e.preventDefault();

      var ths         = $(this),
          selectorTxt = $(element).is(':visible') ? ths.data('more') : ths.data('less'),
          folder      = ths.closest('div').find(element);

      folder.toggleClass('hide');
      ths.text(selectorTxt);
    });

  };
  
  /**
   * Creates an overlay element and insert a url from an href to an iframe
   * It removes the element when closed
   *
   * @param string Selector, a class of the link to open the overlay
   *
   * @return void
   */
  w.initIframeOverlay = function(selector){
    $(selector).click(function(e) {
      e.preventDefault();

      var ths = $(this),
          url = ths.attr('href'),
          closeBtn = 'overlay__close',
          overlayElement = $('<div id="overlay" class="overlay">' +
                             '<a href="#" class="'+ closeBtn +'">&times;</a>' +
                             '<div class="overlay__content">' +
                               '<iframe src="'+ url +'"  class="overlay__iframe" frameBorder="0"></iframe>' +
                             '</div>'+
                           '</div>');
          
      ths.after(overlayElement);
      overlayElement.show();

      $('.'+closeBtn).click(function(e) {
        e.preventDefault();
        overlayElement.remove();
      });
    });
  };

  /**
   * Stop the scroll of an element in a specific position
   *
   * @param string Selector, the floating element
   * @param string Bottom, the bottom element were the floating element will stop
   * @param string Top, the top position of the floating element
   *
   * @return void
   */
  w.initStopScroll = function(selector, bottom, top) {

    var $this = $(selector);

    if ($this.length == 1) {
      var $window      = $(window),
        $thisHeight    = parseInt($this.innerHeight()),
        $bottomElement = $(bottom).offset(),
        $pos           = parseInt($bottomElement.top) - ($thisHeight + 350);

      $window.scroll(function (e) {
        if ($window.scrollTop() > $pos) {
          $this.css({
            position: 'absolute',
            top: $pos
          });
        } else {
          $this.css({
            position: 'fixed',
            top: top
          });
        }
      });
    }

  };

   /* When element clicked page photo galley popup is opened
   *
   * @param string selector Selector of a element which is 
   * clicked
   
   * @return void
   */
  function initPageGallery(selector) {

    if (typeof selector !== 'string') {
      console.error('selector is required for initPageGallery');
      return false;
    }

    var slideElements = $('.banner-gallery__slide');

    var slides = [];

    slideElements.each(function(i, slideElement){
      slides.push({
        href: $(slideElement).attr('href')
      });      
    });

    $(d).on('click', selector, function(e){
      e.preventDefault();

      $.swipebox(slides);

    });

  }

  // DEFINE APP OBJECT & ITS CONSTRUCTOR METHOD

  w.app = {};
  
  w.app.init = function() {

    togglePrimaryNav();
    
    toggleElement();
    
    initSlickSlideshow('.banner__slider');
    
    initSlickCarousel('.carousel');
    
    triggerPageScroll('.footer__lower__scroll-btn');

    initSwipeBox('.swipebox');

    initPageGallery('.banner__gallery--btn');
    
    initTooltip('[data-tooltip]');
    
    initDatepicker('.has-datepicker');

    initSlickSlider('.gallery-slider');

    initScrollToSection('.scroll-content');  

    initFolded('.folded__link', '.folded__content');

    initIframeOverlay('.overlay__open');

    initStopScroll('.sidebar', '.bottom__content', 70);

    initStopScroll('.affix', '.affix-start-scolling', 'auto');

    displayHiddenElement(
      '.banner__photo-info__icon', 
      'click', 
      '.banner__photo-info__text'
    );

    initInteractiveMap('interactive-map');
    
    initGoogleMap('map-canvas', {
      lat: -43.530813,
      lng: 172.627921,
      zoom: 18,
      title: 'YHA Christchurch',
      infoWindowContent: '<h6>5 Worcester Boulevard Christchurch</h6>'
    });

    // INITIALIZE HOSTEL PAGE GALLERY
    initSlickCarousel('.gallery', {
      slidesToShow: 4,
      prevArrow: '',
      nextArrow: ''
    })

  };
  
})(window, document, jQuery);
