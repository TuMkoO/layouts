/* ----------------- Start Document ----------------- */
(function($){
  "use strict";

  $(document).ready(function(){


    //Mobile menu
    $('.navbar-main-toggle').click(function () {
      $('body').toggleClass('menu-open');
      $('#bs-navbar-collapse-1').toggleClass('active');
    })
    $('.navbar-collapse-backdrop').click(function () {
      $('body').removeClass('menu-open');
      $('#bs-navbar-collapse-1').removeClass('active');
      $('#bs-navbar-collapse-1').collapse('hide');
    })


    // Responsive Nav Trigger
    $('.dashboard-responsive-nav-trigger').on('click', function(e){
      e.preventDefault();
      $(this).toggleClass('active');

      var dashboardNavContainer = $('body').find(".dashboard-nav");

      if( $(this).hasClass('active') ){
        $(dashboardNavContainer).addClass('active');
      } else {
        $(dashboardNavContainer).removeClass('active');
      }

    });


    //RadioBox Buy report
    $('.radio-item').click(function () {
      $('.radio-item').removeClass('active');
      $(this).addClass('active');
    });


    //Lost Password Button
    $('#lost-password').click(function () {
      $('#modal-tabs a[href="#reset"]').tab('show') // Select tab by name
    });


    //Read Dashboard-messages
    $('.messages-inbox-link').click(function () {
      $(this).parent('.messages-inbox-item').removeClass('unread');
      $(this).find('i').addClass('lst-hide');
      setTimeout(function(){
        $('.lst-hide').remove();
        console.log('235456');
      }, 300);
    });


    // Add to favourite
    $('.add-to-fav').click(function () {
      $(this).toggleClass('active');

      if ( $(this).hasClass('active') ) {
        $('.add-to-fav i').removeClass('fa-heart-o').addClass('fa-heart');

        //Сообщение о добавлении в избранное
        messageCreate ($('.add-to-fav').data('message-add'));
      } else {
        $('.add-to-fav i').removeClass('fa-heart').addClass('fa-heart-o');
        //Сообщение об удалении избранного
        messageCreate ($('.add-to-fav').data('message-del'));
      }
    });

    //
    $('.list-box-listing-delete').click(function (event) {
      event.preventDefault();
      //Сообщение об удалении избранного
      messageCreate ($('.list-box-listing-delete').data('message'));
    });


    //Создание System-message
    function messageCreate (text) {
      $('#message-add-fav').remove();
      $('<div class="system-message" id="message-add-fav">' +
        '<div class="system-message__icon"><i class="fa fa-check" aria-hidden="true"></i></div>' +
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


    /*----------------------------------------------------*/
    /*  Inline CSS replacement for backgrounds etc.
    /*----------------------------------------------------*/
    function inlineCSS() {

      // Common Inline CSS
      $(".main-search-container, section.fullwidth, .listing-slider .item, .listing-slider-small .item, .address-container, .img-box-background, .image-edge, .edge-bg").each(function() {
        var attrImageBG = $(this).attr('data-background-image');
        var attrColorBG = $(this).attr('data-background-color');

        if(attrImageBG !== undefined) {
          $(this).css('background-image', 'url('+attrImageBG+')');
        }

        if(attrColorBG !== undefined) {
          $(this).css('background', ''+attrColorBG+'');
        }
      });

    }

    // Init
    inlineCSS();

    function parallaxBG() {

      $('.parallax').prepend('<div class="parallax-overlay"></div>');

      $( ".parallax").each(function() {
        var attrImage = $(this).attr('data-background');
        var attrColor = $(this).attr('data-color');
        var attrOpacity = $(this).attr('data-color-opacity');

        if(attrImage !== undefined) {
          $(this).css('background-image', 'url('+attrImage+')');
        }

        if(attrColor !== undefined) {
          $(this).find(".parallax-overlay").css('background-color', ''+attrColor+'');
        }

        if(attrOpacity !== undefined) {
          $(this).find(".parallax-overlay").css('opacity', ''+attrOpacity+'');
        }

      });
    }

    parallaxBG();


    /*----------------------------------------------------*/
    /*  Select2
    /*----------------------------------------------------*/

    //Filters API

    var currentYearFrom = null;
    var currentYearTo = null;
    var currentYears = [];

    $.getJSON('https://test.amidstyle.com/?type=brands', function(data) {
      try {
        var brands = data.data.map(brand => `<option value="${brand.brand_id}">${brand.brand_name}</option>`);
        $(".select2-maker").html('<option></option>' + brands);
        $('.select2-maker').select2();
        $('.select2-model').select2();
        $('.select2-year-from').select2();
        $('.select2-year-to').select2();
        $('.select2-auction').select2({
          closeOnSelect: false
        });
        $('.select2-seller-type').select2({
          closeOnSelect: false
        });
        $('.select2-engine').select2({
          closeOnSelect: false
        });
        $('.select2-fuel').select2({
          closeOnSelect: false
        });
        $('.select2-driveline').select2({
          closeOnSelect: false
        });
        $('.select2-transmission').select2({
          closeOnSelect: false
        });
        $('.select2-run-drive').select2({
          closeOnSelect: false
        });
        $('.select2-starts').select2({
          closeOnSelect: false
        });

      } catch (e) {}
    });

    //выбор бренда
    $('.select2-maker').on('select2:select', function (e) {
      console.log('change brands');

      var brandVal = this.value;

      //получить список моделей
      $.getJSON(`https://test.amidstyle.com/?type=models&brand_id=${brandVal}`, function(data) {
        try {
          //разблокировать выбор моделей
          if (data.data.length > 0) {
            $('.select2-model').select2({
              disabled: false,
            });
          }
          //формируем список моделей
          var models = data.data.map(model => `<option value="${model.model_id}">${model.model_name}</option>`);
          $(".select2-model").html('<option></option>' + models);
          $('.select2-model').trigger('change');
        } catch (e) {}
      });

      //Сбросить поля года и остальных фильтров
      $('.select2-year-from').val(null).trigger('change');
      $('.select2-year-to').val(null).trigger('change');
      $('.select2-auction').val(null).trigger('change');
      $('.select2-seller-type').val(null).trigger('change');
      $('.select2-engine').val(null).trigger('change');
      $('.select2-fuel').val(null).trigger('change');
      $('.select2-driveline').val(null).trigger('change');
      $('.select2-transmission').val(null).trigger('change');
      $('.select2-run-drive').val(null).trigger('change');
      $('.select2-starts').val(null).trigger('change');

      //заблокировать поля года и остальных фильтров
      $('.select2-year-from').select2({
        disabled: true
      });
      $('.select2-year-to').select2({
        disabled: true
      });
      $('.select2-auction').select2({
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-seller-type').select2({
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-engine').select2({
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-fuel').select2({
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-driveline').select2({
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-transmission').select2({
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-run-drive').select2({
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-starts').select2({
        disabled: true,
        closeOnSelect: false
      });

      $('.filter-input').val('').prop("disabled",true);

    });


    //выбор модели
    $('.select2-model').on('select2:select', function (e) {
      console.log('change models');
      var modelVal = this.value;

      //Сбросить поля года и остальных фильтров
      $('.select2-year-from').val(null).trigger('change');
      $('.select2-year-to').val(null).trigger('change');
      $('.select2-auction').val(null).trigger('change');
      $('.select2-seller-type').val(null).trigger('change');
      $('.select2-engine').val(null).trigger('change');
      $('.select2-fuel').val(null).trigger('change');
      $('.select2-driveline').val(null).trigger('change');
      $('.select2-transmission').val(null).trigger('change');
      $('.select2-run-drive').val(null).trigger('change');
      $('.select2-starts').val(null).trigger('change');

      $('.filter-input').val('').prop("disabled",false);

      //получить список фильтров модели
      $.getJSON(`https://test.amidstyle.com/?type=filters&model_id=${modelVal}`, function(data) {
        try {
          //обновляем списки полей года
          if (data.data.years.length > 0) {

            //Массив выбранных годов
            currentYears = data.data.years;

            //разблокировать выбор года
            $('.select2-year-from').select2({
              disabled: false,
            });
            $('.select2-year-to').select2({
              disabled: false,
            });

            //формируем список Year From
            var yearsFrom = currentYears.map(yearFrom => `<option value="${yearFrom}">${yearFrom}</option>`);
            $(".select2-year-from").html('<option></option>' + yearsFrom);
            $('.select2-year-from').trigger('change');

            //формируем список Year To
            var yearsTo = currentYears.map(yearTo => `<option value="${yearTo}">${yearTo}</option>`);
            $(".select2-year-to").html('<option></option>' + yearsTo);
            $('.select2-year-to').trigger('change');

          } else {
            //заблокировать выбор года
            $('.select2-year-from').select2({
              disabled: true,
            });
            $('.select2-year-to').select2({
              disabled: true,
            });
          }

          //обновляем остальные списки полей
          function updateMultiSelectList(selector, selectList) {
            if (data.data[selectList].length > 0) {
              //разблокировать поле
              $(selector).select2({
                disabled: false,
                closeOnSelect: false
              });
              //формируем список
              var list = data.data[selectList].map(item => `<option value="${item}">${item}</option>`);
              $(selector).html('<option></option>' + list);
              $(selector).trigger('change');
            } else {
              //заблокировать поле
              $(selector).select2({
                disabled: true,
                closeOnSelect: false
              });
            }
          }

          updateMultiSelectList('.select2-auction', 'auctions');
          updateMultiSelectList('.select2-seller-type', 'sellers');
          updateMultiSelectList('.select2-engine', 'engines');
          updateMultiSelectList('.select2-fuel', 'fuels');
          updateMultiSelectList('.select2-driveline', 'drives');
          updateMultiSelectList('.select2-transmission', 'transmissions');
          updateMultiSelectList('.select2-run-drive', 'rundrive');
          updateMultiSelectList('.select2-starts', 'starts');

        } catch (e) {}
      });

    });

    //Range Year
    //Смена значения начального года
    $('.select2-year-from').on('select2:select', function (e) {
      //Значение выбранного минимального года
      currentYearFrom = this.value;
      currentYearTo = $('.select2-year-to').val();

      //сортируем список Year To
      var yearsToUpdated = currentYears.filter(item => item >= currentYearFrom).map(yearToUpdated => `<option value="${yearToUpdated}">${yearToUpdated}</option>`);
      $(".select2-year-to").html('<option></option>' + yearsToUpdated);
      $('.select2-year-to').trigger('change');
      if (+currentYearTo >= +currentYearFrom) {
        $('.select2-year-to').val(currentYearTo);
      } else if (+currentYearTo === 0) {
        $('.select2-year-to').val(null);
      } else {
        $('.select2-year-to').val(currentYearFrom);
      }
    });

    //Выбор конечно года
    $('.select2-year-to').on('select2:select', function (e) {
      currentYearTo = this.value;
      currentYearFrom = $('.select2-year-from').val();

      //сортируем список Year From
      var yearsFromUpdated = currentYears.filter(item => item <= currentYearTo).map(yearFromUpdated => `<option value="${yearFromUpdated}">${yearFromUpdated}</option>`);
      $(".select2-year-from").html('<option></option>' + yearsFromUpdated);
      $('.select2-year-from').trigger('change');
      if (+currentYearFrom >= +currentYearTo) {
        $('.select2-year-from').val(currentYearTo);
      } else if (+currentYearFrom === 0) {
        $('.select2-year-from').val(Math.min.apply(Math, currentYears.filter(item => +item <= +currentYearTo).map(item => +item)));
      } else {
        $('.select2-year-from').val(currentYearFrom);
      }
    });


    //Добавить Placeholder в search input, кнопки Назад и Применить
    function addSelect2(selector, applyBtn, searchInputPlaceholder, searchMultiPlaceholder) {
      $(selector).on('select2:open', function (e) {
        $('body').addClass('select2-open');

        if(searchInputPlaceholder) {
          $('input.select2-search__field').prop('placeholder', $(selector).data('search-placeholder'));
        }

        if(searchMultiPlaceholder) {
          $(selector).next('.select2-container').find('.select2-search__field').prop('placeholder', $(selector).data('placeholder'));
        }

        $('.select2-dropdown').addClass('select2-wrapper');

        $('.select2-wrapper').prepend('<div class="select2-close-wrapper"><a href="#" class="select2-close-btn">'+ $(selector).data('btn-back') +'</a></div>');
        if(applyBtn) {
          $('.select2-wrapper').append('<div class="select2-apply"><button class="btn select2-apply-btn">'+ $(selector).data('btn-apply') +'</button></div>');
        }
        $('.select2-close-btn').on('click', function () {
          event.preventDefault();
          $(selector).select2('close');
        });
        $('.select2-apply-btn').on('click', function () {
          event.preventDefault();
          $(selector).select2('close');
          $('.select2-search__field').blur();

        });

        if ( $(window).width() < 575 ) {
          $('.select2-search__field').blur();

          // $('.select2-search__field').bind('focusin focus', function(e){
          //   e.preventDefault();
          // })

          // $('.select2-search__field').onfocus = function () {
          //   window.scrollTo(0, 0);
          //   document.body.scrollTop = 0;
          // }

          // var oldScroll = $(window).scrollTop();
          //
          // $( window ).one('scroll', function() {
          //   $(window).scrollTop( oldScroll ); //disable scroll just once
          // });
          //
          // $('.select2-search__field').focus();

        }


      });
      $(selector).on('select2:closing', function (e) {
        $('.select2-close-wrapper').remove();
        if(applyBtn) {
          $('.select2-apply').remove();
        }

        if( $(selector).next('.select2-container').find('.select2-selection__rendered').width() >= $(selector).next('.select2-container').find('.select2-selection--multiple').width()  ) {
          $(selector).next('.select2-container').find('.select2-selection--multiple').addClass('too-long');
          $(selector).next('.select2-container').find('.select2-selection__rendered').addClass('too-long');
        } else {
          $(selector).next('.select2-container').find('.select2-selection--multiple').removeClass('too-long');
          $(selector).next('.select2-container').find('.select2-selection__rendered').removeClass('too-long');
        }

        console.log(  );
      });
      $(selector).on('select2:close', function (e) {
        $('body').removeClass('select2-open');
        $('.select2-close-wrapper').remove();
        if(applyBtn) {
          $('.select2-apply').remove();
        }
      });
    }
    addSelect2('.select2-maker', false, true, false);
    addSelect2('.select2-model', false, true, false);
    addSelect2('.select2-year-from', false, true, false);
    addSelect2('.select2-year-to', false, true, false);
    addSelect2('.select2-auction', true, false, true);
    addSelect2('.select2-seller-type', true, false, true);
    addSelect2('.select2-engine', true, false, true);
    addSelect2('.select2-fuel', true, false, true);
    addSelect2('.select2-driveline', true, false, true);
    addSelect2('.select2-transmission', true, false, true);
    addSelect2('.select2-run-drive', true, false, true);
    addSelect2('.select2-starts', true, false, true);


    /*----------------------------------------------------*/
    /*  100vh fix
    /*----------------------------------------------------*/

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });


    /*----------------------------------------------------*/
    /*  Filters Show More
    /*----------------------------------------------------*/
    $('#filters-btn').click(function () {
      $('.filters-more').toggleClass('open');

      if ($('.filters-more').hasClass('open')) {
        $('#filters-btn>span').text('Less Filters');
      } else {
        $('#filters-btn>span').text('Other Filters');

        $('html, body').animate({
          // класс объекта к которому приезжаем
          // scrollTop: $("#filters-btn").offset().top
          scrollTop: $("#filters-btn").offset().top - $(window).height() + 100
        }, 1000); // Скорость прокрутки

      }

    });


    /*----------------------------------------------------*/
    /*  Slick Carousel
    /*----------------------------------------------------*/


    $('.listing-slider').slick({
      centerMode: true,
      centerPadding: '20%',
      slidesToShow: 2,
      responsive: [
        {
          breakpoint: 1367,
          settings: {
            centerPadding: '15%'
          }
        },
        {
          breakpoint: 1025,
          settings: {
            centerPadding: '0'
          }
        },
        {
          breakpoint: 767,
          settings: {
            centerPadding: '0',
            slidesToShow: 1
          }
        }
      ]
    });



    /*----------------------------------------------------*/
    /*  Magnific Popup
    /*----------------------------------------------------*/

    $('.mfp-gallery-container').each(function() { // the containers for all your galleries

      $(this).magnificPopup({
        type: 'image',
        delegate: 'a.mfp-gallery',

        fixedContentPos: true,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: false,
        preloader: true,

        removalDelay: 0,
        mainClass: 'mfp-fade',

        gallery:{enabled:true, tCounter: ''}
      });
    });






// ------------------ End Document ------------------ //
  });

})(this.jQuery);
