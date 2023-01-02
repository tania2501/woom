(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).scroll(function() {
      var top = $(document).scrollTop();
      if (top < 300) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  

})(jQuery);
/* HAMBURGER */
$('.hamburger').on('click',function(){
    $('.head-menu').toggle();
})

$('#closeMenu').on('click',function(){
    $('.head-menu').hide();
});
// SLICK SLIDER //
$(document).ready(function(){
  $('.slider').slick({
    arrows: false,
    dots:true,
    adaptiveHeight: true,
    speed: 1000,
    infinity: true,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnFocuse: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    fade: true,
    asNavFor:".sliderFoto"
  });
});
$(document).ready(function(){
  $('.sliderFoto').slick({
    arrows: false,
    adaptiveHeight: true,
    speed: 1000,
    infinity: true,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnFocuse: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    fade: true,
    easing: 'ease',
    asNavFor:".slider"
  });
});
$(document).ready(function(){
  $('.sliderBig').slick({
    dots: true,
    adaptiveHeight: true,
    speed: 1000,
    infinity: true,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    easing: 'ease',
  });
});
//       MODAL-WINDOW       

var btnOpen = document.getElementById('btn-open');
var modal = document.getElementById('wrapper-modal');
var overlay = document.getElementById('overlay');
var btnClose = document.getElementById('btn-close');
var btnCloses =document.getElementById('btn-closes');
btnOpen.addEventListener('click',function(){
    modal.classList.add('active');
    overlay.classList.add('active');
});

function closeModal(){
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

overlay.addEventListener('click',closeModal);
btnClose.addEventListener('click',closeModal);
btnCloses.addEventListener('click',closeModal);

// Валидация и отправка формы

$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var regExp = new RegExp(regexp);
            return regExp.test(value);
        },
        "Please check your input."
    );

    // Функция валидации и вывода сообщений
    function valEl(el) {
        el.validate({
            rules: {
                Phone: {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                Name: {
                    required: true
                },
                Email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                Phone: {
                    required: 'Поле обязательно для заполнения',
                    regex: 'Телефон может содержать символы + - ()'
                },
                Name: {
                    required: 'Поле обязательно для заполнения',
                },
                Email: {
                    required: 'Поле обязательно для заполнения',
                    Email: 'Неверный формат E-mail'
                }
            },

            // Начинаем проверку id="" формы
            submitHandler: function(form) {
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) { 
                    case 'overlayForm':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .done(function() {
                                console.log('Success');
                                })
                            .fail(function() {
                                console.log('Fail');
                                })
                            .always(function() {
                                console.log('Always');
                                setTimeout(function() {
                                    $('#after-window').fadeIn();
                                    $('#after-window').addClass('active');
                                    $('#modal-window').addClass('active');
                                    $form.trigger('reset');
                                }, 1100);
                                $('#after-window').on('click', function(e) {
                                    $(this).fadeOut();
                                });
                            });
                        break;
                }
                return false;
            }
      })
  }
    // Запускаем механизм валидации форм, если у них есть класс .js-form
    $('.js-form').each(function() {
        valEl($(this));
    });
});
/* TABS */

    $('.nav-tabs>.nav-link').on('click',function(){
        $(this).parent().index();


        $('.nav-tabs>.nav-link').removeClass('active');
        $(this).addClass('active');

        $('.tab-content>').removeClass('show active');
        $('.tab-content>').eq($(this).index()).addClass('show active');
    });