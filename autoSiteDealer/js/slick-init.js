$(function(){
  $(document).ready(function(){
    $('.photos').slick({
      dots: true,
      infinite: false,
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    });
  });
});
