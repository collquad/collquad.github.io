/*
* (c) Sou Demuth - app.js
*/


/*
*   Toggle menu when hitting ESC
*/
$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        $('.menuToggle').trigger('click');
    }
});

var screenWidth
var spacingMailIcon
var spacingMenuIcon


function getOffsets() {
    var screenWidth = $(window).width();
    if (screenWidth < 768) {
        spacingMailIcon = 29;
        spacingMenuIcon = 30;
    } else {
        spacingMailIcon = 58;
        spacingMenuIcon = 60;
    }
}

/*
*   Initialize Bullet Points of Carousel
*/
function initCarouselIndicators() {
    $(".carousel-indicators[data-target]").each(function (i, indicators) {
        var targetId = indicators.dataset.target;
        if (targetId != "") {
            var $carousel = $(targetId);
            $carousel.bind('slide.bs.carousel', function (e) {
                var $targetSlide = $(e.relatedTarget);
                var index = $targetSlide.index();
                $('.carousel-indicators[data-target="' + targetId + '"] li').removeClass('active')
                $('.carousel-indicators[data-target="' + targetId + '"] li:nth-child(' + (index + 1) + ')').addClass('active');
            });
        }
    });
}


$(window).resize(function () {
    getOffsets()
});

 $(document).ready(function() {

    getOffsets();
    $(window).scroll(); // for setting the right menu color

    $('a.pageScroll').bind('click', function(event) {
        event.preventDefault();
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1200, 'easeInOutExpo');
    });

    $('.fullscreenMenu').bind('touchmove', function(e){
        e.preventDefault();
      e.stopPropagation();
    });

    /*
    *   WAVES
    */

    var wavesStage = new SineWaves({
        el: document.getElementById('wavesStage'),

        speed: 2,

        width: function() {
          return ($('.stage').width());
        },

        height: function() {
          return $('.stage').height();
        },

        ease: 'sineIn',

        wavesWidth: '100%',

        waves: [
        {
        timeModifier: 4,
        lineWidth: 1,
        amplitude: 100,
        wavelength: 180,
        segmentlength:1,
        strokeStyle: 'rgba(47, 39, 126, 1)',
        },
        {
        timeModifier: 3,
        lineWidth: 1,
        amplitude: 150,
        wavelength: 100,
        segmentlength:1,
        strokeStyle: 'rgba(96, 26, 108, 1)',
        },
        {
        timeModifier: 3,
        lineWidth: 1,
        amplitude: 400,
        wavelength: 70,
        segmentlength:1,
        strokeStyle: 'rgba(35, 115, 97, 1)',
        }
        ]
    });


    /*
    *   MENU
    */

    $('.menuToggle').click(function(){
        var _this = $(this);
        if ($('.fullscreenMenu').hasClass('open')) {
            $('.fullscreenMenu .inner').fadeOut(400);
            $('body').removeClass('menuOpen');
            $('#wavesMenu').fadeOut(400);
            _this.removeClass('open');

            setTimeout(function() {
                $('.fullscreenMenu').removeClass('open');
                $('.fullscreenMenu').fadeOut(400);
                wavesMenu.running = false;
                $(window).scroll();
            }, 400);

        } else {
            $('.fullscreenMenu').addClass('open');
            $('.menuToggle span').css('backgroundColor','#ffffff');
            $('.fullscreenMenu').fadeIn(400);
            $(this).addClass('open');
            $('body').addClass('menuOpen')
            wavesMenu.running = true;
            $('#wavesMenu').fadeIn(400);
            setTimeout(function() {
                $('.fullscreenMenu .inner').fadeIn(700);
            }, 400);
        }

        return false;
    });

    $('.fullscreenMenu a').click(function() {
      var _this = $(this)
      setTimeout(function() {
        $('.fullscreenMenu .inner').fadeOut(400);
        $('.fullscreenMenu').fadeOut(400);
        $('.menuToggle').removeClass('open');
        $('.fullscreenMenu').removeClass('open');
        $('body').removeClass('menuOpen');
        $(window).scroll();
      }, 200);
    })


    /*
    *   CAROUSEL FUNCTIONS
    */
    $(".carousel-indicators li").on('click',function(){
       $(this).addClass('active').siblings().removeClass('active');
    });

    initCarouselIndicators();

    $('.carousel').bcSwipe({ threshold: 20 });
});

    var wavesServices = new SineWaves({
        el: document.getElementById('wavesServices'),

        speed: 2,

        width: function() {
        return $('.services').width();
        },

        height: function() {
        return $('.services').height()*0.4;
        },

        ease: 'linear',

        wavesWidth: '105%',

        waves: [
        {
          timeModifier: 4,
          lineWidth: 1,
          amplitude: 80,
          wavelength: 100,
          segmentlength:1,
          strokeStyle: 'rgba(47, 39, 126, 1)',
        },
        {
          timeModifier: 3,
          lineWidth: 1,
          amplitude: 40,
          wavelength: 100,
          segmentlength:1,
          strokeStyle: 'rgba(96, 26, 108, 1)',
        },
        {
          timeModifier: 3,
          lineWidth: 1,
          amplitude: 120,
          wavelength: 50,
          segmentlength:1,
          strokeStyle: 'rgba(35, 115, 97, 1)',
        }
        ]
    });

    var wavesMenu = new SineWaves({
        el: document.getElementById('wavesMenu'),

        speed: 2,

        running: false,

        width: function() {
        return $('.fullscreenMenu').width();
        },

        height: function() {
        return $('.fullscreenMenu').height();
        },

        ease: 'sineInOut',

        wavesWidth: '100%',

        waves: [
        {
          timeModifier: 4,
          lineWidth: 1,
          amplitude: 100,
          wavelength: 100,
          segmentlength:1,
          strokeStyle: 'rgba(47, 39, 126, 1)',
        },
        {
          timeModifier: 3,
          lineWidth: 1,
          amplitude: 50,
          wavelength: 100,
          segmentlength:1,
          strokeStyle: 'rgba(96, 26, 108, 1)',
        },
        {
          timeModifier: 3,
          lineWidth: 1,
          amplitude: 150,
          wavelength: 40,
          segmentlength:1,
          strokeStyle: 'rgba(35, 115, 97, 1)',
        },

        ]
    });


$(window).on('scroll', function() {

    /*
    * Change color of Hamburger depending on section background color and fix MailIcon
    */
    
    var scrollTop = $(this).scrollTop();
    $('.section').each(function() {
        var _this = $(this)
        var topDistance = _this.offset().top;
        if ( ((topDistance) < scrollTop+spacingMenuIcon) ) {
            if (_this.hasClass('white') ) {
                $('.menuToggle:not(".open") span').css({backgroundColor:'#000000'});
                $('.mailIcon.fixed svg g line, .mailIcon.fixed svg g rect, .mailIcon.fixed svg g polyline').css({stroke:'#000000'});
            } else {
                $('.menuToggle:not(".open") span').css({backgroundColor:'#ffffff'});
                $('.mailIcon.fixed svg g line, .mailIcon.fixed svg g rect, .mailIcon.fixed svg g polyline').css({stroke:'#ffffff'});
            }
        }
    });
    
    // 
    var section = $('.section.intro').offset().top+spacingMailIcon;
    if (scrollTop+spacingMailIcon > section){
        $('.mailIcon').addClass('fixed');
    } else {
        $('.mailIcon').removeClass('fixed');
    }
})