$(function() {

  var 
      views = 2, // Количество видимых элементов
      items = $('.bag-show_i').length,
      range = {
        min: 0,
        max: views - 1
      };

  // Если количество больше views то показываем контролы
  if (items > views) $('.bag-show_controls').show();

  viewsItems(range);

  $('.bag-show_control').click(function() {

    $(this).attr('data-action') == 'up' ? up(range) : down(range, items);
    
    viewsItems(range);

    $('.bag-show_control').removeClass('bag-show_control__current');
    if (range.min == 0) $('.bag-show_control__up').addClass('bag-show_control__current');
    if (range.max == items - 1) $('.bag-show_control__down').addClass('bag-show_control__current');

    return false;

  });

});

function viewsItems(range) {  
  $('.bag-show_i').hide();
  for(var i = range.min; i <= range.max; i++) {
    $( $('.bag-show_i')[i] ).show();
  }
}

function up(range) {
  if (range.min != 0) {
    range.min--;
    range.max--;
  }
}

function down(range, items) {
  if (range.max != items - 1) {
    range.min++;
    range.max++;
  }
}