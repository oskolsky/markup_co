$(function() {

  $('.dropdown-menu__right').remove();

  var 
      total = parseInt( $('#total').text() ),
      price = 0;

  $('.bag-items_remove').click(function() {
    var 
        itemID = $(this).prop('rel'),
    price  = parseInt( $('#' + itemID).data('price') );
    $('#' + itemID).remove()
    total = total - price;
    $('#total').text(total);
    return false;
  });

  $('.bag-items_count').find('input[type="text"]').keyup(function() {    

    if ($(this).val().length >= 1) {

      var 
          price = 0,
          count = 0,
          summ  = 0,
          total = 0;

      price = parseInt( $(this).closest('tr').data('price') ),
      count = parseInt( $(this).val()),

      summ = price * count;
      $(this).closest('tr').find('.bag-items_price').find('b').text(summ);
      
      $('.bag-items').find('tbody').find('tr').each(function() {
        price = parseInt( $(this).data('price') ),
        count = parseInt( $(this).find('input[type="text"]').val()),
        summ = price * count;
        total += summ;
      });

      $('#total').text(total);

    }

  });

});