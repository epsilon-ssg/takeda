/// EVENT TRACKING
/// _trackEvent(category, action, opt_label, opt_value, opt_noninteraction)
/// CUSOMT VAR
//_setCustomVar(index, name, value, opt_scope)
/// **** TRACKING DONE ON OTHER FILES ****
/// FAQ {Open | Close} click through and subsection pageview are tracked in app.js
/// FAQ {Open All | Close All} click through and subsection pageview are tracked in app.js
/// Popup Module click through is tracked in side_app.js
/// validation erros are tracked in reg_validation.js and individual form pages
/// Form submission for Registration and Unsubscribe are tracked in reg_validation.js


///NOTE: Use of the .live() method is no longer recommended since later versions of jQuery offer better methods that do not have its drawbacks. 
//$("a.offsite").live("click", function () {
//    alert("Goodbye!"); // jQuery 1.3+
//});
//$(document).delegate("a.offsite", "click", function () {
//    alert("Goodbye!"); // jQuery 1.4.3+
//});
//$(document).on("click", "a.offsite", function () {
//    alert("Goodbye!");  // jQuery 1.7+
//});


var currentPageUrl;
var _gaq = _gaq || [];
var GAPage = {};
GAPage.showInitialPageTrack = true;
GAPage.GOOGLE_ANALYTICS_ID = null;
GAPage.VISITOR_ID = null;
GAPage.normalizeURL = function (url) {
	// strip query string
	
	var indx = url.indexOf("?");
	if (indx > -1) {
		url = url.substring(0, indx);
	}


	var parts = url.split("/");
	var newparts = [];
	for (var i = 0; i < parts.length; i++) {
		var currVal = parts[i];
		if (currVal !== "") {
			if (currVal.toLowerCase() != "default" && currVal.toLowerCase() != "index") {
				newparts.push(currVal);
			}
		}
	}
	var trackingURL = "/" + (newparts.length <= 0 ? "" : newparts.join("/"));
	// if not a document
	if (trackingURL != "/" && !GAPage.isDocumentURL(trackingURL)) {
		trackingURL += "/";
	}
	return trackingURL;
};


GAPage.CurrentPage = function () { return GAPage.normalizeURL(window.location.pathname); };

GAPage.isDocumentURL = function(url) {
	return (/\.(doc|pdf)$/i).test(url.toLowerCase());
};
GAPage.trackPage = function (url) {

    //Send UID and Allow Cross Domain Tracking
    ga('create', GAPage.GOOGLE_ANALYTICS_ID, 'auto', { 'userId': GAPage.VISITOR_ID, 'allowLinker': true });

    // SET DEVICE INFO
    ga('set', 'dimension1', WURFL.form_factor);
    //CLIENTUID will go in dimension 2
    ga('set', 'dimension2', GAPage.VISITOR_ID);

    if (typeof (url) === "undefined" || url === "")
        url = window.location.pathname;
    
    url = GAPage.normalizeURL(url);
    //Send NormalizedURL to GA
    ga('send', 'pageview', url);

};
GAPage.trackDownload = function (pagename, file, extension, galabel, galinklocation) {
    GAPage.trackEvent('File Downloads', 'Download - ' + galabel, pagename + ' | ' + galinklocation);
};

GAPage.trackSocialMedia = function (socialMedia) {
	if (typeof (url) === "undefined" || url === "")
		url = window.location.pathname;
	url = GAPage.normalizeURL(url);
	GAPage.trackEvent('Social Media', socialMedia, url);
};
GAPage.trackTwitter = function (action) {
	GAPage.trackSocialMedia("Twitter - " + action);
}
GAPage.trackFacebook = function (action) {
	GAPage.trackSocialMedia("Facebook - " + action);
}
GAPage.trackEvent = function (category, event, label) {

    ga('send', {
        'hitType': 'event',          // Required.
        'eventCategory': category,   // Required.
        'eventAction': event,      // Required.
        'eventLabel': label
       // 'eventValue': 4
    });

};

GAPage.trackSectionView = function(section) {
	var pagename = GAPage.normalizeURL(window.location.pathname);
	var url = pagename + section;
	GAPage.trackEvent('Accordion Content', 'Expand', url);
};

GAPage.trackLinkerPageSectionView = function(otherGoogleAnalyticsID, section) {
    var pagename = window.location.pathname;
    var url = pagename + "/" + section;
    url = GAPage.normalizeURL(url);
    ga('send', 'pageview', url);
};

