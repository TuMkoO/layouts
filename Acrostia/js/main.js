$(function(){
    //background меню
    $(window).scroll(function() {
        if ($(this).scrollTop() > 10) {
            $("header").addClass("scroll");
        } else if ($(this).scrollTop() <= 10) {
            $("header").removeClass("scroll");
        }
    });

    //плавный скроллинг
    $(function() {
        var $page = $('html, body');
        $('nav a[href*="#"], #btnNav').click(function() {
            $page.animate({
                scrollTop: $($.attr(this, 'href')).offset().top - 0
            }, 1000);
            return false;
        });
    });

    //слайдер
    $(document).ready(function(){
        $('.home__slider').slick({
            infinite: true,
            fade: true,
            dots: true,
            prevArrow: '<img class="slider-arrows slider-arrows__left" src="img/arrow-left.png" alt="">',
            nextArrow: '<img class="slider-arrows slider-arrows__right" src="img/arrow-right.png" alt="">',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
    });

    // isotope plugin
    $( document ).ready(function() {
        var $container = $('.isotope');
        // filter buttons
        $('#filters button').click(function(){
            var $this = $(this);
            // don't proceed if already selected
            if ( !$this.hasClass('is-checked') ) {
                $this.parents('#options').find('.is-checked').removeClass('is-checked');
                $this.addClass('is-checked');
            }
            var selector = $this.attr('data-filter');
            $container.isotope({  itemSelector: '.portfolio-item', filter: selector });
            return false;
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

    // wow.js animation
    new WOW().init();

});
