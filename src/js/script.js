$(document).ready(function(){

// Плавный скролл по ссылкам
let link = $('.link');

link.on('click', function(e){
    e.preventDefault();

    let hrefLink = $(this).attr('href');

    let target = $(hrefLink);

    $('html, body').animate({
        scrollTop: target.offset().top
    }, 1500);
});

// появление и исчезновение меню по клику
$('.navigation__burger').on('click', function(){
    $('.navigation__list').slideToggle(200);
});


// появление и исчезновение arrowUp
    $(window).scroll(function(){
        let headerHeight = $('header').height();
        let servicesHeight = $('.services').height();
        
        if ($(this).scrollTop() > (headerHeight + servicesHeight)) {
            $('.arrowUp').fadeIn();
        } else {
            $('.arrowUp').fadeOut();
        }
    });

// слайдер

    $('.carousel__block').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        speed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="../img/icons/sprite.svg#icon-circle-left"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="../img/icons/sprite.svg#icon-circle-right"></use></svg></button>',
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                arrows: false
              }
            },
            {
              breakpoint: 935,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
              }
            }
        ]
    });
});