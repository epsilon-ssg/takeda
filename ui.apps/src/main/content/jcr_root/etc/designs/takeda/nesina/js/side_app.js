    $(document).ready(function() { 
        $('.iscroller').mCustomScrollbar({
            scrollInertia: 150,
            advanced: {
                updateOnContentResize: true
            }
        });
		$('.isi_banner .expanderBox').on('click',expandISIOnClick); 
		$('#container').on('click','.overlayISIModal',expandISIOnClick);
		$('#container').on('click', '.sm_button .headline', buttonExpander);
		ISIFunctionality();
		eligibilityLink();
        //console.log('hello world')


        //mobile view
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		   //  $('.isi-flop').removeClass('active');
		  //  $('.desktop-hide', '.ex_close').hide();
		  //  $('.isi-mobile-small-header').removeClass('hide');
		}

		//konaPopUp();



	});
	
	(function($){
        $(window).load(function(){
            $(".state3 .isi").mCustomScrollbar({scrollInertia: 150});
        });
    })(jQuery);

	// ISI Widget sticky code

    $(window).load(function () {
        // set up a slottable component
        var topBorder = $('.s-nav').is(':visible') ? $(".s-nav:visible") : $(".header-shadow");
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            if (screen.width > 320 | screen.width <= 568) {
                
            } else {

            }
        }
       
    });

    $(window).resize(function () {
        // set up a slottable component
        var topBorder = $('.s-nav').is(':visible') ? $(".s-nav:visible") : $(".header-shadow");
        $('.slotableObject').each(function (e) { slotableObjectReset($(this), topBorder, $("#footer")); });
    });

    //Homepage toggle Eligibility Restrictions Apply
    function eligibilityLink(){
    	var heightCal;
    	$('body').hasClass('home is_mobile') ? heightCal = 150 : heightCal = 150;

        $('.restriction-apply').on('click', function(){
			if($(this).hasClass('active')){
               $(this).removeClass('active');
               $('.middle-bg, .content .cta-home').animate({ height: '-=' + heightCal }, 500);
            }else{
                $(this).addClass('active');
                $('.middle-bg, .content .cta-home').animate({ height: '+=' + heightCal }, 500);
            };
            $('.apply-content').slideToggle('fast');
        });
    }

	function buttonExpander(e) {
		// get the button we're working with
		var button = $(this).parent('.sm_button');
		
		// did we hit the expanded button?
		var toggled = button.hasClass('expanded');
		
		// if we're clicking on the expanded, close all expanded
		if (toggled) $('.sm_button.expanded').stop().animate( { height: 56 }, 250, function (){ $(this).removeClass('expanded'); } );
		
		// if we're not clicking on the currently expanded, close all (except this), and open this
		else {
			$('.sm_button.expanded').not(button).stop().animate( { height: 56 }, 250, function (){ $(this).removeClass('expanded'); } );
			button.addClass('expanded').stop().animate( { height: 145 }, 250 );
		}
	}

    // cache this
	var $window = $(window);

        
	function slotableObjectReset(obj, topObj, botObj) {
	    // this code doesn't work
        /*
	    console.log('restarting the scroller');

	    // clear this
	    obj.stop();
	    obj.css('position', 'relative');
	    obj.css('top', 0);
	    $(window).off('scroll');

        // now start from the beginning
	    //slotableObject(obj, topObj, botObj);
        */

	}

