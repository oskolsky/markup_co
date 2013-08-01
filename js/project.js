// DOM READY
// ----------------------------------------------------------------------------------------------------
$(function() {

  $.stickyFooter(40);

  // Money format for price
  $('.js-price-format').each(function() {
    var price = parseInt($(this).text()).formatMoney();
    $(this).text(price);
  }); 

  $('.sub-menu_a__consultation').click(function() {
    // $('.consultation').slideToggle();
    if ($('.consultation').is(":visible") != true) {
      $('.consultation').slideDown();
      $(this).addClass('sub-menu_a__current');
    } else {
      $('.consultation').slideUp();
      $(this).removeClass('sub-menu_a__current');
    }
    return false;
  });

  $('.products-filter_title').find('a').click(function() {
    var $item = $(this).closest('.products-filter_item').find('.products-filter-nav');
    $item.toggle();
    if ($item.is(":visible") == true) {
      $(this).closest('.products-filter_title').removeClass('products-filter_title__close');
    } else {
      $(this).closest('.products-filter_title').addClass('products-filter_title__close');
    }
    return false;
  });

  // Products show slider
  $('.products-slider').hover(function() {
    $(this).find('.products-slider-footer').show();
  }, function() {
    $(this).find('.products-slider-footer').hide();
  });

  $('.products-slider, .zoom-slider').each(function() {
    var _this = $(this);
    _this.find('.slider').iosSlider({
      snapSlideCenter: true,
      snapToChildren: true,
      navPrevSelector: _this.find('.controls_i__prev'),
      navNextSelector: _this.find('.controls_i__next'),
      navSlideSelector: _this.find('.zoom-slider-buls_i'),
      onSlideComplete: function(args) {
        _this.find('.controls_i__prev, .controls_i__next').show();
        if(args.currentSlideNumber == 1) {
          _this.find('.controls_i__prev').hide();
        } else if(args.currentSliderOffset == args.data.sliderMax) {
          _this.find('.controls_i__next').hide();
        }
      },
      onSliderLoaded: function(args) {
        if (args.data.numberOfSlides > 1) {
          _this.find('.controls_i__next').show();
        }
      },
      onSlideChange: function(args) {
        _this.find('.zoom-slider-buls_i').removeClass('zoom-slider-buls_i__current');
        _this.find('.zoom-slider-buls_i:eq(' + (args.currentSlideNumber - 1) + ')').addClass('zoom-slider-buls_i__current');
      }
    });
  }); 

  // Products photo gallery
  var 
      color = 'green',
      path = '/img/fake/photo/';

  $('.product-view_a').click(function() {
    var src = $(this).attr('rel');
    $('.product-view').find('.product-view_thumb__current').removeClass('product-view_thumb__current');
    $(this).find('.product-view_thumb').addClass('product-view_thumb__current');
    $('.product-view_photo').attr('src', path + color + '/' + src);
    $('.product-view_photo').data('file', src);
    return false;
  });

  $('.product-view-color-palette_i').click(function() {
    $('.product-view-color-palette').find('.product-view-color-palette_img__current').removeClass('product-view-color-palette_img__current');
    $(this).find('.product-view-color-palette_img').addClass('product-view-color-palette_img__current');
    color = $(this).data('color');
    renderThumb(path, color);
    renderPrev(path, color);
    return false;
  });

});

// DOCUMENT SCROLL
// ----------------------------------------------------------------------------------------------------
$(window).scroll(function() {});

// WINDOW LOAD
// ----------------------------------------------------------------------------------------------------
$(window).load(function() {});

// WINDOW RESIZE
// ----------------------------------------------------------------------------------------------------
$(window).smartresize(function() {

  $.stickyFooter(40);

});

function renderThumb(path, color) {
  $('.product-view_thumb').each(function() {
    var file = $(this).data('file');
    $(this).attr('src', path + color + '/' + file);
  });
};

function renderPrev(path, color) {
  var file = $('.product-view_photo').data('file');
  $('.product-view_photo').attr('src', path + color + '/' + file);
};

// Custom function
Number.prototype.formatMoney = function(c, d, t){
  var n = this,
    c = c == undefined ? 0 : isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "," : d,
    t = t == undefined ? " " : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};