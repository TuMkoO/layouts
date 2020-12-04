$(function(){

  // Language select
  $(function(){
    $('.selectpicker').selectpicker();
  });
  // Phone country select
  $(function(){
    $('.country-code').selectpicker({
      liveSearch: true,
      noneResultsText: 'По вашему запросу не найдено'
    });
  });

  $(function(){
    $('.maker').selectpicker({
      liveSearch: true,
      noneResultsText: 'По вашему запросу не найдено'
    });
  });

  $(function(){
    $('.rogue').selectpicker({
      liveSearch: true
    });
  });

  //Year range picker
  // $('#sel1').change(function() {
  //   const min = +$(this).val();
  //
  //   $('#sel2')
  //       .val((i, v) => Math.max(v, min))
  //       .children()
  //       .show()
  //       .filter((i, n) => +n.value < min)
  //       .hide();
  // }).change();
  // Вывод итогового значения Year range picker
  $('#year-submit').click(function () {
    let minYear = $('#val-year1').val();
    let maxYear = $('#val-year2').val();
    $( "#valYear" ).text( minYear + '-' + maxYear );

    $(this).parents('.range-year').find('.dropdown-toggle').dropdown('toggle');

    $('body').removeClass('noscroll');

  });


  //
  const years = {};
  const $bounds = $('[data-bound]')
    .on('input', 'input', e => update({ [e.delegateTarget.dataset.bound]: +e.target.value }))
    .on('click', '.years-item', e => update({ [e.delegateTarget.dataset.bound]: +e.target.dataset.year }));

  function setActiveYear($el, year) {
    $el
      .find('input')
      .val(year)
      .end()
      .find('.years-item')
      .removeClass('active')
      .filter((i, n) => +n.dataset.year === year)
      .addClass('active');
  }

  function update(data) {
    Object.assign(years, data);

    $bounds.each((i, n) => {
      const $items = $('.years-item', n);
      const min = +$items.first().data('year');
      const max = +$items.last().data('year');
      years[n.dataset.bound] = Math.min(max, Math.max(min, years[n.dataset.bound]));
    });

    years.max = Math.max(years.min, years.max);

    $bounds
      .each((i, n) => setActiveYear($(n), years[n.dataset.bound]))
      .filter((i, n) => n.dataset.bound === 'max')
      .find('.years-item')
      .show()
      .filter((i, n) => +n.dataset.year < years.min)
      .hide();
  }

  update({ min: 2017, max: 2019 });







  //Не закрывать Dropdown с классом .noclose
  $(document).on("click.bs.dropdown.data-api", ".noclose", function (e) { e.stopPropagation() });


  // Search width
  $('#hsearch-input').focus(function () {
    $('#hlogo').toggleClass('col-xs-3 hidden-xs');
    $('#hnav').toggleClass('col-xs-3 hidden-xs');
    $('#hsearch').toggleClass('col-xs-6 col-xs-12');
  });
  $('#hsearch-input').blur(function () {
    $('#hlogo').toggleClass('col-xs-3 hidden-xs');
    $('#hnav').toggleClass('col-xs-3 hidden-xs');
    $('#hsearch').toggleClass('col-xs-6 col-xs-12');
  });

  //Filter select
  // $('.maker').select2({
  //   placeholder: 'Maker',
  //   templateResult: formatState,
  //   // allowClear: true
  // });
  //
  // $('.rogue').select2({
  //   placeholder: 'Rogue',
  // });
  //
  // function formatState (state) {
  //   if (!state.id) {
  //     return state.text;
  //   }
  //   var digits = '555';
  //   var $state = $(
  //     '<div>' + state.text + '<span class="cars-list-count">' + digits + '</span>' + '</div>'
  //   );
  //   return $state;
  // };


  // Favorite Button
  $('.favme').click(function() {
    $(this).toggleClass('active');
  });
  /* when a user clicks, toggle the 'is-animating' class */
  $(".favme").on('click touchstart', function(){
    $(this).toggleClass('is_animating');
  });
  /*when the animation is over, remove the class*/
  $(".favme").on('animationend', function(){
    $(this).toggleClass('is_animating');
  });


  // Добавление удаление класса для body
  $('.dropdown-backdrop').on('click', function () {
    $('body').removeClass('noscroll');
  });
  $(".range-year-container").on('click', function () {
    $('body').addClass('noscroll');
  });
  $('.range-year').on('hidden.bs.dropdown', function () {
    $('body').removeClass('noscroll');
  });
  $('.maker-container').on('hidden.bs.dropdown', function () {
    $('body').removeClass('noscroll');
  });
  $('.rogue-container').on('hidden.bs.dropdown', function () {
    $('body').removeClass('noscroll');
  });
  $('.maker-container').on('shown.bs.dropdown', function () {
    $('body').addClass('noscroll');
  });
  $('.rogue-container').on('shown.bs.dropdown', function () {
    $('body').addClass('noscroll');
  });







});


