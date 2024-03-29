$(function () {
  'use strict';
  $(document).ready(function () {
    $('#userfile').on('change', function () {
      if ($('#userfile').get(0).files.length === 0) {
        $('.form__userphoto').removeClass('form__userphoto_loaded');
      } else {
        $('.form__userphoto').addClass('form__userphoto_loaded');
      }
    });
    $('.form__fields').submit(function (e) {
      e.preventDefault();
      var formData = new FormData(this);
      $.ajax({
        url: 'mailer/send.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function (msg) {
          if (msg == 'ok') {
            $('.form__userphoto').removeClass('form__userphoto_loaded');
            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время!');
          } else {
            $('.form__userphoto').removeClass('form__userphoto_loaded');
            alert(
              'Произошла ошибка, мы уже занимаемся решением ее проблемы. Попробуйте отправить заявку чуть позже. Спасибо!',
            );
          }
        },
      }).done(function () {
        $(this).find('input').val('');
        $('.form__fields').trigger('reset');
      });
    });
  });
  $('[data-fancybox]:not(.slick-cloned)').fancybox();
  $('.feedback__carousel').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    dots: true,
    prevArrow:
      '<div class="arrow arrow_left"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg></div>',
    nextArrow:
      '<div class="arrow arrow_right"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg></div>',
    accessibility: false,
    focusOnSelect: false,
    appendDots: '.feedback__dots',
    dotsClass: 'dot',
    responsive: [
      {
        breakpoint: 993,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 577,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
  var total = $('.dot li');
  $('.feedback__counter').text(`1/${total.length}`);
  var $status = $('.feedback__counter');
  var $slickElement = $('.feedback__carousel');
  $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    if (!slick.$dots) {
      return;
    }
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + '/' + slick.$dots[0].children.length);
  });
});
