// var log = console.log.bind(console);
i = 1;
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

//alert (width);
//var windowWidth = window.screen.width < window.outerWidth ?
//                 window.screen.width : window.outerWidth;
//var mobile = windowWidth < 641;

/*---===Cookies===---*/

/*---
    USAGE: to set cookie:

        Cookie.set('name', 'value')
        Cookie.get('name')
        Cookie.append('name', 'value')

 ---*/

Cookie = function(name, value, days) {
    setCookie(name, value, days);
}
Cookie.set = function(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
Cookie.get = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
Cookie.append = function(name, value) {
    Cookie.set(name, ((Cookie.get(name) == null ? '' : Cookie.get(name) + ',') + value))
}
Cookie.subtract = function(name, value) {
    Cookie.set(name, (Cookie.get(name) == null ? '' : Cookie.get(name).replace(new RegExp(',' + value, 'g'), '')))
}
Cookie.remove = function(name) {
    Cookie.set(name, '', -1);
}

/* ######################################################################## */
/* #################### Desktop Browser Detection Script ############## */
/* ######################################################################## */


//var browser = function () {
//    if ($.browser.msie) return "ie";
//    var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
//    var ua = navigator.userAgent.toLowerCase();
//    if (isIE11) return "ie11";
//    if ($.browser.mozilla/* && /firefox/.test(ua)*/) return "firefox";
//    if (/chrome/.test(ua)) return "chrome";

//    return /*"#"*/'unknown';
//}();

///* ADD ie11 to HTML class for fixes*/
//$(document).ready(function () {
//    if (browser.indexOf("ie11") != -1) { $('html').addClass("ie11"); }
//});

/* ######################################################################## */
/* #################### MOBILE Browser Detection Script ############## */
/* ######################################################################## */

//var Devices = {};
//var ChromeOnMac = false;
//Devices.UA = navigator.userAgent;
//Devices.Device = false;
//Devices.Types = ["iPhone", "iPod", "iPad", "Android"];
//for (var d = 0; d < Devices.Types.length; d++) {
//    var t = Devices.Types[d];
//    Devices[t] = !!Devices.UA.match(new RegExp(t, "i"));
//    Devices.Device = Devices.Device || Devices[t];
//}
//if (Devices.UA.indexOf("Macintosh") != -1 && Devices.UA.indexOf("Chrome") != -1) { $('body').addClass("ChromeOnMac"); }
//var MOBILEDEVICE = Devices.Device || Devices.iPhone || Devices.iPod || Devices.Android; //remove iPad from mobile list  || Devices.iPad
//var ANDROIDDEVICE = Devices.Android;
//var IOSDEVICE = Devices.iPhone || Devices.iPod || Devices.iPad;
//var isiPad = Devices.iPad;


var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    iPad: function() {
        return navigator.userAgent.match(/iPad/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


MOBILEDEVICE = isMobile.any();
ANDROIDDEVICE = isMobile.Android();
IOSDEVICE = isMobile.iOS();
isiPad = isMobile.iPad();
isAndroid = isMobile.Android();
/* ADD DEVICE info to BODY tag class for CSS*/
$(document).ready(function() {
    $('body').addClass("desktop");

    if (MOBILEDEVICE && !isiPad) {
        $('body').removeClass("desktop");
        $('body').addClass("is_mobile");
        console.log("MOBILEDEVICE:" + MOBILEDEVICE);
    }

    if (isAndroid) {
        $('body').addClass("is_android");
    }

    if (isiPad) {
        $('body').removeClass("desktop");
        $('body').removeClass("is_mobile");
        $('body').addClass("desktop");
        console.log("isiPad:" + isiPad);
    }

});



/* ######################################################################## */
/* #################### START - SAVINGS & SUPPORT CALCULATOR ############## */
/* ######################################################################## */


var incrementBy = 5;
var saveEachPi_30 = { 0: 0, 5: 1, 10: 6, 15: 11, 20: 16, 25: 21, 30: 26, 35: 31, 40: 36, 45: 41, 50: 46, 55: 51, 60: 56, 65: 61, 70: 66, 75: 71, 80: 76, 85: 81, 90: 86, 95: 91, 100: 96, 105: 100, 110: 100, 115: 100, 120: 100, 125: 100 };
var saveYearPi_30 = { 0: 0, 5: 12, 10: 72, 15: 132, 20: 192, 25: 252, 30: 312, 35: 372, 40: 432, 45: 492, 50: 552, 55: 612, 60: 672, 65: 732, 70: 792, 75: 852, 80: 912, 85: 972, 90: 1032, 95: 1092, 100: 1152, 105: 1200, 110: 1200, 115: 1200, 120: 1200, 125: 1200 };
var saveEachPi_90 = { 0: 0, 15: 11, 30: 26, 45: 41, 60: 56, 75: 71, 90: 86, 105: 100, 120: 100, 135: 100, 150: 100, 165: 100, 180: 100, 195: 100, 210: 100 };
var saveYearPi_90 = { 0: 0, 15: 44, 30: 104, 45: 164, 60: 224, 75: 284, 90: 344, 105: 400, 120: 400, 135: 400, 150: 400, 165: 400, 180: 400, 195: 400, 210: 400 };

$('#calcToggle button').on('click', function() {
    if ($(this).hasClass('opened')) {
        $(this).addClass('closed').removeClass('opened');
        $('.calculator').removeClass('active').slideUp(200);

    } else {
        $(this).addClass('opened').removeClass('closed');
        $('.calculator').addClass('active').slideDown(200);
    }
});

// if($('input[name="optionsRadiosPi"]').is(':checked')){
//     console.log('yes')
//     $('input[name="optionsRadiosPi"]').parent().addClass('selected')
// }
$('input[name="optionsRadiosPi"]').each(function() {
    if ($(this).is(':checked')) {
        $(this).parent().addClass('selected')
    }
})

$('#calcNextButton').on('click', function() {
    if ($('#optionsRadios1').is(':checked')) {
        $(".calcOutputField1, .calcOutputField2, .calcOutputField3").html("$0");
        $(".calculator #calcStep1").css("display", "none");
        $(".calculator #calcStep2").addClass("active");
        // gaTrackEvent('Savings Calculator|load|Qualify');
    }
    if ($('#optionsRadios2').is(':checked') || $('#optionsRadios3').is(':checked') || $('#optionsRadios4').is(':checked') || $('#optionsRadios5').is(':checked')) {
        $(".calcOutputField1, .calcOutputField2, .calcOutputField3").html("$0");
        $(".calculator #calcStep1").css("display", "none");
        $(".calculator #calcStep2_notcovered").addClass("active");
        // gaTrackEvent('Savings Calculator|load|Do Not Qualify');
    }
    if ($('#optionsRadios6').is(':checked')) {
        $(".calcOutputField").html("$100");
        $(".calculator #calcStep1").css("display", "none");
        $(".calculator #calcStep2_inelegible").addClass("active");
        // gaTrackEvent('Savings Calculator|load|Do Not Qualify');
    }
});

$('.calcBack').on('click', function() {
    $(".calculator #calcStep1").css("display", "block");
    $(".calculator #calcStep2, #calcStep2_notcovered, #calcStep2_inelegible").removeClass("active");
});

$('input[name="optionsRadiosPi"]').on('click', function() {
    $(".calcOutputField1").attr('data-value', '0');
    $(".calcOutputField1, .calcOutputField2, .calcOutputField3").html('$0');
    switch ($(this).attr('id')) {
        case 'optionsRadiosPi1':
            incrementBy = 5;
            break;
        case 'optionsRadiosPi2':
            incrementBy = 15;
            break;
    }
});

$('.calcUp').on('click', function() {
    currentValue = parseInt($(".calcOutputField1").attr('data-value'));
    if ((incrementBy == 5 && currentValue == 125) || (incrementBy == 15 && currentValue == 210)) {
        return false;
    }
    $(".calcOutputField1").html('$' + (currentValue + incrementBy)).attr('data-value', parseInt(currentValue) + incrementBy);
    newValue = parseInt($(".calcOutputField1").attr('data-value'));
    switch (incrementBy) {
        case 5:
            $(".calcOutputField2").html('$' + saveEachPi_30[newValue]);
            $(".calcOutputField3").html('$' + saveYearPi_30[newValue]);
            break;
        case 15:
            $(".calcOutputField2").html('$' + saveEachPi_90[newValue]);
            $(".calcOutputField3").html('$' + saveYearPi_90[newValue]);
            break;
    }
});


$('.calcDown').on('click', function() {
    currentValue = parseInt($(".calcOutputField1").attr('data-value'));
    if (currentValue == 0) {
        return false;
    }
    $(".calcOutputField1").html('$' + (currentValue - incrementBy)).attr('data-value', parseInt(currentValue) - incrementBy);
    newValue = parseInt($(".calcOutputField1").attr('data-value'));
    switch (incrementBy) {
        case 5:
            $(".calcOutputField2").html('$' + saveEachPi_30[newValue]);
            $(".calcOutputField3").html('$' + saveYearPi_30[newValue]);
            break;
        case 15:
            $(".calcOutputField2").html('$' + saveEachPi_90[newValue]);
            $(".calcOutputField3").html('$' + saveYearPi_90[newValue]);
            break;
    }
});




/* ######################################################################## */
/* ###################### END - SAVINGS & SUPPORT CALCULATOR ############## */
/* ######################################################################## */
(function($) {
    $(function() {

        /** Custom Functions /**/
        get = function(fileName) {
            $fileContent = '';
            $.get('/Content/inc/' + fileName + '.html', '', function(data) { $fileContent = data; });
            return $fileContent;
        };

        getQuery = function(name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };

        bodyClass = function(enClass) { $('body').addClass(enClass); };
        bodyDeClass = function(deClass) { $('body').removeClass(deClass); };
        //detachISI = function() { $('#isi').addClass('detach').off('click.detachISI'); };

        /** Dynamically Load Global Content /**/
        // $.ajaxSetup({ async: false }); //It's deprecated in newer version and you don't need it.
        isHome = $('body').hasClass('home');
        // $.ajaxSetup({ async: true });
        /*active HEADER STUFF*/

        $('.nav #p-nav li > a.active').each(function() {
            $(this).parent().addClass('active');
        });

        if (width < 641) {
            $(".nav #p-nav li").not(":last").addClass("importantnone");
        }

        $(".nav #p-nav li.stretch a.menu").click(function() {
            $(".nav #p-nav li").not(":last").toggleClass("importantnone");
        });

        /*IOS Form Element nesses layout*/
        if (IOSDEVICE) {
            $('input,select').focus(function() {
                $('#header, .bottomaligned').css('position', 'absolute');
                $('#shadow, #widget').addClass('hidden');
            });

            $('input,select').blur(function() {
                $('#header, .bottomaligned').css('position', 'fixed');
                $('#shadow, #widget').removeClass('hidden');
            });
        }

        if (ANDROIDDEVICE) {
            $('input:not(:radio,:checkbox)').focus(function() {
                $('#bottom_isi').css('visibility', 'hidden');
            });

            $('input,select').blur(function() {
                $('#bottom_isi').css('visibility', 'visible');
            });

            // $('.track_button').on('touchend',function(e){
            //  e.preventDefault();
            //  $(this).next().css('display','block');
            //  $(this).next()

            // });
            $('.track_button').one('touchend', false);
            var initHeight = window.innerHeight;
            $(window).resize(function() {
                if (window.innerHeight < initHeight) { $('#bottom_isi').css('visibility', 'hidden'); } else $('#bottom_isi').css('visibility', 'visible'); //$('#bottom_isi').hide();
            });
        }



        /* ######################################################################## */
        /* ######################  FAQ  ############## */
        /* ######################################################################## */
        brand = $('body').data('brand');

        //Remove cookies for faq for ED
        Cookie.remove(brand + ' openQuestions');

        areOpenQuestions = Cookie.get(brand + ' openQuestions');

        setCloseOpenTogglerState = function() {
            if ($('.question:not(.expanded)').length == 0) {
                $(".showlink a, .closeall a").html("Close All");
                $(".showlink, .closeall").addClass("closeall").removeClass("showlink");
            } else {
                $(".showlink a, .closeall a").html("Show All");
                $(".showlink, .closeall").addClass("showlink").removeClass("closeall");
            }
        }

        initFAQ = function(all) {
            if (areOpenQuestions == null || all) {
                Cookie.set(brand + ' openQuestions', 'q-0');
                areOpenQuestions = Cookie.get(brand + ' openQuestions');
            }
            $('.question').each(function(i) {
                thisId = 'q-' + i;
                thisClass = '';
                if (all) { Cookie.append(brand + ' openQuestions', thisId) };
                if (areOpenQuestions.indexOf(thisId) > -1) {
                    thisClass = "expanded";
                    $(this).next().toggleClass('expanded', 250).css({ /*same as below*/
                        'margin-top': 0,
                        'top': 0
                    });

                }
                $(this).attr('id', 'q-' + i).addClass(thisClass);
            });
            setCloseOpenTogglerState();
        }
        initFAQ();
        $('.question').click(function(e) {
            e.preventDefault();
            $(this).toggleClass('expanded', 250)
            expanded = $(this).hasClass('expanded')
            Cookie[expanded ? 'append' : 'subtract'](brand + ' openQuestions', $(this).attr('id'))
            $(this).next().toggleClass('expanded', 250).css({
                'margin-top': 0,
                'top': 0
            });
            var url = window.location.pathname;

            //     url = GAPage.normalizeURL(url) + subPage.substring(1);
            url = GAPage.normalizeURL(url);

            if (expanded) {
                GAPage.trackEvent('FAQ - ' + $(this).attr('id').replace('q-', ''), 'Open', url);
            } else {
                GAPage.trackEvent('FAQ - ' + $(this).attr('id').replace('q-', ''), 'Close', url);
            }
            setCloseOpenTogglerState();
        });

        $('.question-block:odd').addClass("odd");

        $(".showlink, .closeall").click(function() {
            //     url = GAPage.normalizeURL(url) + subPage.substring(1);
            var url = window.location.pathname;
            url = GAPage.normalizeURL(url);

            if ($(".showlink, .closeall").hasClass('showlink')) {

                //GA tracking event
                GAPage.trackEvent('FAQ', 'Open All', url);

                Cookie.remove(brand + ' openQuestions');
                $('.question').each(function(i, element) {
                    $(this).addClass('expanded');
                    $(this).next().addClass('expanded');
                    Cookie.append(brand + ' openQuestions', 'q-' + i);

                });
            } else if ($(".showlink, .closeall").hasClass('closeall')) {
                //GA tracking event
                GAPage.trackEvent('FAQ', 'Close All', url);
                $('.question').each(function(i, element) {
                    $(this).removeClass('expanded');
                    $(this).next().removeClass('expanded');
                });
                Cookie.remove(brand + ' openQuestions');
            }
            setCloseOpenTogglerState();
        });
        /* ######################################################################## */
        /* ######################  ENd of FAQ  ############## */
        /* ######################################################################## */

        if ($('#IsPost').val() != "true") {
            $("#MyAccountForm input,#MyAccountForm select").each(function(index, elem) {
                elem.disabled = true;
            });
            $('#wizard .onEdit').each(function(index, elem) {
                $(elem).hide();
            });
        }

        $('#wizard .btn-edit[type="button"]').click(function() {
            $("#MyAccountForm input,#MyAccountForm select").each(function(index, elem) {
                elem.disabled = false;
            });
            $('#wizard .onEdit').each(function(index, elem) {
                $(elem).show();
            });
            $(this).hide();
            $('#wizard .btn-edit[type="submit"]').show();
            $('#wizard .btn-edit[type="submit"]').on('hover', function() {
                $(this).show();
            });
        });


        $('#drugs .collapse').on({
            show: function(e) {
                $(this).parent().parent().addClass('angle-bg-img');
                $(this).parent().parent().addClass('active').siblings().removeClass('active').find('.in').collapse('hide');
            },
            hide: function(e) {
                $(this).parent().parent().removeClass('angle-bg-img');
                $(this).parent().parent().removeClass('active');
            }
        });

        //var ISIposition = $('#isi').offset().top;
        // if(ISIposition >= $(window).scrollTop()){
        //  $('body').attachISI();
        // }

    });

    $.fn.extend({
        /*attachISI : function() {
            $('#isi').addClass('detach');
            offset = $('#isi')[0].getBoundingClientRect().top
            // $(this).attr('data-offset', offset);
            $('#isi').removeClass('detach');
        },*/
        stepActive: function() { return $('#wizard .in'); },
        stepSetup: function() {
            var $active = $(this);
            $('#wizard .collapse').on({
                show: function(e) {
                    $(this).parent().addClass('active completed').siblings().removeClass('active');
                    $('#wizard .steps .' + e.target.id).addClass('completed');
                },
                shown: function(e) {
                    // $('#wizard .btn-prev, #wizard .btn-next').stepNav(); // sets up the next and previous buttons (adds handlers and manages their state)
                }
            });
            $active.collapse('show');
        },
        // stepNav : function() {
        //  $(this).each(function() {
        //      prevNext = $(this).stepActive().parent()[$(this).hasClass('btn-prev') ? 'prev' : 'next']('.accordion-group'); // get prev/next element for prev/next button
        //      if (prevNext.length > 0) {
        //          $(this).removeClass('disabled').attr({'data-toggle':'collapse','data-target':'#'+prevNext.children('.collapse').attr('id')}).on('click', function(){event.preventDefault();});
        //      }
        //      else {
        //          $(this).addClass('disabled').removeAttr('data-target data-toggle');
        //      }
        //  });
        // },
        spanFull: function() {
            $(this).outerWidth($('.well.wphone.pad.form').outerWidth() - 3).offset({ left: ($('.well.wphone.pad.form').offset().left + 1) });
        }
    });
    //$(document).on('click','.filelink',function(e){
    $(".showEligibility").on('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $("#eligibilitybox").toggle();
        return false;
    });
})(jQuery);

$(document).ready(function() {
    // eligibilityLink();
    //activateStep(location.href);

    /* ######################################################################## */
    /* ######################  Sub Page Anchor positioning  ############## */
    /* ######################################################################## */

    var topObj = $('.s-nav').is(':visible') ? $(".s-nav:visible") : $(".header-shadow");
    navPos = topObj.offset().top;
    var currentPage = window.location.pathname;


    if (navPos > 400) { // it should be around 210 if it worked, so if it's over twice that we know something's wrong.
        navPos = 187; // Firefox returns values for offset().top which are crazy-go-nuts. This will override bad behaviour.
    }
    //set the NavPos for mobiles

    //===== DESKTOP TOP FIXED NAV ========  
    var topLimit = navPos + topObj.outerHeight(true) + 30;
    if (currentPage.indexOf("savingssupport") > -1) {
        topLimit = topLimit - 30;
    }


    //===== PHONE TOP FIXED NAV ========
    if (MOBILEDEVICE) {
        topLimit = 100;
    }
    //===== IPAD TOP FIXED NAV ========
    if (isiPad) {
        var topLimit = navPos + topObj.outerHeight(true) + 30;
        if (currentPage.indexOf("savingssupport") > -1) {
            topLimit = topLimit - 30;
        }
    }


    //console.log("topLimit:" + topLimit);
    //console.log("currentpage:" + currentPage.indexOf("savingssupport"));

    // smooth local scrolling
    function filterPath(string) {
        return string
            .replace(/^\//, '')
            .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
            .replace(/\/$/, '');
    }

    // is there a meter on this screen?
    // if ($('.meter_box').length > 0) glucoseMeterInit();

    /* ============================
        NOTES ON USING pageScroller
       ============================
    ------------
    1) Make sure the correct sub nav is the one showing in the header partial, like the following:

    <li><a href="~/managediabetes"  @( (con == "NesinaManagediabetes") ? "class=active" : "") >MANAGING TYPE 2 DIABETES<span class="indicator"></span></a>

    Where con should equal your controller name.

    ------------
    2) Make sure all the href="#anchor" links go to a tag, that tag should have a class "section"

    ex:
    <div class="section" id="what_about"></div>
    or
    <h3 class="content-header section" id="work">How does NESINA work?</h3>

    ------------
    3) The body content which contains all the anchors must be wrapped in <div id="scrollContent">

    ex:
    <div id="scrollContent">
        <div class="section" id="what_about"></div>
        <h3 class="content-header section" id="work">How does NESINA work?</h3>
    </div>

    ------------
    4) pageScroller will only find sub navigation headers that have the class 's-nav', if you need
    a navigation with links that are links to other pages, use a class other than 's-nav' in  your structure

    */
    if ($('.s-nav').is(':visible') && $('.sub-nav:visible li.pagescroll').length > 0) {
        $('#scrollContent').pageScroller({ className: '.section', navigation: '.sub-nav:visible li.pagescroll', scrollOffset: -topLimit });
        $('.headerbar a[href*=#]:not([href=#])').click(function() {
            // this is an alternate smooth scroller for headerbar
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') ||
                location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').stop().animate({
                        scrollTop: target.offset().top - topLimit
                    }, 350);

                    return false;
                }
            }
        });

        setTimeout('gaTrackSubPage()', 1);
    }

    if (location.href.indexOf('#') > 0) {

        var target = location.href.split('#')[1];

        target = target.length ? target : $('[name=' + location.href.split('#')[1] + ']');
        // console.log("target:" + target);

        setTimeout(function() {
            $("a[href*='" + target + "']").click();
        }, 350);

        //location.hash = "";


        setTimeout('gaTrackSubPage()', 1);
    };

    // function eligibilityLink(){
    //     $('.restriction-apply').on('click', function(){
    //         if($(this).hasClass('active')){
    //            $(this).removeClass('active');
    //             $('.middle-bg, .content .cta').delay(8000).removeClass('active')
    //             $('.middle-bg, .content .cta').delay(8000).removeClass('active')

    //         }else{
    //             $(this).addClass('active');
    //             $('.middle-bg, .content .cta').addClass('active')
    //             // $('.content .cta').css('height','565px');
    //             // $('.middle-bg').css('height','573px');
    //         }
    //         $('.apply-content').slideToggle('fast');

    //     })
    // }


});

