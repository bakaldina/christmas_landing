
// variables
var $header_top = $('.header-top');




// toggle menu
$header_top.find('a').on('click', function() {
    $(this).parent().toggleClass('open-menu');
});

$("#gif").hover(function() {
    var src = this.src;
    this.src = $(this).data("img");
    $(this).data("img", src);
});

// fullpage customization
$('#fullpage').fullpage({
    // sectionsColor: ['#B8AE9C', '#348899', '#F2AE72', '#5C832F', '#B8B89F'],
    sectionSelector: '.vertical-scrolling',
    navigation: true,
    slidesNavigation: true,
    controlArrows: false,
    anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
    menu: '#menu',

    // afterLoad: function(anchorLink, index) {
    //     $header_top.css('background', '#7000ff');
    // },


    afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {
        if(anchorLink == 'fifthSection' && slideIndex == 1) {
            $.fn.fullpage.setAllowScrolling(false, 'up');
            $header_top.css('background', 'transparent');
            $(this).css('background', '#374140');
            $(this).find('h2').css('color', 'white');
            $(this).find('h3').css('color', 'white');
            $(this).find('p').css(
                {
                    'color': '#DC3522',
                    'opacity': 1,
                    'transform': 'translateY(0)'
                }
            );
        }
    },

    onSlideLeave: function( anchorLink, index, slideIndex, direction) {
        if(anchorLink == 'fifthSection' && slideIndex == 1) {
            $.fn.fullpage.setAllowScrolling(true, 'up');
            $header_top.css('background', 'rgba(0, 47, 77, .3)');
        }
    }
});


// $('#horizontal').fullpage({
//     sectionSelector: '.vertical-scrolling1',
//     slideSelector: '.horizontal-scrolling1',
//     navigation: true,
//     slidesNavigation: true,
//     controlArrows: true
// });


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
                '       <iframe frameborder="0" src="' + url + '?autoplay=1"></iframe>'+
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

