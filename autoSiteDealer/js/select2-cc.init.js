$(document).ready(function() {

  const dataCountries = {
    "Ukraine": {
      "Kievskaya Oblast": ["Kiev","Boyarka"],
      "Lvivskaya Oblast": ["Lviv"]
    },
    "China": {
      "Region1": ["City 1","City 2"],
      "Region2": ["City 3","City 4"],
    },
    "Canada": {
      "Alberta": ["City 1","City 2"]
    },
  }

  let countries = Object.keys(dataCountries).sort().map(country => `<option value="${country}">${country}</option>`);
  $(".country-select").html('<option></option>' + countries);


  $('.country-select').select2({
    placeholder: 'Country',
    searchInputPlaceholder: 'Country',
    dropdownParent: $('#sidebarFilter'),
  });
  $('.region-select').select2({
    placeholder: 'Region',
    searchInputPlaceholder: 'Region',
    dropdownParent: $('#sidebarFilter'),
  });
  $('.city-select').select2({
    placeholder: 'City',
    searchInputPlaceholder: 'City',
    dropdownParent: $('#sidebarFilter'),
  });

  // Открытие-закрытие select2 (добавить класс к body, изменить border)
  $('.country-select').on('select2:open', function (e) {
    $('.country-select + .select2 .select2-selection').css({'border' : '1px solid #2978BE'});
  }).on('select2:closing', function(e) {
    $('.country-select + .select2 .select2-selection').css({'border' : '1px solid #d3d3d3'});
  });
  $('.region-select').on('select2:open', function (e) {
    $('.region-select + .select2 .select2-selection').css({'border' : '1px solid #2978BE'});
  }).on('select2:closing', function(e) {
    $('.region-select + .select2 .select2-selection').css({'border' : '1px solid #d3d3d3'});
  });
  $('.city-select').on('select2:open', function (e) {
    $('.city-select + .select2 .select2-selection').css({'border' : '1px solid #2978BE'});
  }).on('select2:closing', function(e) {
    $('.city-select + .select2 .select2-selection').css({'border' : '1px solid #d3d3d3'});
  });


  $('.form-select').on('select2:open', function (e) {
    $('body').addClass('select2-cc-open');
  });
  $('.form-select').on('select2:close', function (e) {
    $('body').removeClass('select2-cc-open');
  });


  //закрывать dropdown при клике на select2-container (Используется в качестве backdrop)
  $("body").on("click", ".select2-container--open", function() {
    $(".form-select").select2("close");
  });


  //отмена закрытия при клике по общей области
  $("body").on("click", ".select2-search__field", function(e) {
    e.stopPropagation();
  });
  $("body").on("click", ".select2-dropdown.select2-dropdown--below", function(e) {
    e.stopPropagation();
  });


  let currentCountry = '';
  let currentRegion = '';

  //Change Country
  $('.country-select').on('select2:select', function (e) {
    currentCountry = this.value;
    currentRegion = '';

    let regions = Object.keys(dataCountries[currentCountry]).sort().map(region => `<option value="${region}">${region}</option>`);

    $(".region-select").html('<option></option>' + regions);
    $(".city-select").html('<option></option>');
  });
  //Change Region
  $('.region-select').on('select2:select', function (e) {
    currentRegion = this.value;

    let cities = dataCountries[currentCountry][currentRegion].sort().map(city => `<option value="${city}">${city}</option>`);

    $(".city-select").html('<option></option>' + cities);
  });


  //For Mobile
  let mediaQuery = window.matchMedia("screen and (max-width: 475px)");
  mediaQuery.addListener(mobile);
  mobile(mediaQuery);

  function mobile(mq) {
    let windowSize = mq.matches;
    if (windowSize) {
      //Mobile:
      $('.country-select').on('select2:open', function (e) {
        $('.select2-dropdown').hide();
        setTimeout(function() {
          jQuery('.select2-dropdown').slideDown(200);
        }, 0);
      }).on('select2:closing', function(e) {
        e.preventDefault();
        setTimeout(function() {
          jQuery('.select2-dropdown').slideUp(200, function() {
            close($('.country-select').select2({
              placeholder: 'Country',
              searchInputPlaceholder: 'Country',
              dropdownParent: $('#sidebarFilter'),
            }));
            $('body').removeClass('select2-cc-open');
          });
        }, 0);
      });

      $('.region-select').on('select2:open', function (e) {
        $('.select2-dropdown').hide();
        setTimeout(function() {
          jQuery('.select2-dropdown').slideDown(200);
        }, 0);
      }).on('select2:closing', function(e) {
        e.preventDefault();
        setTimeout(function() {
          jQuery('.select2-dropdown').slideUp(200, function() {
            close($('.region-select').select2({
              placeholder: 'Region',
              searchInputPlaceholder: 'Region',
              dropdownParent: $('#sidebarFilter'),
            }));
            $('body').removeClass('select2-cc-open');
          });
        }, 0);
      });

      $('.city-select').on('select2:open', function (e) {
        $('.select2-dropdown').hide();
        setTimeout(function() {
          jQuery('.select2-dropdown').slideDown(200);
        }, 0);
      }).on('select2:closing', function(e) {
        e.preventDefault();
        setTimeout(function() {
          jQuery('.select2-dropdown').slideUp(200, function() {
            close($('.city-select').select2({
              placeholder: 'City',
              searchInputPlaceholder: 'City',
              dropdownParent: $('#sidebarFilter'),
            }));
            $('body').removeClass('select2-cc-open');
          });
        }, 0);
      });

    } else {
      //Desktop:
    }
  }


});