/* ######################################################################## */
/* ######################  External URL lightbox  ############## */
/* ######################################################################## */
(function($) {
    $.fn.externalLink = function() {
        var extURLPopup = $('#externalURLPopup');
        var modalBG = $('#modalBG');

        this.each(function(i, ele) {
            var dis = $(ele);

            dis.on('click', function(e) {
                e.preventDefault();

                var externalURL = dis.attr('href');
                extURLPopup.addClass('show');
                modalBG.addClass('show');
                extURLPopup.find('.continue').attr('href', externalURL);
                extURLPopup.find('.continue').attr('gatrackevent', 'Exit Links|Click - Exit Link|' + GAPage.normalizeURL(window.location.pathname) + externalURL);
            });
        });

        extURLPopup.find('.continue').on('click', function(e) {
            extURLPopup.removeClass('show');
            modalBG.removeClass('show');
        });
        extURLPopup.find('.return, .modal-close').on('click', function(e) {
            e.preventDefault();
            extURLPopup.removeClass('show');
            modalBG.removeClass('show');
        });
    }

    $(document).ready(function() {
        $('a.external').externalLink(); //not querying the href to determine externality in case of some JS events running based on non-standard href
        // magicLinks();
    });
})(jQuery);


/* ######################################################################## */
/* ######################  GA Tracking for Sub Sections  ############## */
/* ######################################################################## */
var currentSubPage = '';

