$(function(){

    $(document).ready(function(){
        $('.slider-container').slick({
            prevArrow: '<div class="slide-prev"><img src="./img/arrow-left.png" alt=""><div>',
            nextArrow: '<div class="slide-next"><img src="./img/arrow-right.png" alt=""><div>',
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  arrows: false
                }
              },
            ]
        });

        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            centerMode: true,
            focusOnSelect: true
        });
    });


    $(".js-range-slider").ionRangeSlider({
        type: "double",
        skin: "round",
        min: 0,
        max: 250,
        from: 44,
        to: 190,
        postfix: "$"
    });


    $('.star').click(function() {
        $(this).addClass('active').prevAll().addClass('active');
        $(this).nextAll().removeClass('active');
    });
    $('.star:not(.hover)').mouseenter(function() {
        $(this).addClass('hover').prevAll(':not(.active,.hover)').addClass('hover');
        $(this).nextAll().removeClass('hover');
    });
    $('.stars').mouseleave(function() {
        $('.stars .hover').removeClass('hover');
    });


    $('.table-head li').first().addClass('active');
    $('.table-content .tab').first().addClass('active');

    $('.table-head span').click(function() {
        $('.table-head li').removeClass('active');
        $(this).parent().addClass('active');
        $('.table-content .tab').removeClass('active');
        $($(this).attr('href')).addClass('active');
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
