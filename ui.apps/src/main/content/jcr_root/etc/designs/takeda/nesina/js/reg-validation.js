
    // REGISTRATION RELATED//


/* ######################################################################## */
/* #################### PLACEHOLDER TEXT FOR IE 8 ############## */
/* ######################################################################## */


//$('document').ready(function () {
//    if (!Modernizr.input.placeholder) {
//        $('[placeholder]').focus(function () {
//            var input = $(this);
//            if (input.val() == input.attr('placeholder')) {
//                input.val('');
//                input.removeClass('placeholder');
//            }
//        }).blur(function () {
//            var input = $(this);
//            if (input.val() == '' || input.val() == input.attr('placeholder')) {
//                input.addClass('placeholder');
//                input.val(input.attr('placeholder'));
//            }
//        }).blur();

//        //$('[placeholder]').closest("form").submit(function () {
//        //    $(this).find('[placeholder]').each(function () {
//        //        var input = $(this);
//        //        if (input.val() == input.attr('placeholder')) {
//        //            input.val('');
//        //        }
//        //    })
//        //});
//    }
//});


function checkCard() {
        if ($('#HaveCard_1').prop('checked')) {
            $("#CardNumber").prop("disabled", false);
            $('#ifYes').css('color', '#000');
        } else {
            $("#CardNumber").prop("disabled", true);
            $('#ifYes').css('color', '#909090');
        }
}

function checkPermission() {
    //console.log("checkPermission");
    if ($('#PermissionCkb').prop('checked')) {
        // something when checked
        $('#Permission').val('Yes');
    } else {
        // something else when not
        $('#Permission').val('');
        $("#errorBox").show();
       
    }
    return true;
}


function checkForError() {
    //console.log("checkForError");

    var form = $("form");

    /* #################### CLEAR PLACEHOLDER TEXT FOR IE 8 ############## */
        if ($('html').hasClass('ie8')) {
            $("form").find("input[type='text']").each(function (index, element) {
               
                var input = $(element);

                /*remove val*/
                if ($(element).val() == $(element).attr("placeholder")) {
                    $(element).val('');
                   
                    /*remove placeholder css*/
                    //$(element).css("color", $(element).data($.Placeholder.settings.dataName));
                    //$(element).removeData($.Placeholder.settings.dataName);
                   // console.log($(element).attr('name') + ',' + $(element).attr("placeholder") + ',' + $(element).val());
                 }
        })
        }



    form.validate();
    if (!form.valid()) {


        $("span.field-validation-error").each(function (index) {
            //console.log(index + ": " + $(this).attr('data-valmsg-for'));
            if (!$(".field-validation-error").is(':empty')){
                $("#errorBox").show();
                ///Track Validation Errors
                if (GAPage) {
                    var gaEvent = $(this).closest("form").attr('name');
                    GAPage.trackEvent('Validation Errors', gaEvent, $(this).attr('data-valmsg-for'));
                }
                //TURN OFF THE BREAK DUE TO GA TRACKING
                //return false;
            } 
        });


        /* ####################  PLACEHOLDER TEXT FOR IE 8 ############## */
        //if ($('html').hasClass('ie8')) {

        //    $("textarea, input[type='text']").each(function (index, element) {
        //        if ($(element).val().length === 0 || content == $(element).attr("placeholder") || $(element).attr("placeholder")) {
        //            $(element).data($.Placeholder.settings.dataName, $(element).css("color"));
        //            $(element).css("color", $.Placeholder.settings.color);
        //            $(element).val($(element).attr("placeholder"));
        //            // triggers show place holder on module init
        //           $(element).blur();
        //           console.log($(element).attr("name") + ',' + $(element).attr("placeholder"));
        //        }
        //    });
        //}




    } else {
        $("#errorBox").hide();
        if (GAPage) {
            var gaEvent = $("form").attr('name');
            GAPage.trackEvent('Form Submissions', gaEvent, 'Complete');
        }
    }

}

$('#HaveCard_0').click(function () {
    checkCard();    
    return false; // Prevent browser from visiting `#`

});
$('#HaveCard_1').click(function () {
    checkCard();
    return false; // Prevent browser from visiting `#`

});

$('select').onchange=function () {checkForError()};
$('input').onkeypress = function () { checkForError() };


$("#btn_eligibility").click(function () {
    $("#eligibilitybox").toggle();

    return false; // Prevent browser from visiting `#`

});