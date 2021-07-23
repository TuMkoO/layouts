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

