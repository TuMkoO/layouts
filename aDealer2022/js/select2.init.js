/* ----------------- Start Document ----------------- */
(function($){
  "use strict";


  /*----------------------------------------------------*/
  /*  Year Range Picker
  /*----------------------------------------------------*/

  // Вывод итогового значения Year range picker
  $('#year-submit').click(function () {
    let minYear = $('#val-year1').val();
    let maxYear = $('#val-year2').val();
    $( "#valYear" ).text( minYear + '-' + maxYear );
    $('.range-year-container').removeClass('placeholdered');

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

    if (years.min && years.max) {
      $('#year-submit').prop('disabled', false);
    }

  }

  // update({ min: 2017, max: 2019 });
  update({});

  //Backdrop для Year Range
  $('.range-year').on('shown.bs.dropdown', function () {
    $(document.createElement('div'))
      .addClass('dropdown-backdrop custom-backdrop')
      .insertAfter($('.range-year'))
  });
  $("body").on("click", ".custom-backdrop", function(e) {
    $('body').removeClass('dropdown-open');
    $('.custom-backdrop').remove();
  });


  /*----------------------------------------------------*/
  /*  Select2
  /*----------------------------------------------------*/

  // Открытие-закрытие select2 (добавить класс к body, изменить border)
  $('.type').on('select2:open', function (e) {
    $('.form-field-type .select2-selection').css({'border' : '1px solid #2978BE'});
    $('body').addClass('dropdown-open');

    $(document.createElement('div'))
      .addClass('select2-backdrop')
      .insertAfter($('.select2-container--open'));

  }).on('select2:closing', function(e) {
    $('.form-field-type .select2-selection').css({'border' : '1px solid #d3d3d3'});
    $('body').removeClass('dropdown-open');
    $('.select2-backdrop').remove();
  });
  $('.maker').on('select2:open', function (e) {
    $('.form-field-maker .select2-selection').css({'border' : '1px solid #2978BE'});
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
    $('.form-field-rogue .select2-selection').css({'border' : '1px solid #2978BE'});
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


  function initMobile() {
    $(".maker").select2({
      placeholder: 'Maker',
      searchInputPlaceholder: 'Maker'
    });
    $(".rogue").select2({
      placeholder: 'Rogue',
      searchInputPlaceholder: 'Rogue'
    });
    $(".type").select2({
      placeholder: 'Type',
      searchInputPlaceholder: 'Type'
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
          close(initMobile);
        });
      }, 0);
    });
  }

  function initDesktop() {
    $(".maker").select2({
      placeholder: 'Maker',
      searchInputPlaceholder: 'Maker'
    });
    $(".rogue").select2({
      placeholder: 'Rogue',
      searchInputPlaceholder: 'Rogue'
    });
    $(".type").select2({
      placeholder: 'Type',
      searchInputPlaceholder: 'Type'
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
          close(initDesktop);
        });
      }, 0);
    });
  }

  function close(init) {
    $('.search-select').select2('destroy');
    init();
  }

  $(document).ready(function(){

    let currentRogues = [];

    $.get('https://autovinapi.com/apiselect.php', async function (data) {
      // console.log(data);

      let types = data.sort((a, b) => a.id - b.id).map(type => `<option value="${type.id}">${type.name}</option>`);
      $(".type").html('<option></option>' + types);

      let mediaQuery = window.matchMedia("screen and (max-width: 475px)");
      mediaQuery.addListener(mobile);
      mobile(mediaQuery);

      function mobile(mq) {
        let windowSize = mq.matches;
        if (windowSize) {
          //Mobile:

          //закрывать dropdown при клике на select2-container (Используется в качестве backdrop)
          $("body").on("click", ".select2-container", function() {
            $(".type").select2("close");
            $(".maker").select2("close");
            $(".rogue").select2("close");
          });

          initMobile();

        } else {
          //Desktop:
          initDesktop();
        }
      }

      if ($(".type").data('value')) {
        $('.type').val($(".type").data('value'));
        $('.type').trigger('change');

        $('.maker').select2({
          placeholder: 'Maker',
          searchInputPlaceholder: 'Maker'
        });

        await getMakersList($(".type").data('value'), true);
      }

    });


    async function getMakersList (typeId, checkDefaultValue) {
      await $.get(`https://autovinapi.com/apiselect.php?type=${typeId}`, function(data) {
        // console.log("maker: ", data);

        if (data.length > 0) {
          $('.maker').select2({
            placeholder: 'Maker',
            searchInputPlaceholder: 'Maker'
          });


          let makers = data.sort((a, b) => a.id - b.id).map(maker => `<option value="${maker.id}">${maker.name}</option>`);
          $(".maker").html('<option></option>' + makers);
          $('.maker').trigger('change');

          if ($(".maker").data('value') && checkDefaultValue) {
            $('.maker').val($(".maker").data('value'));
            $('.maker').trigger('change');

            getRoguesList($(".maker").data('value'), true);
          } else {
            currentRogues = [];
          }

        }

      });
    }

    async function getRoguesList (makerId, checkDefaultValue) {
      await $.getJSON(`https://autovinapi.com/apiselect.php?brand=${makerId}`, function(data) {
        // console.log('rogue:', data);

        currentRogues = data;

        if (data.length > 0) {
          $(".rogue").select2({
            placeholder: 'Rogue',
            searchInputPlaceholder: 'Rogue',
            disabled: false,
          });

          let rogues = data.sort((a, b) => a.id - b.id).map(rogue => `<option value="${rogue.id}">${rogue.name + " (" + rogue.model_count + ")"}</option>`);
          $(".rogue").html('<option></option>' + rogues);
          $('.rogue').trigger('change');

        }

        if ($(".rogue").data('value') && checkDefaultValue) {
          $('.rogue').val($(".rogue").data('value'));
          $('.rogue').trigger('change');

          getYearsList(data.filter(model => model.id == $(".rogue").data('value'))[0]);
        }


      });


    }

    function getYearsList (model) {
      // console.log('getYearsList model=', model);

      let years = model.years.sort((a, b) => a - b).map(year => `<li class="years-item min-year" data-year="${year}">${year}</li>`);
      $("#sel1").html(years);
      $("#sel2").html(years);
    }

    function resetYears () {
      $("#sel1").html('<li class="years-item min-year not-found">No results found</li>');
      $("#sel2").html('<li class="years-item min-year not-found">No results found</li>');
      $("#year-submit").prop('disabled', true);
      $("#valYear").text('Year');
      $('.range-year-container').addClass('placeholdered');
    }


    $('.type').on('select2:select', async function (e) {
       let typeVal = this.value;

      //Reset Maker fields
      await getMakersList(typeVal);

      //Reset Rogue fields
      $(".rogue").html('<option></option>');
      $('.rogue').val(null).trigger('change');

      //Reset Years
      resetYears();

    });


    $('.maker').on('select2:select', async function (e) {
      let makerVal = this.value;

      //Reset Rogue fields
      await getRoguesList(makerVal);

      //Reset Years
      resetYears();

    });


    $('.rogue').on('select2:select', function (e) {
       //Reset Years
      resetYears();

      let rogueVal = this.value;

      getYearsList(currentRogues.filter(rogue => rogue.id == rogueVal)[0]);
    });





// ------------------ End Document ------------------ //
  });

})(this.jQuery);
