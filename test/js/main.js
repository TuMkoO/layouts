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
        messageCreate ('Добавлено в избранное');
      } else {
        $('.add-to-fav i').removeClass('fa-heart').addClass('fa-heart-o');
        //Сообщение об удалении избранного
        messageCreate ('Удалено из избранных');
      }
    });

    //
    $('.list-box-listing-delete').click(function (event) {
      event.preventDefault();
      //Сообщение об удалении избранного
      messageCreate ('Удалено из избранных');
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


    $('.select2-maker').select2({
      placeholder: 'Select Maker',
    });
    $('.select2-model').select2({
      placeholder: 'Select Model',
    });
    $('.select2-year-from').select2({
      placeholder: 'Year From',
    });
    $('.select2-year-to').select2({
      placeholder: 'Year To',
    });
    $('.select2-auction').select2({
      placeholder: 'Auction',
      closeOnSelect: false
    });
    $('.select2-seller-type').select2({
      placeholder: 'Seller Type',
      closeOnSelect: false
    });
    $('.select2-engine').select2({
      placeholder: 'Engine',
      closeOnSelect: false
    });
    $('.select2-fuel').select2({
      placeholder: 'Fuel',
      closeOnSelect: false
    });
    $('.select2-driveline').select2({
      placeholder: 'Driveline',
      closeOnSelect: false
    });
    $('.select2-transmission').select2({
      placeholder: 'Transmission',
      closeOnSelect: false
    });
    $('.select2-run-drive').select2({
      placeholder: 'Run & Drive',
      closeOnSelect: false
    });
    $('.select2-starts').select2({
      placeholder: 'Starts',
      closeOnSelect: false
    });

    //Filters API

    $.getJSON('http://test.amidstyle.com/?type=brands', function(data) {
      try {
        var brands = data.data.map(brand => `<option value="${brand.brand_id}">${brand.brand_name}</option>`);
        $(".select2-maker").html('<option></option>' + brands);
        $('.select2-maker').select2({
          placeholder: 'Select Maker',
        });
        $('.select2-model').select2({
          placeholder: 'Select Model',
        });
        $('.select2-year-from').select2({
          placeholder: 'Year From',
        });
        $('.select2-year-to').select2({
          placeholder: 'Year To',
        });
        $('.select2-auction').select2({
          placeholder: 'Auction',
          closeOnSelect: false
        });
        $('.select2-seller-type').select2({
          placeholder: 'Seller Type',
          closeOnSelect: false
        });
        $('.select2-engine').select2({
          placeholder: 'Engine',
          closeOnSelect: false
        });
        $('.select2-fuel').select2({
          placeholder: 'Fuel',
          closeOnSelect: false
        });
        $('.select2-driveline').select2({
          placeholder: 'Driveline',
          closeOnSelect: false
        });
        $('.select2-transmission').select2({
          placeholder: 'Transmission',
          closeOnSelect: false
        });
        $('.select2-run-drive').select2({
          placeholder: 'Run & Drive',
          closeOnSelect: false
        });
        $('.select2-starts').select2({
          placeholder: 'Starts',
          closeOnSelect: false
        });


      } catch (e) {}
    });

    //выбор бренда
    $('.select2-maker').on('select2:select', function (e) {
      console.log('change brands');

      var brandVal = this.value;

      //получить список моделей
      $.getJSON(`http://test.amidstyle.com/?type=models&brand_id=${brandVal}`, function(data) {
        try {
          //разблокировать выбор моделей
          if (data.data.length > 0) {
            $('.select2-model').select2({
              placeholder: 'Select Model',
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
        placeholder: 'Year From',
        disabled: true
      });
      $('.select2-year-to').select2({
        placeholder: 'Year To',
        disabled: true
      });
      $('.select2-auction').select2({
        placeholder: 'Auction',
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-seller-type').select2({
        placeholder: 'Seller Type',
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-engine').select2({
        placeholder: 'Engine',
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-fuel').select2({
        placeholder: 'Fuel',
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-driveline').select2({
        placeholder: 'Driveline',
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-transmission').select2({
        placeholder: 'Transmission',
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-run-drive').select2({
        placeholder: 'Run & Drive',
        disabled: true,
        closeOnSelect: false
      });
      $('.select2-starts').select2({
        placeholder: 'Starts',
        disabled: true,
        closeOnSelect: false
      });
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

      //получить список фильтров модели
      $.getJSON(`http://test.amidstyle.com/?type=filters&model_id=${modelVal}`, function(data) {
        try {
          console.log(data.data.years.length > 0);

          //обновляем списки полей года
          if (data.data.years.length > 0) {
            //разблокировать выбор года
            $('.select2-year-from').select2({
              placeholder: 'Year From',
              disabled: false,
            });
            $('.select2-year-to').select2({
              placeholder: 'Year To',
              disabled: false,
            });

            //формируем список Year From
            var yearsFrom = data.data.years.map(yearFrom => `<option value="${yearFrom}">${yearFrom}</option>`);
            $(".select2-year-from").html('<option></option>' + yearsFrom);
            $('.select2-year-from').trigger('change');

            //формируем список Year To
            var yearsTo = data.data.years.map(yearTo => `<option value="${yearTo}">${yearTo}</option>`);
            $(".select2-year-to").html('<option></option>' + yearsTo);
            $('.select2-year-to').trigger('change');

          } else {
            //заблокировать выбор года
            $('.select2-year-from').select2({
              placeholder: 'Year From',
              disabled: true,
            });
            $('.select2-year-to').select2({
              placeholder: 'Year To',
              disabled: true,
            });
          }

          //обновляем остальные списки полей
          if (data.data.auctions.length > 0) {
            //разблокировать поле
            $('.select2-auction').select2({
              placeholder: 'Auction',
              disabled: false,
              closeOnSelect: false
            });
            //формируем список
            var auctions = data.data.auctions.map(auction => `<option value="${auction}">${auction}</option>`);
            $(".select2-auction").html('<option></option>' + auctions);
            $('.select2-auction').trigger('change');
          } else {
            //заблокировать поле
            $('.select2-auctions').select2({
              placeholder: 'Auction',
              disabled: true,
              closeOnSelect: false
            });
          }

          if (data.data.sellers.length > 0) {
            //разблокировать поле
            $('.select2-seller-type').select2({
              placeholder: 'Seller Type',
              disabled: false,
              closeOnSelect: false
            });
            //формируем список
            var sellers = data.data.sellers.map(seller => `<option value="${seller}">${seller}</option>`);
            $(".select2-seller-type").html('<option></option>' + sellers);
            $('.select2-seller-type').trigger('change');
          } else {
            //заблокировать поле
            $('.select2-seller-type').select2({
              placeholder: 'Seller Type',
              disabled: true,
              closeOnSelect: false
            });
          }

          if (data.data.engines.length > 0) {
            //разблокировать поле
            $('.select2-engine').select2({
              placeholder: 'Engine',
              disabled: false,
              closeOnSelect: false
            });
            //формируем список
            var engines = data.data.engines.map(engine => `<option value="${engine}">${engine}</option>`);
            $(".select2-engine").html('<option></option>' + engines);
            $('.select2-engine').trigger('change');
          } else {
            //заблокировать поле
            $('.select2-engine').select2({
              placeholder: 'Engine',
              disabled: true,
              closeOnSelect: false
            });
          }

          if (data.data.fuels.length > 0) {
            //разблокировать поле
            $('.select2-fuel').select2({
              placeholder: 'Fuel',
              disabled: false,
              closeOnSelect: false
            });
            //формируем список
            var fuels = data.data.fuels.map(fuel => `<option value="${fuel}">${fuel}</option>`);
            $(".select2-fuel").html('<option></option>' + fuels);
            $('.select2-fuel').trigger('change');
          } else {
            //заблокировать поле
            $('.select2-fuel').select2({
              placeholder: 'Fuel',
              disabled: true,
              closeOnSelect: false
            });
          }

          if (data.data.drives.length > 0) {
            //разблокировать поле
            $('.select2-driveline').select2({
              placeholder: 'Driveline',
              disabled: false,
              closeOnSelect: false
            });
            //формируем список
            var drives = data.data.drives.map(driveline => `<option value="${driveline}">${driveline}</option>`);
            $(".select2-driveline").html('<option></option>' + drives);
            $('.select2-driveline').trigger('change');
          } else {
            //заблокировать поле
            $('.select2-driveline').select2({
              placeholder: 'Driveline',
              disabled: true,
              closeOnSelect: false
            });
          }

          if (data.data.transmissions.length > 0) {
            //разблокировать поле
            $('.select2-transmission').select2({
              placeholder: 'Transmission',
              disabled: false,
              closeOnSelect: false
            });
            //формируем список
            var transmissions = data.data.transmissions.map(transmission => `<option value="${transmission}">${transmission}</option>`);
            $(".select2-transmission").html('<option></option>' + transmissions);
            $('.select2-transmission').trigger('change');
          } else {
            //заблокировать поле
            $('.select2-transmission').select2({
              placeholder: 'Transmission',
              disabled: true,
              closeOnSelect: false
            });
          }

          if (data.data.rundrive.length > 0) {
            //разблокировать поле
            $('.select2-run-drive').select2({
              placeholder: 'Run & Drive',
              disabled: false,
              closeOnSelect: false
            });
            //формируем список
            var rundrive = data.data.rundrive.map(rd => `<option value="${rd}">${rd}</option>`);
            $(".select2-run-drive").html('<option></option>' + rundrive);
            $('.select2-run-drive').trigger('change');
          } else {
            //заблокировать поле
            $('.select2-run-drive').select2({
              placeholder: 'Run & Drive',
              disabled: true,
              closeOnSelect: false
            });
          }

          if (data.data.starts.length > 0) {
            //разблокировать поле
            $('.select2-starts').select2({
              placeholder: 'Starts',
              disabled: false,
              closeOnSelect: false
            });
            //формируем список
            var starts = data.data.starts.map(start => `<option value="${start}">${start}</option>`);
            $(".select2-starts").html('<option></option>' + starts);
            $('.select2-starts').trigger('change');
          } else {
            //заблокировать поле
            $('.select2-starts').select2({
              placeholder: 'Starts',
              disabled: true,
              closeOnSelect: false
            });
          }


        } catch (e) {}
      });

    });

    function addSelect2(selector, applyBtn) {
      $(selector).on('select2:opening', function (e) {
        // e.preventDefault();
      });

      $(selector).on('select2:open', function (e) {
        $('body').addClass('select2-open');
        $('.select2-dropdown.select2-dropdown--below').addClass('select2-wrapper');
        $('.select2-wrapper').prepend('<div class="select2-close-btn">Назад</div>');
        if(applyBtn) {
          $('.select2-wrapper').append('<div class="select2-apply"><button class="btn select2-apply-btn">Применить</button></div>');
        }
        $('.select2-close-btn').on('click', function () {
          $(selector).select2('close');
        });
        $('.select2-apply-btn').on('click', function () {
          $(selector).select2('close');
        });

      });
      $(selector).on('select2:closing', function (e) {
        $('.select2-close-btn').remove();
        if(applyBtn) {
          $('.select2-apply').remove();
        }
      });
      $(selector).on('select2:close', function (e) {
        $('body').removeClass('select2-open');
        $('.select2-close-btn').remove();
        if(applyBtn) {
          $('.select2-apply').remove();
        }
      });
    }
    addSelect2('.select2-maker', false);
    addSelect2('.select2-model', false);
    addSelect2('.select2-year-from', false);
    addSelect2('.select2-year-to', false);
    addSelect2('.select2-auction', true);
    addSelect2('.select2-seller-type', true);
    addSelect2('.select2-engine', true);
    addSelect2('.select2-fuel', true);
    addSelect2('.select2-driveline', true);
    addSelect2('.select2-transmission', true);
    addSelect2('.select2-run-drive', true);
    addSelect2('.select2-starts', true);



    //добавить класс к body при открытии селекта
    // $('.select2-maker').on('select2:open', function (e) {
    //   $('body').addClass('select2-open');
    //   $('.select2-dropdown.select2-dropdown--below').addClass('select2-wrapper');
    //   // $('.select2-container--open .select2-dropdown.select2-dropdown--below').prepend('<div class="select2-close-btn"></div>');
    // });
    // $('.select2-maker').on('select2:close', function (e) {
    //   $('body').removeClass('select2-open');
    // });
    // $('.select2-model').on('select2:open', function (e) {
    //   $('body').addClass('select2-open');
    //   $('.select2-dropdown.select2-dropdown--below').addClass('select2-wrapper');
    //   $('.select2-wrapper').prepend('<div class="select2-close-btn"></div>');
    //   $('.select2-close-btn').on('click', function () {
    //     $('.select2-model').select2('close');
    //   });
    // });
    // $('.select2-model').on('select2:closing', function (e) {
    //   $('.select2-close-btn').remove();
    // });
    // $('.select2-model').on('select2:close', function (e) {
    //   $('body').removeClass('select2-open');
    //   $('.select2-close-btn').remove();
    // });


    // $('.select2-year-from').on('select2:open', function (e) {
    //   $('body').addClass('select2-open');
    // });
    // $('.select2-year-from').on('select2:close', function (e) {
    //   $('body').removeClass('select2-open');
    // });
    // $('.select2-year-to').on('select2:open', function (e) {
    //   $('body').addClass('select2-open');
    // });
    // $('.select2-year-to').on('select2:close', function (e) {
    //   $('body').removeClass('select2-open');
    // });
    // $('.select2-auction').on('select2:open', function (e) {
    //   $('body').addClass('select2-open');
    // });
    // $('.select2-auction').on('select2:close', function (e) {
    //   $('body').removeClass('select2-open');
    // });
    // $('.select2-seller-type').on('select2:open', function (e) {
    //   $('body').addClass('select2-open');
    // });
    // $('.select2-seller-type').on('select2:close', function (e) {
    //   $('body').removeClass('select2-open');
    // });
    // $('.select2-engine').on('select2:open', function (e) {
    //   $('body').addClass('select2-open');
    // });
    // $('.select2-engine').on('select2:close', function (e) {
    //   $('body').removeClass('select2-open');
    // });
    // $('.select2-fuel').on('select2:open', function (e) {
    //   $('body').addClass('select2-open');
    // });
    // $('.select2-fuel').on('select2:close', function (e) {
    //   $('body').removeClass('select2-open');
    // });
    // $('.select2-driveline').on('select2:open', function (e) {
    //   $('body').addClass('select2-open');
    // });
    // $('.select2-driveline').on('select2:close', function (e) {
    //   $('body').removeClass('select2-open');
    // });
    // $('.select2-transmission').on('select2:open', function (e) {
    //   $('body').addClass('select2-open');
    // });
    // $('.select2-transmission').on('select2:close', function (e) {
    //   $('body').removeClass('select2-open');
    // });
    // $('.select2-run-drive').on('select2:open', function (e) {
    //   $('body').addClass('select2-open');
    // });
    // $('.select2-run-drive').on('select2:close', function (e) {
    //   $('body').removeClass('select2-open');
    // });
    // $('.select2-starts').on('select2:open', function (e) {
    //   $('body').addClass('select2-open');
    // });
    // $('.select2-starts').on('select2:close', function (e) {
    //   $('body').removeClass('select2-open');
    // });




    /*----------------------------------------------------*/
    /*  Filters Show More
    /*----------------------------------------------------*/
    $('#filters-btn').click(function () {
      $('.filters-more').toggleClass('open');

      if ($('.filters-more').hasClass('open')) {
        $('#filters-btn>span').text('Less Filters');
      } else {
        $('#filters-btn>span').text('Other Filters');
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
