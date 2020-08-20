$(function(){

    $(document).ready(function(){
        $('.banner-container').slick({
            arrows: false,
            dots: true,
            // autoplay: true,
        });
    });

    $(document).ready(function(){
        $('.categories-slider').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            prevArrow: '<div class="categories-prev"><div>',
            nextArrow: '<div class="categories-next"><div>',
            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        arrows: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 475,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
    });

    // burger menu
    $(document).ready(function($) {
        $("#navToggle").click(function() {
            $(this).toggleClass("active");
            $(".overlay").toggleClass("open");
            // this line ▼ prevents content scroll-behind
            $("body").toggleClass("locked");
        });
        $('.overlay').click(function() {
            $(this).removeClass('open');
            $('.navBurger').removeClass('active');
            $("body").removeClass("locked");
        });
        $('.menu-nav-item').click(function() {
            $('.overlay').removeClass('open');
            $('.navBurger').removeClass('active');
            $("body").removeClass("locked");
        });
    });


});