/* ######################################################################## */
/* ############################## START ISI - 3 STATES #################### */
/* ######################################################################## */


	function slotableObject(obj,topObj,botObj) {
	   // prepare this object for it's slot
	   //console.log(obj.attr('class') + "," + topObj.attr('class') + "," + botObj.attr('id'));

       // get bottom of upper obj
	   var currentHeight = obj.outerHeight(true);
	   var topLimit = topObj.offset().top + topObj.outerHeight(true);
	   var bottomLimit = botObj.offset().top - currentHeight;
	   var currentPos = obj.offset().top;


	  


	   //console.log("sticking " + false + ": currentPos " + currentPos + ": topLimit" + topLimit + ": bottomLimit " + bottomLimit);

	   // set these in the object
	   obj.attr('data-scroll-top', topLimit);
	   obj.attr('data-scroll-bottom', bottomLimit);
	   obj.attr('data-scroll-pos', currentPos);
	   obj.attr('data-scroll-load-pos', currentPos);

       // apply absolute and set top
	   obj.css('position', 'absolute');
       obj.css('top', obj.offset().top);

       // check on scroll
       $(window).on('scroll', obj, function (e) {
           var scrollObj = obj;
           var currentPos = scrollObj.offset().top;
           var topLimit = scrollObj.attr('data-scroll-top');
           var bottomLimit = scrollObj.attr('data-scroll-bottom');
           var loadpos = scrollObj.attr('data-scroll-load-pos');

           var windowPos = $window.scrollTop();

           // on scroll match this, this is our fixed header height + scrollTop
           newPos = parseInt(windowPos) + parseInt(topLimit);

           // so, if we are above our start position, keep start position
           // if hit the top limit, keep the top limit
           if (newPos < loadpos) newPos = loadpos;

           // if we hit the bottom limit, keep the bottom limit
           else if (newPos > bottomLimit) newPos = bottomLimit;

           // else, stay at top of screen
           currentPos = newPos;

           // set current position
           // report
           //console.log("sticking " + false + ": currentPos " + currentPos + ": loadpos" + loadpos + ": topLimit" + topLimit + ": bottomLimit " + bottomLimit);
           scrollObj.stop().animate({ 'top': currentPos }, 500);
           //scrollObj.css('top',currentPos);
	       scrollObj.attr('data-scroll-pos', currentPos);

	   });
	}
	
	function expandISIOnClick(e) {
		
		var isiBox = $('.isi_banner');
		var isiShadow = $('.isi_banner_shadow');
	
		// this is an expansion toggle
		
		// don't do anything if in transit
		if(!isiBox.hasClass('moving')) if(isiBox.hasClass('expanded')) { // close
			isiBox.addClass('moving').removeClass('expanded');
			isiShadow.removeClass('expanded');
		
			// remove modal overlay
			$('.overlayISIModal').remove();
			
			// animate in
			isiBox.find('.iscroller div').hide();
			isiBox.stop().animate({ width: 211, 'margin-left': 0 }, function() { $(this).removeClass('moving').find('.iscroller div').show(); })
			isiShadow.stop().animate({ opacity: 0.3 });
		
		} else { // open
			isiBox.addClass('moving').addClass('expanded');
			isiShadow.addClass('expanded');
		
			// add modal overlay
			$('body #container').prepend('<div class="overlayISIModal"></div>');
			
			// animate out
			isiBox.find('.iscroller div').hide();
			isiBox.stop().animate({ width: 900, 'margin-left':-689 }, function() { $(this).removeClass('moving').find('.iscroller div').show();})
			isiShadow.stop().animate({ opacity: 0 });
		
		}
		
	}
	
			$( "#mobile_menu" ).click(function() {

			  $(".mobile-nav-show").toggleClass("mobile-nav");
			});
		
	var ISIFunctionality = function(){
		//Calculate where is the site isi
		var yourScreen = (window.screen.height - 140);
		var windowTop = $(window).scrollTop(),
			eTop = $('.bottom_isi').offset().top,
            
			totalTop = eTop - windowTop + 250;
		yourScreen >= totalTop ? $('.isi-flop').addClass('hidden') : $('.isi-flop').removeClass('hidden')

		//console.log("yourScreen:" + yourScreen);
		//console.log("totalTop:" + totalTop);

		$('.isi-flap-header h2').addClass('notshow')
		$(window).scroll(function(){
			var windowTop = $(window).scrollTop(),
				eTop = $('.bottom_isi').offset().top,
				totalTop = eTop - windowTop + 250;
			//console.log("yourScreen:" + yourScreen);
		    //console.log("totalTop:" + totalTop);
			yourScreen >= totalTop ? $('.isi-flop').addClass('hidden') : $('.isi-flop').removeClass('hidden')
		})
		setTimeout(function(){
			//console.log($('.bottom_isi').offset().top)
		}, 200)

		//funcitonality for the ISI bottom widget
		var isiWidgetContainer = $('.isi-flop'),
			isiWidgetOpen = $('.isi-flop .expand'),
			isiWidgetClose = $('.isi-flop .ex_close'),
			isiWidgetCloseVisible = $('.isi-flop .ex_close:visible')
            isiWidgetOpen2 = $('.isi-flop .isi-mobile-small-header'),
			isiMobileHeader = $('.isi-mobile-small-header');

		var isiBrand = $('body').data('brand'),
			isiState = Cookie.get('isi-State-'+isiBrand);

		if( isiState == "true") {
			closeIsiWidget();
		}

		//click to open ISI	
		isiWidgetOpen.off().on('click', function(){
			if($(this).parent().hasClass('desktop-hide') || $(this).parent().hasClass('hidden-desktop')){

				//if mobile trigger this funciton
				siwtchOpenBtn()
			}else{
				isiWidgetClose.removeClass('on')
				isiWidgetOpen.addClass('on')
				isiWidgetContainer.unbind('click', isiWidgetOpen).removeClass('active').addClass('active2')
				isiWidgetContainer.unbind('click', isiWidgetClose)
				$('.isi-flap-header h2').addClass('notshow');

			}

			//Mobile widget funcitonality
			function siwtchOpenBtn(){
				if(isiWidgetOpen.hasClass('close')){
					isiMobileHeader.show();
					isiWidgetContainer.removeClass('active').removeClass('active2');
					isiWidgetOpen.removeClass('close').html('OPEN');
					Cookie.set('isi-State-' + isiBrand, "true", 0.021);
				}else{
					isiMobileHeader.hide();
					isiWidgetClose.hide();
					isiWidgetOpen.addClass('close').html('CLOSE');
					isiWidgetContainer.addClass('active2');
				}
			}
		})
	    //click to open ISI	from header
	    isiWidgetOpen2.off().on('click', function(){
	        if ($(this).parent().hasClass('desktop-hide') || $(this).parent().hasClass('hidden-desktop')) {

	            //if mobile trigger this funciton
	            siwtchOpenBtn()
	        }

	        //Mobile widget funcitonality
	        function siwtchOpenBtn() {
	            if (isiWidgetOpen.hasClass('close')) {
	                isiMobileHeader.show();
	                isiWidgetContainer.removeClass('active').removeClass('active2');
	                isiWidgetOpen.removeClass('close').html('OPEN &#708;');
	            } else {
	                isiMobileHeader.hide();
	                isiWidgetClose.hide();
	                isiWidgetOpen.addClass('close').html('CLOSE &#709;');
	                isiWidgetContainer.addClass('active2');
	                
	            }
	        }
	    })
		isiWidgetClose.off().on('click', function(){
			Cookie.set('isi-State-'+isiBrand, "true" , 0.021);
			closeIsiWidget();
		})

		function closeIsiWidget() {
			if(isiWidgetCloseVisible.parent().hasClass('desktop-hide') || isiWidgetCloseVisible.parent().hasClass('hidden-desktop')){
				//if mobile 
				isiMobileHeader.show();
				isiWidgetCloseVisible.hide();
			}
			if (isiWidgetContainer.hasClass('active') || isiWidgetContainer.hasClass('active2')){
				isiWidgetContainer.removeClass('active').removeClass('active2');
				isiWidgetClose.addClass('on');
                //comment out these 2 items as it was causing errors
				//isiWidgetContainer.unbind('click', isiWidgetClose);
				//isiWidgetContainer.bind('click', isiWidgetOpen);
				isiWidgetOpen.removeClass('on')
				$('.isi-flap-header h2').removeClass('notshow')
			}

		}

		// Collapse overlay ISI when keyboard is open
        if (Modernizr.touch) {
            $('input:not([type="checkbox"],[type="radio"]), select')
                .on('focus.input', function(e) {
                    $('body').addClass('no-fixed');
                })
                .on('blur.input', function(e) {
                    $('body').removeClass('no-fixed');
                });
        }

	    /*==== MOBILE OPEN THE ISI ON TAP ====*/

        //isiWidgetContainer.bind('touchstart', function (event) {
        //    if (!isiWidgetOpen.hasClass('active2')) {
        //        isiMobileHeader.hide();
        //        isiWidgetClose.hide();
        //        isiWidgetOpen.addClass('close').html('CLOSE');
        //        isiWidgetContainer.addClass('active2');
        //        this.lastY = event.originalEvent.touches[0].clientY;
        //    }
        //});

        //isiWidgetContainer.bind('touchmove', function (event) {
        //    if (!isiWidgetOpen.hasClass('active2')) {
        //        var up = (event.originalEvent.touches[0].clientY > this.lastY), down = !up;
        //        this.lastY = event.originalEvent.touches[0].clientY;

        //        if ((up && this.allowUp) || (down && this.allowDown)) {
        //            isiMobileHeader.hide();
        //            isiWidgetClose.hide();
        //            isiWidgetOpen.addClass('close').html('CLOSE');
        //            isiWidgetContainer.addClass('active2');
        //        }
                    
        //    }
        //});


		
	}


	$(".jumpToISIonk").click(function (e) {
	    e.preventDefault();
	    //mobile view
	    if (MOBILEDEVICE) {
	        $('html, body').animate({
	            scrollTop: $(".isi").offset().top - 220
	        }, 100);
	    } else {

	        //desktop view
	        $('html, body').animate({
	            scrollTop: $(".isi").offset().top - 120
	        }, 100);
	    }

	});


	$(".jumpToISI").click(function (e) {
	    e.preventDefault();
	   
	    if ($(".s-nav").is(":visible")) {
	        $('html, body').animate({
	            scrollTop: $(".isi").offset().top - 270
	        }, 100);
	    }
	    else {
	        //console.log('no-subnav');
	        $('html, body').animate({
	            scrollTop: $(".isi").offset().top - 220
	        }, 100);
	    }
	});

	$(".isi-flap-content").bind('touchstart', function(event){
	    this.allowUp = (this.scrollTop > 0);
	    this.allowDown = (this.scrollTop < this.scrollHeight - this.clientHeight);
	    this.prevTop = null; this.prevBot = null;
	    this.lastY = event.originalEvent.touches[0].clientY;
	});

	$(".isi-flap-content").bind('touchmove', function(event){
	    var up = (event.originalEvent.touches[0].clientY > this.lastY), down = !up;
	    this.lastY = event.originalEvent.touches[0].clientY;

	    if ((up && this.allowUp) || (down && this.allowDown)) 
	    	event.stopPropagation();
	    else 
	    	event.preventDefault();
	});

	$(".isi-flap-header").bind('touchmove', function(event){
	    	event.preventDefault();
	});



