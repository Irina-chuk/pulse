$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        speed: 1200,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.png"></button>',
        responsive: [
            {
                breakpoint: 575,
                settings: {
                    dots: true,
                    dotsClass: 'slick-dots',
                    arrows: false
                    
                }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    $('input[name=phone]').mask('+7 (999) 999-99-99');

    // smooth scroll
    $("a").on('click', function(event) {

    
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
            window.location.hash = hash;
          });
        } 
      });
  });