GAPage.trackLinkerPage = function(otherGoogleAnalyticsID, url) {
	if (typeof (url) === "undefined" || url === "")
		url = window.location.pathname;
	url = GAPage.normalizeURL(url);
	ga('send', 'pageview', url);
};

GAPage.trackModal = function(url) {
    var mainurl = GAPage.normalizeURL(window.location.pathname);
    ga('send', 'pageview', mainurl + "popup/" + url);
};

GAPage.closeModal = function () {
	var mainurl = window.location.pathname;
	GAPage.trackPage(mainurl);
};

GAPage.trackPrint = function () {
    var page = window.location.pathname;
    GAPage.trackEvent("Print", "Click - Print", GAPage.normalizeURL(page));
};

GAPage.trackVideo = function(videoName, action){
	var mainurl = GAPage.normalizeURL(window.location.pathname);
	GAPage.trackPage(mainurl + videoName + "/" + action);
};
				
var Cookies = {};
Cookies.getCookie = function(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
};
Cookies.setCookie = function(c_name,value,exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays===null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
};





$(document).ready(function () {
    initializeExitLinks();
    //initializeTabs();
    //initializePrintLinks();
    initializeFileDownloads();
    initializeCTALinks();
    initializeSavingsCalTab();
    setTimeout('initializeGaEvent();', 200);
    initializeBrands();
    initializeHaveCard();
    initializeUnsubscribeReason();
    initializeCTASubmit();
    initializeTrackingForwarding();
});

var formElement;
var fieldValue;

function initializeFileDownloads() {
	/***********************************************************************
	Download Files
	***********************************************************************/
	//On click of link, throw google page track
    $('.downloadFile').on("click", function () {
       
		if (parent.GAPage || GAPage) {
			var file = $(this).attr('href');
			var extension = file.split('.');
			var pagename = window.location.pathname;
			var parentPath = "";
			var galabel = $(this).attr('galabel');
			var galinklocation = $(this).attr('galinklocation');

			file = file.slice(file.lastIndexOf('/'));
			extension = (extension.length == 1) ? extension[0] : extension[extension.length - 1];

			if (extension.indexOf("aspx") >= 0)
			    extension = "PDF";

			//console.log(extension.indexOf("aspx"));

			if (parent.GAPage)
			    parent.GAPage.trackDownload(pagename, file, extension, galabel, galinklocation);
			else
			    GAPage.trackDownload(pagename, file, extension, galabel, galinklocation);


		}
	});


}


