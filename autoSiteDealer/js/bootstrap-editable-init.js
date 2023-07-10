$(function(){

  //Editable Bootsrap fields
  $('#mastercard').editable({
    mode: 'inline',
    type: 'text',
    toggle: 'manual',
    emptytext: 'Card not found',
    pk: 1,
  });
  $('#mastercard-edit').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#mastercard').editable('toggle');
  });
  $('#visa').editable({
    mode: 'inline',
    type: 'text',
    toggle: 'manual',
    emptytext: 'Card not found',
    pk: 2,
  });
  $('#visa-edit').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#visa').editable('toggle');
  });


});
