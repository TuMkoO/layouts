$(function(){
  //Галерея товаров
  // $('.gallery').slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   fade: true,
  //   asNavFor: '.gallery-nav'
  // });
  // $('.gallery-nav').slick({
  //   slidesToShow: 7,
  //   slidesToScroll: 1,
  //   infinite: false,
  //   asNavFor: '.gallery',
  //   arrows: true,
  //   prevArrow: '<div class="glyphicon glyphicon-menu-left"></div>',
  //   nextArrow: '<div class="glyphicon glyphicon-menu-right"></div>',
  //   dots: false,
  //   centerMode: false,
  //   focusOnSelect: true,
  //   responsive: [
  //     {
  //       breakpoint: 1219,
  //       settings: {
  //         slidesToShow: 6,
  //       }
  //     },
  //     {
  //       breakpoint: 1199,
  //       settings: {
  //         slidesToShow: 5,
  //       }
  //     },
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         slidesToShow: 8,
  //       }
  //     },
  //     {
  //       breakpoint: 700,
  //       settings: {
  //         slidesToShow: 6,
  //       }
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 5,
  //       }
  //     },
  //     {
  //       breakpoint: 500,
  //       settings: {
  //         slidesToShow: 4,
  //       }
  //     },
  //     {
  //       breakpoint: 425,
  //       settings: {
  //         slidesToShow: 3,
  //       }
  //     },
  //     {
  //       breakpoint: 350,
  //       settings: {
  //         slidesToShow: 2,
  //       }
  //     },
  //   ]
  // });



  // Language select
  $(function(){
    $('.selectpicker').selectpicker();
  });
  // Phone country select
  // $(function(){
  //   $('.country-code').selectpicker({
  //     liveSearch: true,
  //     noneResultsText: 'По вашему запросу не найдено'
  //   });
  // });

  // Cars Select2
  // $(".maker").select2({
  //   placeholder: 'Maker',
  //   templateResult: formatState,
  // });
  // $(".rogue").select2({
  //   placeholder: 'Rogue'
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
  // }

  // Открытие-Закрытие Select2
  // $('.search-select').on('select2:open', function (e) {
  //   console.log('opened');
  // }).on('select2:closing', function(e) {
  //   console.log('closing');
  // });




  // Открытие-закрытие select2 (добавить класс к body, изменить border)
  $('.maker').on('select2:open', function (e) {
    $('.form-field-maker .select2-selection').css({'border' : '1px solid #fc0'});
    $('body').addClass('dropdown-open');

    $(document.createElement('div'))
      .addClass('select2-backdrop')
      .insertAfter($('.select2-container--open'));

  }).on('select2:closing', function(e) {
    $('.form-field-maker .select2-selection').css({'border' : '1px solid #d3d3d3'});
    $('body').removeClass('dropdown-open');
    $('.select2-backdrop').remove();
  });
  $('.rogue').on('select2:open', function (e) {
    $('.form-field-rogue .select2-selection').css({'border' : '1px solid #fc0'});
    $('body').addClass('dropdown-open');

    $(document.createElement('div'))
      .addClass('select2-backdrop')
      .insertAfter($('.select2-container--open'));
  }).on('select2:closing', function(e) {
    $('.form-field-rogue .select2-selection').css({'border' : '1px solid #d3d3d3'});
    $('body').removeClass('dropdown-open');
    $('.select2-backdrop').remove();
  });


  //не закрывать dropdown при клике
  $("body").on("click", ".select2-dropdown", function(e) {
    e.stopPropagation();
  });





  // Вывод итогового значения Year range picker
  $('#year-submit').click(function () {
    let minYear = $('#val-year1').val();
    let maxYear = $('#val-year2').val();
    $( "#valYear" ).text( minYear + '-' + maxYear );

    $(this).parents('.range-year').find('.dropdown-toggle').dropdown('toggle');

    $('body').removeClass('modal-open');

  });


  //Year range picker
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

  //Backdrop для Year Range
  $('.range-year').on('shown.bs.dropdown', function () {
    $(document.createElement('div'))
      .addClass('dropdown-backdrop custom-backdrop')
      .insertAfter($('.range-year-container'))
  });
  $("body").on("click", ".custom-backdrop", function(e) {
    $('body').removeClass('dropdown-open');
    $('.custom-backdrop').remove();
  });





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


  // Favourite Button
  $('.favme').click(function() {
    $(this).toggleClass('active');

    // счетчик количества отчетов
    let count = $('#fav-count').text();

    if ( $(this).hasClass('active') ) {
      $('#fav-count').text( +count + 1);
      //Сообщение о добавлении в избранное
      messageCreate ('Добавлено в избранное');
    } else {
      $('#fav-count').text(count - 1);
      //Сообщение об удалении избранного
      messageCreate ('Удалено из избранных');
    }

    //Проверка количества отчетов
    checkCountFav();

  });
  /* when a user clicks, toggle the 'is-animating' class */
  $(".favme").on('click touchstart', function(){
    $(this).toggleClass('is_animating');
  });
  /*when the animation is over, remove the class*/
  $(".favme").on('animationend', function(){
    $(this).toggleClass('is_animating');
  });

  // Favourite Button CarPage
  $('.favme-car').click(function () {
    if($(this).hasClass('active')) {
      $('.add-to').text('Remove from list');
    } else {
      $('.add-to').text('Add to watchlist');
    }
  });

  // //Создание System-message
  // function messageCreate (text) {
  //   $('#message-add-fav').remove();
  //   $('<div class="system-message" id="message-add-fav">' +
  //     '<div class="system-message__icon glyphicon glyphicon-ok"></div>' +
  //     '<div class="system-message__text" id="add-fav-text">'+ text +'</div>' +
  //     '</div>')
  //     .insertAfter($('.modal'));
  //
  //   setTimeout(function () {
  //     $('#message-add-fav').addClass('active');
  //   }, 0);
  //
  //   setTimeout(function () {
  //     $('#message-add-fav').removeClass('active');
  //   }, 1000);
  //
  //   setTimeout(function () {
  //     $('#message-add-fav').remove();
  //   }, 1100);
  // }

  //Проверка количества избранных авто при загрузке страницы
  $(document).ready(function() {
    checkCountFav();
    checkCountRep();
  });

  function checkCountFav () {
    let favCount = $('#fav-count').text();
    +favCount > 0 ? $('#fav-count').css({'display': 'block'}) : $('#fav-count').css({'display': 'none'});
  }
  function checkCountRep () {
    let repCount = $('#rep-count').text();
    +repCount > 0 ? $('#rep-count').css({'display': 'block'}) : $('#rep-count').css({'display': 'none'});
  }



  // Добавление удаление класса для body
  $('.dropdown-backdrop').on('click', function () {
    $('body').removeClass('modal-open');
  });
  $(".range-year-container").on('click', function () {
    $('body').addClass('dropdown-open');
  });
  $('.range-year').on('hidden.bs.dropdown', function () {
    $('body').removeClass('dropdown-open');
    console.log('hidden');
  });






  //Datepicker
  $(function () {
    // инициализация
    $("#datetimepicker1").datetimepicker({
      locale: 'ru',
      format: 'DD-MM-YYYY',
      minDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
    });
    $("#datetimepicker2").datetimepicker({
      locale: 'ru',
      format: 'DD-MM-YYYY',
      minDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
    });
    $("#datetimepicker1").on("dp.change", function (e) {
      const date = e.date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      $('#datetimepicker2').data("DateTimePicker").minDate(date);
    });
    $("#datetimepicker2").on("dp.change", function (e) {
      const date = e.date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      $('#datetimepicker1').data("DateTimePicker").maxDate(date);
    });
  });


  // View All button
  $('.view-all').click(function () {
    $('.checkbox-list').toggleClass('open');
    $('.view-all').hide();
  });


  //Копировать ссылку по клику
  $('#ref-btn').click(function copytext() {
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($('#ref-link').text()).select();
    document.execCommand("copy");
    $tmp.remove();
  });

  $('#share-btn').click(function () {

    //Скопировать текущую ссылку
    function copyToClipboard() {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val($(location).prop('href')).select();
      document.execCommand("copy");
      $temp.remove();
    }
    copyToClipboard();

    messageCreate('Ссылка скопирована');
  });

  //Галерея
  // $('#animated-thumbnials').lightGallery({
  //   thumbnail: true,
  //   selector: '.gallery-item',
  //   zoom: true
  // });


});