//Показать пароль на странице входа
$('body').on('click', '.pass-control', function(){
  if ($('#auth-pass').attr('type') == 'password'){
    $(this).addClass('view');
    $('#auth-pass').attr('type', 'text');
  } else {
    $(this).removeClass('view');
    $('#auth-pass').attr('type', 'password');
  }
  return false;
});
//Показать пароль на странице регистрации
$('body').on('click', '.pass-control-2', function(){
  if ($('#auth-pass-2').attr('type') == 'password'){
    $(this).addClass('view');
    $('#auth-pass-2').attr('type', 'text');
  } else {
    $(this).removeClass('view');
    $('#auth-pass-2').attr('type', 'password');
  }
  return false;
});
$('body').on('click', '.pass-control-3', function(){
  if ($('#auth-pass-3').attr('type') == 'password'){
    $(this).addClass('view');
    $('#auth-pass-3').attr('type', 'text');
  } else {
    $(this).removeClass('view');
    $('#auth-pass-3').attr('type', 'password');
  }
  return false;
});


$("#auth-pass-3").on("keyup", function() { // Выполняем скрипт при изменении содержимого 2-го поля

  var value_input1 = $("#auth-pass-2"); // Получаем содержимое 1-го поля
  var value_input2 = $("#auth-pass-3"); // Получаем содержимое 2-го поля

  if(value_input1.val() != value_input2.val() ) { // Условие, если поля не совпадают

    $("#auth-pass-3-text").html("Пароли не совпадают!"); // Выводим сообщение
    // $("#submit").attr("disabled", "disabled"); // Запрещаем отправку формы

  } else { // Условие, если поля совпадают

    // $("#submit").removeAttr("disabled");  // Разрешаем отправку формы
    $(".error").html(""); // Скрываем сообщение

  }

});


// Преход на следующий input в поле ввода кода из email
$('.code-field__input').keyup(function(){
  if($(this).val().match(/^\d{1}$/)){
    $(this).next('.code-field__input').focus();
  }else{
    $(this).val('');
  }
});


// libphonenumber
$(".phone-num").keyup(function () {
  var val_old = $(this).val();

  let code = $(".country-code").children(".selectpicker").children(".filter-option").children(".flag-icon").data("code");
  console.log(code);

  var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  var PNF = libphonenumber.PhoneNumberFormat;
  var phoneNumber = phoneUtil.parseAndKeepRawInput(val_old, code);

  console.log(phoneUtil.format(phoneNumber, PNF.E164));
  // Result from isValidNumber().
  console.log(phoneUtil.isValidNumber(phoneNumber));
  // Format number in the international format.
  console.log(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL));

  // var newString = new libphonenumber.AsYouType('UA').input(val_old);
  var newString = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
  $(this).focus().val('').val(newString);

  if (phoneUtil.isValidNumber(phoneNumber)) {
    $('.invalid-feedback-phone').css({'display':'none'})
  } else {
    $('.invalid-feedback-phone').css({'display':'block'})
  }

});
