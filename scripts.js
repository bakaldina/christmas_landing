

$("#gif").hover(function() {
    var src = this.src;
    this.src = $(this).data("img");
    $(this).data("img", src);
});
$("#gif1").hover(function() {
    var src = this.src;
    this.src = $(this).data("img");
    $(this).data("img", src);
});
$("#gif3").hover(function() {
    var src = this.src;
    this.src = $(this).data("img");
    $(this).data("img", src);
});

$('#fullpage').fullpage({
    sectionSelector: '.vertical-scrolling',
    navigation: true,
    slidesNavigation: true,
    controlArrows: false,
    scrollBar: true,
    anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection', 'sixSection'],

});

function modalOpen(number) {
    $(".video-modal" + number).show();
}
function modalClose(number) {
    $(".video-modal" + number).hide();
};

var hideTrailer = function() {
    var $body = $('body');
    $body.find('.trailer').remove();
    $body.css({
        'overflow': 'auto'
    });
};

$(function() {
    var hideTrailer = function() {
        var $body = $('body');
        $body.find('.trailer').remove();
        $body.css({
            'overflow': 'auto'
        });
    };

    var showTrailer = function(url) {
        var $body = $('body'),
            template =
                '<div class="trailer">'+
                '   <div class="trailer-popup">'+
                '       <iframe frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src="' + url + '?autoplay=1"></iframe>'+
                '   </div>'+
                '<div class="trailer-popup-close"></div>';

        $body.css({
            'overflow': 'hidden'
        });
        $body.prepend(template);
        $body.find('.trailer-popup-close').click(hideTrailer);
        $body.find('.trailer').click(hideTrailer);
    };

    $('body').on('click', 'a.play', function (e){
        e.preventDefault();
        showTrailer($(this).data('url'));
    });
});

jQuery.validator.addMethod("checkMask", function(value, element) {
    return /\+\d{1}\(\d{3}\)\d{3}-\d{4}/g.test(value);
});

$('#form').validate();
$.validator.addClassRules({
    'js-phone-up': {
        checkMask: true
    }
});

$('.js-phone-up').mask("+7(999)999-9999", {
    autoclear: false
});

$("#form").submit(function(e){
    e.preventDefault();
    var phone = $('.js-phone-up').val().replace(/\D/g,'');
    if (phone.length !== 11) {
        return;
    }

    var tokenName = $("meta[name=csrf-token-name]").prop("content"); //
    var token = $("meta[name=csrf-token]").prop("content");

    $.get("/taxiportation", {phone: phone}, function(response) {
        if (!response.hasOwnProperty("success") || response.success == false) {
            if (response.hasOwnProperty('errors') && response.errors.hasOwnProperty('msg')){
                $(".modal-text").html(response.errors.msg);
                ga('send', 'event', 'SMS_landing', 'not_send', response.errors.msg);
            } else {
                $(".modal-text").html("Произошла ошибка");
            }
        } else {
            $(".modal-text").html("Ссылка для скачивания была отправлена на ваш номер телефона");
            ga('send', 'event', 'SMS_landing', 'send');
        }

        var openbutton = document.querySelector('.js-OpenModal');
        var modalwindow = document.querySelector('.modals');
        var closebutton = document.querySelector('.modals .close');
        var modalsOverley = document.querySelector('.modals__overlay');
        modalwindow.classList.add("show");
        var closebutton = document.querySelector('.modals .close');
        var modalsOverley = document.querySelector('.modals__overlay');
        modalsOverley.onclick = function() {
            modalwindow.classList.remove("show");
        }
        closebutton.onclick = function() {
            modalwindow.classList.remove("show");
        }
    });
});

$(".block-1-item").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
});



$('.slick-carousel').slick({
    dots: false,
    arrows: true,
    infinite: true,
    slide: '.horizontal-scroll',
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: false,
});