//Создание System-message
function messageCreate (text) {
  $('#message-add-fav').remove();
  $('<div class="system-message" id="message-add-fav">' +
    '<div class="system-message__icon glyphicon glyphicon-ok"></div>' +
    '<div class="system-message__text" id="add-fav-text">'+ text +'</div>' +
    '</div>')
    .insertAfter($('.modal'));

  setTimeout(function () {
    $('#message-add-fav').addClass('active');
  }, 0);

  setTimeout(function () {
    $('#message-add-fav').removeClass('active');
  }, 1000);

  setTimeout(function () {
    $('#message-add-fav').remove();
  }, 1100);
}




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



// For max-width: 475px
var mediaQuery = window.matchMedia("screen and (max-width: 475px)");
mediaQuery.addListener(mobile);
mobile(mediaQuery);

function mobile(mq) {
  var windowSize = mq.matches;
  if (windowSize) {
    //закрывать dropdown при клике на select2-container (Используется в качестве backdrop)
    $("body").on("click", ".select2-container", function() {
      $(".maker").select2("close");
      $(".rogue").select2("close");
    });


    //select2 with SlideDown
    $(document).ready(function() {
      init();
    });

    function init() {
      $(".maker").select2({
        placeholder: 'Maker',
        templateResult: formatState,
      });
      $(".rogue").select2({
        placeholder: 'Rogue',
      });

      $('.search-select').on('select2:open', function (e) {
        $('.select2-dropdown').hide();
        setTimeout(function() {
          jQuery('.select2-dropdown').slideDown(200);
        }, 0);
      }).on('select2:closing', function(e) {
        e.preventDefault();
        setTimeout(function() {
          jQuery('.select2-dropdown').slideUp(200, function() {
            close();
          });
        }, 0);
      });
    }
    function close() {
      $('.search-select').select2('destroy');
      init();
    }


  } else {

    //select2 with SlideDown
    $(document).ready(function() {
      init();
    });

    function init() {
      $(".maker").select2({
        placeholder: 'Maker',
        templateResult: formatState,
      });
      $(".rogue").select2({
        placeholder: 'Rogue',
      });

      $('.search-select').on('select2:open', function (e) {
        $('.select2-dropdown').hide();
        setTimeout(function() {
          jQuery('.select2-dropdown').slideDown(200);
        }, 0);
      }).on('select2:closing', function(e) {
        e.preventDefault();
        setTimeout(function() {
          jQuery('.select2-dropdown').slideUp(200, function() {
            close();
          });
        }, 0);
      });
    }
    function close() {
      $('.search-select').select2('destroy');
      init();
    }

    // $('#share-modal').on('shown.bs.modal', function () {
    //   $('#share-modal').modal('hide');
    //
    //   //Скопировать текущую ссылку
    //   function copyToClipboard() {
    //     var $temp = $("<input>");
    //     $("body").append($temp);
    //     $temp.val($(location).prop('href')).select();
    //     document.execCommand("copy");
    //     $temp.remove();
    //   }
    //   copyToClipboard();
    //
    //   messageCreate('Ссылка скопирована');
    //
    // });

  }

}

function formatState (state) {
  if (!state.id) {
    return state.text;
  }
  var digits = '555';
  var $state = $(
    '<div>' + state.text + '<span class="cars-list-count">' + digits + '</span>' + '</div>'
  );
  return $state;
}








// Phone country field

var input = document.querySelector("#phone"),
    errorMsg = document.querySelector("#error-msg"),
    validMsg = document.querySelector("#valid-msg");

// here, the index maps to the error code returned from getValidationError - see readme
var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

// initialise plugin
var iti = window.intlTelInput(input, {
  initialCountry: "ua",
  // dropdownContainer: "body",
  utilsScript: "js/utils.js?1603274336113"
});

var reset = function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
};

// on blur: validate
input.addEventListener('blur', function() {
  reset();
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      validMsg.classList.remove("hide");
    } else {
      input.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("hide");
    }
  }
});

// on keyup / change flag: reset
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);

// Добавить/удалить класс при открытии/закрытии для анимации
input.addEventListener("open:countrydropdown", function() {
  document.body.classList.add("iti-mobile-opened");
});
input.addEventListener("close:countrydropdown", function() {
  document.body.classList.remove("iti-mobile-opened");
});