function initializeTrackingForwarding() {
    //CHECK QUERY STRING FOR SPECIAL CHAR
    var pattern = /^[A-Za-z0-9 '.-\=\&\-\_]+$/;
    currentPageUrl = document.location.href;
    if (currentPageUrl.split("?")[1]) {
        var result = currentPageUrl.split("?")[1].match(pattern);
    }
   // console.log("result:" + result);
    if (currentPageUrl.indexOf("?") > -1 && result != null) {
        fowardedParameters = updateAndAddParameters_utmOnly();
        $("#forwarded_parameters").val(fowardedParameters);
       // $("#forwarded_parameters").val("?" + currentPageUrl.split("?")[1]);
        //console.log("forwarded_parameters:" + currentPageUrl.split("?")[1]);
    }
    $("form").each(function (index, element) {
       // fowardedParameters = updateAndAddParameters(currentPageUrl, $(this).parents("form").attr("action"), $("#forwarded_parameters").val());
        fowardedParameters = updateAndAddParameters_utmOnly();
        if (fowardedParameters!=""){
			if ($(this).attr("action").indexOf("?") > -1) {
				$(this).attr("action", $(this).attr("action") + '&' + fowardedParameters);
			} else {
				$(this).attr("action", $(this).attr("action") + '?' + fowardedParameters);
			}
        }		
    });

    var classToIgnore = ["externalLink", "leavingsite", "downloadFile", "calcBack", "hidden-phone", "question", "showlink", "closeall", "faq", "showEligibility"];

    $("a").on("click", function (e) {
        //var found = $.inArray(e.target.getAttribute("class"), classToIgnore) > -1;
        var targetLink = this.href;
        var classfound = false;
        if (e.target.getAttribute("class") == undefined) {
            classfound = false;
        }else{
	        for (var i = 0; i < classToIgnore.length; i++) {
	            if (e.target.getAttribute("class").indexOf(classToIgnore[i]) >-1) {
	                classfound = true
	            }
	        }
        }
	   // console.log("link class:" + e.target.getAttribute("class"));
	   // console.log("found:" + classfound);
	    if ($("#forwarded-parameters").val() != "" && !classfound) {
	        e.preventDefault();
	        fowardedParameters = updateAndAddParameters_utmOnly();
	        //fowardedParameters = updateAndAddParameters(currentPageUrl, e.target.href, $("#forwarded_parameters").val());
	        //CHECK IF TARGET URL HAS QUERY STRING ALREADY
	    	// console.log(e.target.getAttribute("target"));
	        if (e.target.getAttribute("target") == "_blank") {
	            //OPEN IN NEW WINDOW
	            if (targetLink.indexOf("?") > -1) {
	                window.open(targetLink + '&' + fowardedParameters);
	            } else {
	                if (fowardedParameters != "" || $(this).attr("target") == '_blank') {
	                    window.open(targetLink + '?' + fowardedParameters);
	                } else {
	                    document.location.href = targetLink
	                }
	            }

	        } else {
	            //DONT ADD fowardedParameters again
	            if (targetLink.indexOf(fowardedParameters) < 0 && fowardedParameters != "") {
	                if (targetLink.indexOf("?") > -1 && targetLink.indexOf("#") < 0) {
	                    document.location.href = targetLink + '&' + fowardedParameters;
	                } else {
	                    //if (fowardedParameters != "") {
	                        if (targetLink.indexOf("#") > -1) {
	                            var linkParemeters = targetLink.split("#");
	                            document.location.href = linkParemeters[0] + '?' + fowardedParameters + "#" + linkParemeters[1];
	                        } else {
	                            document.location.href = targetLink + '?' + fowardedParameters;
	                        }
	                   // }
	                }
	            }
	            else {
	                document.location.href = targetLink
	            }

	        }
		}
	});
}

function initializeCTASubmit() {
    /***********************************************************************
    REG CTA FORM
    ***********************************************************************/
    //On SUBMIT, throw google event track and popup

    $("#RegCTA").submit(function (e) {

        if (GAPage) {
            e.preventDefault();
            var pagename = GAPage.normalizeURL(window.location.pathname);
            var actionURL = $(this).attr('action');
            var gaactiontype = "Submit";
            var galinklocation = $(this).attr('galinklocation');
            var gaactionurl = $(this).attr('gaactionurl');

            if (!actionURL) {
                actionURL = gaactionurl;
            }

            GAPage.trackEvent("CTA - " + gaactiontype, actionURL, pagename + ' | ' + galinklocation);
            $("#RegCTA").unbind('submit').submit();
        }
        return true;
    });
}





function initializeCTALinks() {
    /***********************************************************************
    Exit Links
    ***********************************************************************/
    //On click of link, throw google event track and popup
	$('.gaCTA').on("click", function (e) {
        if (GAPage) {
            e.preventDefault();
            var pagename = GAPage.normalizeURL(window.location.pathname);
            var actionURL = $(this).attr('href');
            var gaactiontype = $(this).attr('gaactiontype');
            var galinklocation = $(this).attr('galinklocation');
            var gaactionurl = $(this).attr('gaactionurl');
            var target = $(this).attr('target');

            if (!actionURL) {
                actionURL = gaactionurl;
            }

            GAPage.trackEvent("CTA - " + gaactiontype, actionURL, pagename + ' | ' + galinklocation);

            if (target == '_blank') {
            	setTimeout(function () {
            		window.open(actionURL, '_blank');
            	}, 200);
            } else {
            	setTimeout('document.location = "' + actionURL + '"', 200);
            }
        }
    });
}



function initializeSavingsCalTab() {
/***********************************************************************
Savings Calculator Links
***********************************************************************/
//On click of link, throw google event track the open, close and back

    $('.gaSavingsCal').on("click", function () {
        var gaactiontype;
        var pagename = GAPage.normalizeURL(window.location.pathname);

        if ($(this).hasClass('closed')) {
            gaactiontype = "Close";
        }
        else if ($(this).hasClass('opened')) {
            gaactiontype = "Open";
        }
        else if ($(this).hasClass('calcBack')) {
            gaactiontype = "Back";
        }
        else if ($(this).hasClass('calcNext')) {
            gaactiontype = "Next";
            //On click of link, throw google event track user responses on insurance options
            if ($('#optionsRadios1').is(':checked')) {
                GAPage.trackEvent("Savings Calculator - Responses", "Responses", "Commercial");
            }
            if ($('#optionsRadios2').is(':checked')) {
                GAPage.trackEvent("Savings Calculator - Responses", "Responses", "Federal");
            }
            if ($('#optionsRadios3').is(':checked')) {
                GAPage.trackEvent("Savings Calculator - Responses", "Responses", "Medicare Prescription Drug");
            }
            if ($('#optionsRadios4').is(':checked')) {
                GAPage.trackEvent("Savings Calculator - Responses", "Responses", "Insurance");
            }
            if ($('#optionsRadios5').is(':checked')) {
                GAPage.trackEvent("Savings Calculator - Responses", "Responses", "Medicare");
            }
            if ($('#optionsRadios6').is(':checked')) {
                GAPage.trackEvent("Savings Calculator - Responses", "Responses", "Not Covered");
            }
        }

        GAPage.trackEvent("Savings Calculator", gaactiontype, pagename);
    });

    
}

function initializeExitLinks() {
    /***********************************************************************
    Exit Links
    ***********************************************************************/
    //On click of link, throw google event track and popup
    $('.leavingsite').on("click", function () {
        if (GAPage) {
            var exitURL = $(this).attr('href'),
			page = GAPage.normalizeURL(window.location.pathname);
            GAPage.trackEvent("Outbound links", "Click", exitURL);
        }
    });

    //On click of link, throw google event track without popup
    $('.externalLink').on("click", function () {
        if (GAPage) {
            var exitURL = $(this).attr('href'),
			page = GAPage.normalizeURL(window.location.pathname);
            GAPage.trackEvent("Outbound links", "Click", exitURL);
        }
    });

    //On click of link, throw google event track
    $('.externalLinkContinue').on("click", function () {
        if (GAPage) {
            var exitURL = $(this).attr('href'),
			page = GAPage.normalizeURL(window.location.pathname);
            GAPage.trackEvent("Outbound links", "Continue", exitURL);
        }
    });

    //On click of link, throw google event track
    $( document ).on( "click", ".externalLinkCancel", function() {
   // $('.externalLinkCancel').on("click", function () {
        if (GAPage) {
            var exitURL = $(this).attr('href');
            if(!exitURL){
                exitURL = $(this).attr('gaactionurl');
            }
            page = GAPage.normalizeURL(window.location.pathname);
			GAPage.trackEvent("Outbound links", "Cancel", exitURL);
			//console.log("cancel");
			//console.log($(this));
        }
    });
   
}

function initializeGaEvent() {
    /***********************************************************************
    Tracked FORM ELEMENTS
    ***********************************************************************/
    //On click of link, throw google page track
    //$('.gaclickevent').on("click", function (event) {
    //    if (GAPage) {
    //        var gaTrackEvent = $(this).attr('gaclickevent').split('|');
    //        var gaCategory = gaTrackEvent[0];
    //        var gaEvent = gaTrackEvent[1];
    //        var gaLabel = gaTrackEvent[2];
    //        GAPage.trackEvent(gaCategory, gaEvent, gaLabel);

    //        if ($(this).attr('href') && !$(this).attr('target')) {	//go to href
    //            event.preventDefault();
    //            var exitURL = $(this).attr('href');
    //            setTimeout('document.location = "' + exitURL + '"', 200);
    //        }
    //        else if ($(this).attr('type') && $(this).attr('type').toLowerCase() == 'submit') {	//submit a form
    //            event.preventDefault();
    //            formElement = $(this).closest('form');
    //            var exitURL = $(formElement).attr('action');
    //            setTimeout('$(formElement).submit()', 200);
    //        }
    //    }
    //});

   

    //Field Completion event
    //On focus, remember the value of the field as previous value
    $('INPUT,SELECT').on("focus", function (event) {
        if ($(this).attr('type') == 'text' || $(this).prop("tagName") == 'SELECT')
            fieldValue = $(this).val();
        else if ($(this).attr('type') == 'radio' || $(this).attr('type') == 'checkbox') {
            if ($(this).is(':checked'))
                fieldValue = 'checked';
        }
        else
            fieldValue = '';

    });
    //On blur, check if field has value and is not equal to previous value
    $('INPUT,SELECT').on("blur", function (event) {

       // console.log("name:" + $(this).attr('name') + " onblur");
       // console.log("tagName:" + $(this).prop('tagName') + " onblur");
        if (($(this).attr('type') == 'text' && $(this).val() != '' && $(this).val() != fieldValue)
			|| ($(this).attr('type') == 'radio' && $(this).is(':checked') && fieldValue != 'checked')
			|| ($(this).attr('type') == 'checkbox' && $(this).is(':checked') && fieldValue != 'checked')
			|| ($(this).prop("tagName") == 'SELECT' && $(this).val() != '' && $(this).val() != fieldValue)
		) {
            var gaEvent = $(this).closest("form").attr('name');
           
            if (!gaEvent)
                $(this).parent('form').attr('id');
            if (!gaEvent)
                gaEvent = GAPage.CurrentPage();

            var gaCategory = 'Form Field Completion';
            var gaLabel = $(this).attr('name');
           
            /// NOTE
            /// jQuery Validation Error tracking code is located in reg-validation.js file
            
            GAPage.trackEvent(gaCategory, gaEvent, gaLabel);
        }
    });

    //Radio buttons & Checkbox - On change, check if field has value and is not equal to previous value
    $('input[type=radio], input[type=checkbox]').change(function () {
        var gaEvent = $(this).closest("form").attr('name');

        if (!gaEvent)
            $(this).parent('form').attr('id');
        if (!gaEvent)
            gaEvent = GAPage.CurrentPage();

        var gaCategory = 'Form Field Completion';
        var gaLabel = $(this).attr('name');

        GAPage.trackEvent(gaCategory, gaEvent, gaLabel);

    });

}

function initializeBrands() {
    /***********************************************************************
    Registration Step 3 
    ***********************************************************************/
    //On click of link, throw google event track the Brands chosed

    $('.gaBrands').on("click", function () {
         var gaEvent = $(this).closest("form").attr('name');
        GAPage.trackEvent('Form Submissions - Responses', 'Registration - Brands', $("input[name=Taking]:checked").attr('id').replace('Taking_',''));
    });

}


function initializeUnsubscribeReason() {
    /***********************************************************************
    Registration Step 3 
    ***********************************************************************/
    //On click of link, throw google event track the Brands chosed

    $('.gaUnsubscribeReason').on("click", function () {
        var gaEvent = $(this).closest("form").attr('name');
        //GAPage.trackEvent('CRM Unsubscribe', 'Website', $("input[name=Taking]:checked").attr('id').replace('Taking_', ''));

        if ($('#UnsubscribeReason_1').is(':checked')) {
            GAPage.trackEvent("CRM Unsubscribe", "Website", "Too many emails");
        }
        if ($('#UnsubscribeReason_2').is(':checked')) {
            GAPage.trackEvent("CRM Unsubscribe", "Website", "Too many emails from Takeda");
        }
        if ($('#UnsubscribeReason_3').is(':checked')) {
            GAPage.trackEvent("CRM Unsubscribe", "Website", "Emails are not valuable");
        }
        if ($('#UnsubscribeReason_4').is(':checked')) {
            GAPage.trackEvent("CRM Unsubscribe", "Website", "Did not sign up");
        }
        if ($('#UnsubscribeReason_5').is(':checked')) {
            GAPage.trackEvent("CRM Unsubscribe", "Website", "Other");
        }
       


    });

}

function initializeHaveCard() {
    /***********************************************************************
    Registration Step 1
    ***********************************************************************/
    //On click of link, throw google event track the HaveCard option chosed

    $('.gaHaveCard').on("click", function () {
    if ($('#HaveCard_1').prop('checked')) {
        GAPage.trackEvent('Registration', 'Savings Card | Activation', 'Savings Card : Activation');
    } else {
        GAPage.trackEvent('Registration', 'Savings Card | Registration', 'Savings Card : Registration');
    }
    });
}
function initializeMailto() {
    /***********************************************************************
	Mailto Links
	***********************************************************************/
    //On click of link, throw google page track
    $('.gaMailTo').on("click", function () {
        if (GAPage) {
            var file = $(this).get(0).href;
            file = file.replace(/mailto:/ig, "");
            GAPage.trackEvent("Mailto", "Click - Mailto", file);
        }
    });
}

function initializeTabs() {
    // PLM: what is this?
    $('.top-box span').on('click', function () {
        var index = parseInt($(this).data('index'), 10),
			pagename = $('.body-box-content').eq(index - 1).find('h3').text().replace(/\s/g, "-");
        if (GAPage) {
            GAPage.trackPage(pagename);
        }
    });

    //trigger the initial page
    $('.top-box span').first().trigger('click');
}

function initializeModalLinks() {
    //if you click a link that opens a modal, track page view
    $('.externalLink, .leavingsite, .zoomImageOne, .modalOpen').on("click", function () {
        var url;
        if ($(this).hasClass('modalOpen')) {
            url = "modal-open";
        }
        else if ($(this).hasClass('zoomImageOne')) {
            url = "zoom-" + $(this).data("graph");
        }
        else if ($(this).hasClass('leavingsite') || $(this).hasClass('externalLink')) {
            url = "leaving-site";
        }

        if (parent.GAPage || GAPage) {
            if (parent.GAPage)
                parent.GAPage.trackModal(url);
            else
                GAPage.trackModal(url);
        }
    });

    $('#modalcloser, .leaveCancel').on("click", function () {
        if (parent.GAPage || GAPage) {
            if (parent.GAPage)
                parent.GAPage.closeModal();
            else
                GAPage.closeModal();
        }

    });
}


function initializePrintLinks() {

    //On click of link, throw google page track
    $('.print').on("click", function () {
        if (GAPage) {
            var page = window.location.pathname;
            GAPage.trackEvent("Print Links", "Print", GAPage.normalizeURL(page));
        }
    });
}


/***********************************************************************
Kenshoo Links - by Mark Ando
***********************************************************************/
var hostProtocol = (("https:" == document.location.protocol) ? "https" : "http");
document.write('<script src="', hostProtocol +
'://5141.xg4ken.com/media/getpx.php?cid=fbdd0781-0ba9-464a-a619-0e7360ddc584"', 'type="text/JavaScript"><\/script>');



function addKNoScript(params) {
    var b = $('body');
    var str = "" + params[0];
    str = str.replace("id=", "token=");
    params[0] = str;
    var queryString = params.join("&");
    var d = new Date();
    var timestamp = d.getFullYear() + (d.getMonth() + 1) + d.getDate() + d.getHours() + d.getMinutes();
    b.append($("<noscript><img src='https://5141.xg4ken.com/media/redir.php?track=1&" + queryString + "&timestamp=" + timestamp + "'/></noscript>"));
}
function kenshooParams(type) {
    var params = new Array();
    params[0] = 'id=fbdd0781-0ba9-464a-a619-0e7360ddc584';
    params[1] = 'type=' + type;
    params[2] = 'val=0.0';
    params[3] = 'orderId=';
    params[4] = 'promoCode=';
    params[5] = 'valueCurrency=USD';
    params[6] = 'GCID='; //For Live Tracking only
    params[7] = 'kw='; //For Live Tracking only
    params[8] = 'product='; //For Live Tracking only
    return params;
}

var fireKenshooTracking = function (type) {
    var params = kenshooParams(type);
    addKNoScript(params);
    k_trackevent(params, '5141');
};

//KENSHOO RELATED TRACKING
$(document).ready(function () {
    setTimeout('initializeKenshooEvent();', 200);

});

function initializeKenshooEvent() {
    $('.kenshoo_pi').on("click", function (e) {
        fireKenshooTracking("pi");
    });

    $('.kenshoo_ddg').on("click", function (e) {
        fireKenshooTracking("ddg");
    });

    $('.kenshoo_mg').on("click", function (e) {
        fireKenshooTracking("mg");
    });
    $('.kenshoo_video').on("click", function (e) {
        fireKenshooTracking("video'");
    });
}

function extractDomain(url) {
	var domain;
	//find & remove protocol (http, ftp, etc.) and get domain
	if (url.indexOf("://") > -1) {
		domain = url.split('/')[2];
	}
	else {
		domain = url.split('/')[0];
	}

	//find & remove port number
	domain = domain.split(':')[0];

	return domain;
}

function getJsonFromUrl(url) {
	var query;
	if (url!= undefined){
	    if (url.indexOf("?") > -1) {
            query = url.split("?")[1];
	    } else {
            query = url;
	    }
	    var result = {};
	    var arr =  query.split("&");
	    jQuery.each(arr, function (i, part) {
	    //query.split("&").forEach(function (part) {
		    if (!part) return;
		    var item = part.split("=");
		    var key = item[0];
		    var from = key.indexOf("[");
		    if (from == -1) result[key] = decodeURIComponent(item[1]);
		    else {
			    var to = key.indexOf("]");
			    var index = key.substring(from + 1, to);
			    key = key.substring(0, from);
			    if (!result[key]) result[key] = [];
			    if (!index) result[key].push(item[1]);
			    else result[key][index] = item[1];
		    }
	    });
	        return result;
	} else {
	    return null;
	}
	
}

function updateAndAddParameters(currentPageUrl, newPageUrl, parametersToForward) {
	forwardedParameters = "";
	forwardedParameter = "";
	loop = 0;

	//console.log(currentPageUrl);
	//console.log(newPageUrl);
	//console.log(parametersToForward);

	    $.each(getJsonFromUrl(parametersToForward), function (index, value) {
	        var hasAlreadyParameterValue = "";
	        $.each(getJsonFromUrl(currentPageUrl), function (index2, value2) {
	            if (index == index2) {
	                hasAlreadyParameterValue = value2;
	            }
	            if (newPageUrl != undefined) {
	                $.each(getJsonFromUrl(newPageUrl), function (index3, value3) {
	                    if (index2 == index3 || index == index3) {
	                        hasAlreadyParameterValue = value3;
	                    }
	                });
	            }
	        });
	        if (hasAlreadyParameterValue != "") {
	            forwardedParameter = index + "=" + hasAlreadyParameterValue;
	        } else {
	            forwardedParameter = index + "=" + value;
	        }
	        if (loop == 0) {
	            forwardedParameters =  forwardedParameter;
	        } else {
	            forwardedParameters = forwardedParameters + "&" + forwardedParameter;
	        }
	        loop++;
	    });
	    return forwardedParameters;
	
}

function updateAndAddParameters_utmOnly() {
    forwardedParameters = "";
    forwardedParameter = "";
    if ($.QueryString["utm_medium"] != undefined && $.QueryString["utm_source"] != undefined) {
        //GET PARAMETERS
        utm_medium = $.QueryString["utm_medium"];
        utm_source = $.QueryString["utm_source"];
        gclid = $.QueryString["gclid"];
        if ($.QueryString["gclid"] != undefined) {
            forwardedParameters = "utm_medium=" + utm_medium + "&utm_source=" + utm_source + "&gclid=" + gclid;
        } else {
            forwardedParameters = "utm_medium=" + utm_medium + "&utm_source=" + utm_source
        }
    }
    return forwardedParameters;
}

/***********************************************************************
// It's a paid search if it has gclid= (old way) in the URL or utm_source=<google or bing> and utm_medium=cpc (new way) and referrer can not be empty
***********************************************************************/
function paidTrafficRegGA(step) {
    var referrer = document.referrer;
    var hostname = window.location.hostname;
    var url = window.location.href;
    var trafficType = "direct";
    var brand = "";
    var utm_medium = "";
    var utm_source = "";
    var gclid = "";
    var utmParamsIncluded = false;
  
    if (Cookies.getCookie("brand") == undefined){
        brand = ((referrer.toLowerCase().indexOf("nesina") > -1) ? "Nesina" : brand);
        brand = ((referrer.toLowerCase().indexOf("kazano") > -1) ? "Kazano" : brand);
        brand = ((referrer.toLowerCase().indexOf("oseni") > -1) ? "Oseni" : brand);

        Cookies.setCookie("brand", brand);
    }

    //$("#forwarded_parameters").val()
    if ($.QueryString["utm_medium"] != undefined && $.QueryString["utm_source"] != undefined && referrer != null) {
        //SET COOKIE FOR REG PROCESS
        Cookies.setCookie("utm_medium", $.QueryString["utm_medium"]);
        Cookies.setCookie("utm_source", $.QueryString["utm_source"]);
        Cookies.setCookie("gclid", $.QueryString["gclid"]);
        //GET PARAMETERS
        utm_medium = $.QueryString["utm_medium"];
        utm_source = $.QueryString["utm_source"];
        gclid = $.QueryString["gclid"];
    } else {
        //CHECK COOKIE
        utm_medium = Cookies.getCookie("utm_medium");
        utm_source = Cookies.getCookie("utm_source");
        gclid = Cookies.getCookie("gclid");
    }

    if ((utm_medium != "" && utm_medium != undefined) || (utm_source != "" && utm_source != undefined) && (gclid != undefined && gclid != "")) {
        utmParamsIncluded = true;
    }

    //paid traffic logic
    if(utmParamsIncluded){
        if ((utm_medium.toLowerCase() == "cpc" && (utm_source.toLowerCase() == "google" || utm_source.toLowerCase() == "bing")) || gclid != undefined) {
            trafficType = "paid";
        }
    }

    //referrer logic
    if (referrer != null && referrer != "") {
        urlIndex = referrer.indexOf(hostname);

        // Google organic search provides url in referer, need to filter only where url is in the first 10 characters
        if (!(urlIndex >= 0 && urlIndex <= 10) && !utmParamsIncluded) {
            // track as organic traffic, but only if utm params weren't already provided (i.e. banner traffic)
            trafficType = "organic";
        } else {
            if (utm_medium != "" && gclid == "") {
                if (utm_medium.toLowerCase() != "cpc") {
                    trafficType = "display";
                }
            }
        }
    } else {
        trafficType = "direct";
    }
    

    if (trafficType == "paid" || trafficType == "display") {
        ga('send', 'pageview', ' /Registration_CPC_' + step + '/' + Cookies.getCookie("brand") + '/');
    }



}






/***********************************************************************
Crossix Tracking - determin if paid traffic
***********************************************************************/
$(document).ready(function () {
    //initCrossixTags();
});
function initCrossixTags() {
    var pdata = getCrossixPdata();
    var crossixTag = window.location.protocol + "//di.rlcdn.com/398876.html?pdata=" + pdata;
    $('#crossixCustom').attr("src", crossixTag);
}

function getCrossixPdata() {
    var params = new Array();
    var sourceParams = new Array();
    var d = new Date();
    var fromEmail = false;

    var utmParamsIncluded = false;
    var utmParas = "";
    if ($.QueryString["utm_source"] != undefined) {
        utmParamsIncluded = true;
        var utmSource = $.QueryString["utm_source"];
        utmParas = utmParas + ",utm_source=" + utmSource;
        fromEmail = (utmSource.toLowerCase() == "email") ? true : fromEmail;
    }
    if ($.QueryString["utm_term"] != undefined) {
        utmParamsIncluded = true;
        utmParas = utmParas + ",utm_term=" + $.QueryString["utm_term"];
    }
    if ($.QueryString["utm_medium"] != undefined) {
        utmParamsIncluded = true;
        var utmMedium = $.QueryString["utm_medium"];
        utmParas = utmParas + ",utm_medium=" + utmMedium;
        fromEmail = (utmMedium.toLowerCase() == "email") ? true : fromEmail;
    }
    if ($.QueryString["utm_content"] != undefined) {
        utmParamsIncluded = true;
        utmParas = utmParas + ",utm_content=" + $.QueryString["utm_content"];
    }
    if ($.QueryString["utm_campaign"] != undefined) {
        utmParamsIncluded = true;
        utmParas = utmParas + ",utm_campaign=" + $.QueryString["utm_campaign"];
    }

    var data = Cookies.getCookie('__utmz');
    var timestamp = d.YYYYMMDDHHMMSS();

    cxSource = (cxSource == "paid") ? cxSource : (utmParamsIncluded ? (fromEmail) ? "Email" : "Display" : cxSource);
   // console.log($.QueryString);

    params[0] = 'timestamp=' + timestamp;
    params[1] = 'device=' + ((cxDevice) ? cxDevice : "NotSet");
    sourceParams[0] = 'source=' + ((cxSource) ? cxSource : "NotSet");
    sourceParams[1] = 'searchterm=' + ((cxTerm) ? cxTerm : "NotSet");

    var queryString = "";
   // console.log(sourceParams[0]);
   // console.log(sourceParams[1]);

    if (cxSource != "inherit") {
        queryString = params.join(",") + "," + sourceParams.join(",");
        Cookies.setCookie("pdSrce", sourceParams.join(","));
    } else {
        queryString = params.join(",") + "," + Cookies.getCookie("pdSrce");
    }

    //Pass Ad Group to Crossix
    if ($.QueryString["group"] != undefined)
        queryString = queryString + ",group=" + $.QueryString["group"];

    //If source from Paid, we will include all utm parameters into pdSrce
    if (cxSource == "paid" && utmParamsIncluded) {
        queryString = queryString + utmParas;
    }

    return encodeURIComponent(queryString);
}
var Cookies = {};
Cookies.getCookie = function (c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
};

Cookies.setCookie = function (c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
};

(function ($) {
    $.QueryString = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

