$(function(){

  $(document).ready(function() {
    $('.popup-youtube').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });
  });

  $(document).ready(function(){
    $('.reviews-slider').slick({
      autoplay: true,
      autoplaySpeed: 3000,
      prevArrow: '.prev',
      nextArrow: '.next',
      lazyLoad: 'ondemand', // ondemand progressive anticipated
      infinite: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            arrows: false
          }
        }
      ]
    });
  });

  new WOW().init();
  
});

