$(function(){

  // Language select
  $(function(){
    $('.selectpicker').selectpicker();
  });
  // Phone country select
  $(function(){
    $('.country-code').selectpicker({
      liveSearch: true
    });
  });

  //Year range picker
  $('#sel1').change(function() {
    const min = +$(this).val();

    $('#sel2')
        .val((i, v) => Math.max(v, min))
        .children()
        .show()
        .filter((i, n) => +n.value < min)
        .hide();
  }).change();
  // Вывод итогового значения Year range picker
  $('#year-submit').click(function () {
    let minYear = $('#sel1').val();
    let maxYear = $('#sel2').val();
    $( "#valYear" ).text( minYear + '-' + maxYear );

    $(this).parents('.range-year').find('.dropdown-toggle').dropdown('toggle')

  });

  //Не закрывать Dropdown с классом .noclose
  $(document).on("click.bs.dropdown.data-api", ".noclose", function (e) { e.stopPropagation() });


  // Search width
  $('#hsearch-input').focus(function () {
    $('#hlogo').toggleClass('col-xs-3 hidden-xs');
    $('#hnav').toggleClass('col-xs-3 hidden-xs');
    $('#hsearch').toggleClass('col-xs-6 col-xs-12');
  })
  $('#hsearch-input').blur(function () {
    $('#hlogo').toggleClass('col-xs-3 hidden-xs');
    $('#hnav').toggleClass('col-xs-3 hidden-xs');
    $('#hsearch').toggleClass('col-xs-6 col-xs-12');
  })

  //Filter select
  $('.maker').select2({
    placeholder: 'Maker',
    templateResult: formatState,
    // allowClear: true
  });

  $('.rogue').select2({
    placeholder: 'Rogue',
  });

  function formatState (state) {
    if (!state.id) {
      return state.text;
    }
    var digits = '555';
    var $state = $(
      '<div>' + state.text + '<span class="cars-list-count">' + digits + '</span>' + '</div>'
    );
    return $state;
  };


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

//Проверка совпадения паролей
// $('#auth-pass-3').change(function() {
//   let pass = $("#auth-pass-2").val();
//   let pass_rep = $("#auth-pass-3").val();
//
//   console.log(pass);
//   console.log(pass_rep);
//
//   if (pass !== pass_rep && pass_rep !== pass) {
//     // $("#auth-pass-3").css('border', 'red 1px solid');
//     $('#auth-pass-3-text').html('Пароли не совпадают');
//   }
// });


// var min_length = 6;//минимальная длина пароля
// function passValid (form, pass1, pass12, submit)//проверка длины пароля
// {
//   PASS12 = document.getElementById(pass12);//индикатор длины пароля
//   PASS1count = document.forms[form].pass1.value.length;//количество символов в пароле
//   MARG_LEFT = 10*PASS1count-100;//высчитываем смещение индикатора в зависимости от количества символов в пароле
//   if(MARG_LEFT<0)//если индикатор не полностью выдвинут, тогда выдвигаем
//   {
//     PASS12.style.marginLeft=MARG_LEFT+"px";
//   }
//   if(MARG_LEFT>=0)//если индикатор полностью выдвинут, тогда не выдвигаем
//   {
//     PASS12.style.marginLeft="0px";
//   }
// //задаем цвет индикатора в зависимости от количества символов
//   if(PASS1count<4){PASS12.style.background="#f00";}
//   else if((PASS1count>=4) && (PASS1count<6)){PASS12.style.background="#FF9F00";}
//   else if((PASS1count>=6) && (PASS1count<8)){PASS12.style.background="#CBFE01";}
//   else if((PASS1count>=8)){PASS12.style.background="#0EFE01";}
// }
//
// function isRavno(form, pass1, pass2, pass22, submit)//сравниваем пароли
// {
//   PASS1=document.forms[form].pass1.value;//первый пароль
//   PASS1count=document.forms[form].pass1.value.length;//количество символов в 1 пароле
//   PASS2=document.forms[form].pass2.value;//второй пароль
//   PASS22=document.getElementById(pass22);//индикатор совпадения паролей
//   SUBMIT=document.forms[form].submit; //кнопка отправки формы
//   if(PASS1==PASS2)//если совпадают формируем индикатор совпадения паролей
//   {
//     PASS22.style.border="1px solid #446B01";
//     PASS22.style.background="#E0FFB3";
//     PASS22.style.color="#558701";
//     PASS22.innerHTML="Пароли совпадают";
//
// //если количество символов в пароле больше или равно минимальной длине, делаем кнопку отправки активной
//     if(PASS1count>=min_length)
//       SUBMIT.disabled=0;
//   }
//   else //если не совпадают формируем индикатор совпадения паролей
//   {
//     PASS22.style.border="1px solid #A40004";
//     PASS22.style.background="#FFD7E9";
//     PASS22.style.color="#D5172B";
//     PASS22.innerHTML="Пароли не совпадают";
//     SUBMIT.disabled=1;// делаем кнопку отправки не активной
//   }
// }


$("#auth-pass-3").on("keyup", function() { // Выполняем скрипт при изменении содержимого 2-го поля

  // var value_input1 = $("#auth-pass-2").val(); // Получаем содержимое 1-го поля
  // var value_input2 = $(this).val(); // Получаем содержимое 2-го поля
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




//
// var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
// var PNF = libphonenumber.PhoneNumberFormat;
// var phoneNumber = phoneUtil.parseAndKeepRawInput('0990525110', 'UA');
//
// console.log(phoneUtil.format(phoneNumber, PNF.E164));
// // Result from isValidNumber().
// console.log(phoneUtil.isValidNumber(phoneNumber));
//
// // Format number in the international format.
// console.log(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL));
//
// const AsYouTypeFormatter = libphonenumber.AsYouTypeFormatter;
// const formatter = new AsYouTypeFormatter('UA');


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