/* ######################################################################## */
/* ################################ END ISI - 3 STATES #################### */
/* ######################################################################## */



/* ######################################################################## */
/* ############################## START LEAVING SITE POPUP #################### */
/* ######################################################################## */


	$('.leavingsite').on('click', function(e){
		e.preventDefault();
		var dis = $(this)
		dis.blur();
		leavingSitePopUp(dis)
	})
	var leavingSitePopUp = function(dis){
		var leavingBrand;
		leavingBrand = 'NESINAFamily'
		var screenWidth = (screen.width / 2) - 470;
		var href = dis.attr('href')
		var blankModal = '<div class="blankmodal"></div>';

		var blankPopup = '<div class="blankpopup">';
		blankPopup = blankPopup + '<span class="closepopup externalLinkCancel"  gaactionurl="' + href + '">X</span>';
		blankPopup = blankPopup + '<h2>You are about to leave this website and enter a website operated by an independent third party.</h2><p>The links to third-party websites contained on this website are provided solely for your convenience. Takeda does not control the content contained on any third-party website linked from this website. Your activities at those websites will be governed by the policies and practices of those third parties.</p><p><strong>Please select "Yes, Continue to Site" if you wish to be taken to this third-party website.</strong></p>';
		blankPopup = blankPopup + '<a class="btn red close_continue externalLinkContinue" href="' + href + '" target="_blank">YES, CONTINUE TO SITE</a><br>';
		blankPopup = blankPopup + '<div class="btn blue close_popup">NO, RETURN TO ' + leavingBrand + '.com</div></div>';

		$(blankModal).appendTo('body');
		$(blankPopup).appendTo('body');
		$('.blankmodal').height($('body').height());
		$('.close_popup').on('click', function(){
			$('.closepopup').trigger('click')
		})
		$('.closepopup').on('click', function(){
			$('.blankpopup').remove()
			$('.blankmodal').remove()
		});
		$('.close_continue').on('click', function () {
		    $('.blankpopup').remove()
		    $('.blankmodal').remove()
		});
	}
/*	
var konaPopUp = function () {
		var brandName;
		if ($("body").hasClass("Homepage") || $("body").hasClass("home")) {
			brandName = $("body").attr("data-brand");
			if (Cookie.get(brandName + " KonaPopupCookie") == "false") {
				Cookie.set(brandName + " KonaPopupCookie", "true");
				var blankModal = '<div class="blankmodal"></div>';
				$(blankModal).appendTo('body');

				var screenWidth = (screen.width / 2) - 470;
				$('.kona').addClass('show');
				$('.blankmodal').height($('body').height());


				$('.closepopup, .blankmodal').on('click', function () {
					$('.kona').removeClass('show');
					$('.blankmodal').remove()
				});			
			}
		}

	}
*/
