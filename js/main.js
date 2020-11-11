$(document).ready(function(){

    $(window).resize(function(){
        if($(window).innerWidth() > 1200){
            new fullpage('#product_fullpage', {
                navigation: false,
                navigationPosition: 'left',
                menu: '#fullpage_menu',
                lockAnchors: false,
                anchors:['screen_1', 'screen_2','screen_3','screen_4','screen_5','screen_6'],
            });

        }
        var c_left = $('header .container').offset().left;
        $('#fullpage_menu').css({
            'left': c_left+15+'px'
        });





    });
    $(window).resize();

    /*
        $('.made_list_item').each(function(){
            var made_list_item_left = $(this).offset().left;
            var made_list_item_top = $(this).position().top;
            var made_text=$(this).find('.made_text');
            $(made_text).css({
                'left': made_list_item_left-310+'px',
                'top': made_list_item_top+10+'px'
            });
        });

     */

    $('.made_list .made_list_item').tooltip();



    $('.made_more').click(function(){
        $(this).parent().next().slideToggle();
        $(this).parent().toggleClass('act');
    });


    $('.hamburger').click(function () {
        $('.main_menu').toggleClass('open');
        $('html').toggleClass('page-noscroll');

        $('.main_menu .mm_close').click(function () {
            $('.main_menu').removeClass('open');
            $('html').removeClass('page-noscroll');
        });
        return false;
    });
    $(document).on('click', function(e) {
        if (!$(e.target).closest(".main_menu.open").length) {
            $(".main_menu.open").removeClass('open');
            $("html").removeClass('page-noscroll');
        }
        e.stopPropagation();
    });


    $(".main_slider").slick({
        infinite: true,
        arrows: false,
        dots: false,
        autoplay: false,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    //ticking machine
    var percentTime;
    var tick;
    var time = 1;
    var progressBarIndex = 0;

    var progress = $('.inProgress');

    $('.progressBarContainer .progressBar').each(function (index) {
        var progress = "<div class='inProgress inProgress" + index + "'></div>";
        $(this).html(progress);
    });

    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        tick = setInterval(interval, 10);
    }

    function interval() {
        if (($('.main_slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
            progressBarIndex = $('.main_slider .slick-track div[aria-hidden="false"]').data("slickIndex");

            console.log(progressBarIndex);

            if (progressBarIndex == 1) {
                $(".inProgress0").addClass('on');
                $(".inProgress1").removeClass('on');
            }
            else if (progressBarIndex == 2) {
                $(".inProgress0").addClass('on');
                $(".inProgress1").addClass('on');
            }
            else if (progressBarIndex == 0) {
                $(".inProgress0").removeClass('on');
                $(".inProgress1").removeClass('on');
            }
            startProgressbar();

        } else {
            percentTime += 1 / (time + 2);
            $('.inProgress' + progressBarIndex).css({
                width: percentTime + "%"
            });
            if (percentTime >= 100) {
                $('.single-item').slick('slickNext');

                //console.log(progressBarIndex);

                if (progressBarIndex == 0) {
                    $(".inProgress0").addClass('on');

                }
                else if (progressBarIndex == 1) {
                    $(".inProgress0").addClass('on');
                    $(".inProgress1").addClass('on');
                }
                else if (progressBarIndex == 2) {
                    $(".inProgress0").removeClass('on');
                    $(".inProgress1").removeClass('on');
                }

                progressBarIndex++;

                if (progressBarIndex > 2) {
                    progressBarIndex = 0;
                }
                startProgressbar();

            }

        }
    }

    function resetProgressbar() {
        $('.inProgress').css({
            width: 0 + '%'
        });
        clearInterval(tick);
    }
    startProgressbar();
    // End ticking machine

    $('.progressBarContainer div').click(function () {
        clearInterval(tick);
        var goToThisIndex = $(this).find("span").data("slickIndex");
        $('.single-item').slick('slickGoTo', goToThisIndex, false);
        startProgressbar();
    });



    $('select.form-control').select2({
        minimumResultsForSearch: -1
    });


    $('.file').filestyle({
        placeholder: "Загрузите файл",
        text: "Обзор"
    });



    $('.faq_list_item_head').click(function(){
        if($(this).next().is(':visible')){
            $(this).parent().removeClass('active');
            $(this).next().slideUp();
        }else{
            $(this).parent().addClass('active');
            $(this).next().slideDown();
        }
    });


});