function gaTrackSubPage() {
    if ($('li.active li.pagescroll.active')) {
        var subPage = $('li.active li.pagescroll.active a').attr('href');
        if (subPage != currentSubPage) {
            currentSubPage = subPage;
            var url = window.location.pathname;
            url = GAPage.normalizeURL(url) + subPage.substring(1);
            // _gaq.push(['_trackPageview', url]);
            ga('send', 'pageview', url);
        }
    }
    setTimeout('gaTrackSubPage()', 500);
}

$(document).ready(function() {
    jQuery.scrollDepth({
        //elements: ['#isi'],
        percentage: true,
        userTiming: false,
        pixelDepth: false,
        nonInteraction: true
    });
});

function addMetaTag() {

    //check if the userAgent contains iPad
    var isiPad = navigator.userAgent.match(/iPad/i) != null;
    var lanscape = (!window.orientation == 0);

    $('#Viewport').remove();
    //if user agent is iPad, serve a viewport with 1024 content width, so desktop version is displayed
    if (isiPad) {
        $("head").append('<meta name="viewport"  id="Viewport" content="width=1200, user-scalable=no">');
    }
    //if user agent is NOT iPad, serve a viewport with 640 content width for all other mobile devices
    else {
        if (lanscape) {
            //show desktop version
            $("head").append('<meta name="viewport" id="Viewport" content="width=375, initial-scale=0.5859375">');
        } else {
            $("head").append('<meta name="viewport" id="Viewport" content="width=640, user-scalable=no">');
        }
    }

}
addMetaTag();

$(window).on('resize', function() {
    addMetaTag();
})

$(function() {
    if (/Android|webOS|iPhone|BlackBerry/i.test(navigator.userAgent)) {
        var ww = ($(window).width() < window.screen.width) ? $(window).width() : window.screen.width; //get proper width
        var mw = 640; // min width of site
        var ratio = ww / mw; //calculate ratio
        var lanscape = (!window.orientation == 0);
        if (lanscape) {
            if (ww < mw) { //smaller than minimum size

                $('#Viewport').attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + ww);

            } else { //regular size
                $('#Viewport').attr('content', 'initial-scale=1.0, maximum-scale=2, minimum-scale=1.0, user-scalable=yes, width=' + ww);
            }
        } else {
            $('#Viewport').attr('content', 'width=640, user-scalable=no');
        }
    }
});

$(document).ready(function() {
    //hide footer on homepage only
    $(".eligibility_footnote").hide();
});