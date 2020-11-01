$(function(){

    $(document).ready(function(){
        $('.banner-main').slick({
            infinite: true,
            fade: true,
            autoplay: true,
            cssEase: 'linear',
            prevArrow: '<div class="banner-arrows banner-arrows__left"></div>',
            nextArrow: '<div class="banner-arrows banner-arrows__right"></div>',
            responsive: [
              {
                breakpoint: 786,
                settings: {
                  arrows: false,
                  dots: true,
                }
              },
            ]
        });
        $('.promotions-slider').slick({
            infinite: false,
            slidesToShow: 2,
            prevArrow: '<div class="promotions-arrows promotions-arrows__left"></div>',
            nextArrow: '<div class="promotions-arrows promotions-arrows__right"></div>',
            responsive: [
              {
                breakpoint: 1225,
                settings: {
                  infinite: true,
                  slidesToShow: 1,
                  centerMode: true,
                  centerPadding: '-140px',
                  arrows: false
                }
              },
            ]
        });
    });


    // Init multiple select
    window.fs_test = $('.project').fSelect();
    window.fs_test = $('.level').fSelect();
    window.fs_test = $('.class-housing').fSelect();
    window.fs_test = $('.decoration').fSelect();


    // selection-extended
    $(document).ready(function(){
        $(".selection-more").click(function() {
            if (!$(this).data('status')) {
                $(this).val('Свернуть параметры');
                $(this).data('status', true);
            }
            else {
                $(this).val('Ещё параметры');
                $(this).data('status', false);
            }
            // $('.selection-extended').toggleClass('hidden');
            $('.selection-extended').attr('hidden', function(_, attr){ return !attr});
        });
    });


    // Load more plugin
    $('.popular-projects').simpleLoadMore({
      item: '.projects__card',
      count: 6,
      counterInBtn: true,
      btnText: 'Показать ещё {showing} из {total}',
    });


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



// Rangeslider
  const $price = $('#price');
  const $firstPayment = $('#first-payment');
  const $term = $('#term');
  const $pay = $('#pay');

  function update($elem) {
      $elem.closest('.calc-range').find('output').text($elem.val().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
      $('.payment-percent').html(Math.round($firstPayment.val() * 100 / $price.val()) + '%');

      $pay.text('от ' + ((+$price.val() - +$firstPayment.val()) * 0.008 * (Math.pow(1.008, +$term.val())) / ((Math.pow(1.008, +$term.val())) - 1)).toLocaleString() + ' руб./мес.');
  }

  $price.closest('.calc-range').on('input', function() {
      const val = $price.val();

      $firstPayment
          .val((i, v) => Math.min(v, val))
          .attr('max', val)
          .rangeslider('update', true);

      update($firstPayment);

  });

  $price.add($firstPayment)
      .rangeslider({ polyfill: false })
      .closest('.calc-range')
      .on('input', e => update($(e.target)))
      .end()
      .trigger('input');

  $term
      .rangeslider({ polyfill: false })
      .closest('.calc-range')
      .on('input', e => update($(e.target)))
      .end()
      .trigger('input');


  // Меню burger
  $(document).ready(function($) {
      $("#navToggle").click(function() {
          $(this).toggleClass("active");
          $(".overlay").toggleClass("open");
          // this line ▼ prevents content scroll-behind
          $("body").toggleClass("locked");
          $("header").toggleClass("header-mini");
      });
      $('.main-menu__item').click(function() {
          $('.overlay').removeClass('open');
          $('.navBurger').removeClass('active');
          $("body").removeClass("locked");
      });
  });


  // Мега меню
  $(".mega-menu__icon").click(function () {
    $(this).parent(".mega-menu-wrapper").children(".mega-menu__list").slideToggle("100");
    $(this).parent(".mega-menu-wrapper").toggleClass("wrapper-open");
  });


});


// Tabs
function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tabs__link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


// Фокусировка фильтров для добавления box-shadow
rangenum1.addEventListener("focusin", () => rangenum1.classList.add('filter__focused'));
rangenum1.addEventListener("focusout", () => rangenum1.classList.remove('filter__focused'));
rangenum2.addEventListener("focusin", () => rangenum2.classList.add('filter__focused'));
rangenum2.addEventListener("focusout", () => rangenum2.classList.remove('filter__focused'));


//Modal
document.addEventListener("DOMContentLoaded", function () {
    var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
    console.log(scrollbar);

    document.querySelector('[href="#loginModal"]').addEventListener('click', function () {
        document.body.style.overflow = 'hidden';
        document.querySelector('#loginModal').style.marginLeft = scrollbar;
    });
    document.querySelector('[href="#closeLogin"]').addEventListener('click', function () {
        document.body.style.overflowY = 'visible';
        document.querySelector('#loginModal').style.marginLeft = '0px';
    });

    document.querySelector('[href="#callModal"]').addEventListener('click', function () {
        document.body.style.overflow = 'hidden';
        document.querySelector('#callModal').style.marginLeft = scrollbar;
    });
    document.querySelector('[href="#closeCall"]').addEventListener('click', function () {
        document.body.style.overflowY = 'visible';
        document.querySelector('#callModal').style.marginLeft = '0px';
    });

    document.querySelector('[href="#mortgageModal"]').addEventListener('click', function () {
        document.body.style.overflow = 'hidden';
        document.querySelector('#mortgageModal').style.marginLeft = scrollbar;
    });
    document.querySelector('[href="#closeMortgage"]').addEventListener('click', function () {
        document.body.style.overflowY = 'visible';
        document.querySelector('#mortgageModal').style.marginLeft = '0px';
    });

    document.querySelector('[href="#contactModal"]').addEventListener('click', function () {
        document.body.style.overflow = 'hidden';
        document.querySelector('#contactModal').style.marginLeft = scrollbar;
    });
    document.querySelector('[href="#closeContact"]').addEventListener('click', function () {
        document.body.style.overflowY = 'visible';
        document.querySelector('#contactModal').style.marginLeft = '0px';
    });
});


//Показать пароль
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
