$(function(){

  // Language select
  $(function(){
    $('.selectpicker').selectpicker();
  });


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


  //Отображение placeholder в Select2
  $('body').on('input keyup', '.select2-search__field', function() {
    if ( $('.select2-search__field').val().length > 0 ) {
      $('.select2-search__field').css({'background': '#ffffff'});
    } else {
      $('.select2-search__field').css({'background': 'transparent'});
    }
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
  customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
    return "+" + selectedCountryData.dialCode;
  },
  nationalMode: false,
  utilsScript: "js/utils.js"
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






