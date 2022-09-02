var token = null;
var tokenName = null;
var tokenRateID = null;
var tokenMin = 0;
var tokenMax = 9999999999;
var eurUsdRate = 1;
var lastAmount = 0;
var lastRate = -1;
var lastRateText = "-1";
var lastRateTime = new Date();
var maxRateCheck = new Date(new Date().getTime() + 15*60000);
var lastEstimateNetto = 0;

var charityID = null;
var charityTitle = null;
var kycDone = false;
var formFields = {}

function display_tokens(a, b) {
	$("#token_" + a).show();
	$("#token_" + b).show();
	$(".tokens-button").show();
}

function accept_terms() {
	if ($("#checkbox").is(':checked')) {
		$(".checkbox-error").hide();
	}
	else {
		$(".checkbox-error").show();
	}
}

function refresh_tokens() {
}

function show_tokens() {
	$(".hide-tokens").show();
}

function hide_tokens() {
	$(".hide-tokens").hide();
}

function select_token(token, rate, min = 0, max = 0) {
	showLoading("prepare donation");
	lastRate = rate;
	lastRateText = "-1";
	lastRateTime = new Date();
	maxRateCheck = new Date(new Date().getTime() + 15*60000);
	if (min != 0)
		tokenMin = min;
	if (max != 0)
		tokenMax = max;
	refresh_message('&token=' + token);
}


function showLoading(cMessage, bHideAll = true) {
	if (bHideAll) {
		$("#info").hide();
		$("#warning").hide();
		$("#error").hide();
		$("#content").hide();
	}
	$("#loading-msg").html(cMessage);
	$("#loading").show();
}
function showInfo(cInfo, bHideAll = true) {
	if (bHideAll) {
		$("#loading").hide();
		$("#warning").hide();
		$("#error").hide();
		$("#content").hide();
	}
	$("#info-msg").text(cInfo);
	$("#info").show();
}
function showWarning(cWarning, bHideAll = true) {
	if (bHideAll) {
		$("#loading").hide();
		$("#info").hide();
		$("#error").hide();
		$("#content").hide();
	}
	$("#warning-msg").html(cWarning);
	$("#warning").show();
}
function showError(cError, bHideAll = true) {
	if (bHideAll) {
		$("#loading").hide();
		$("#info").hide();
		$("#warning").hide();
		$("#content").hide();
	}
	$("#error-msg").html(cError);
	$("#error").show();
}
function showContent(cContent, bHideAll = true) {
	if (bHideAll) {
		$("#loading").hide();
		$("#info").hide();
		$("#warning").hide();
		$("#error").hide();
	}
	$("#content").html(cContent);
	$("#content").show();
}

function need_receipt_check() {
	var cbReceipt = document.getElementById("need_receipt");
	if (cbReceipt.checked == true) {
		$("#check-form-2").show();
		if ($("#email").val() == '')
			$("#email").val($("#email_short").val());
		$('html,body').animate({ scrollTop: 9999 }, 'slow');
		$("#name").focus();
	} else {
		$("#check-form-2").hide();
	}
}
function publick_name_check() {
	var cbPubName = document.getElementById("public_donate");
	if (cbPubName.checked == true) {
		//$("#name_optional").addClass("Req-Field");
	} else {
		$("#name_optional").hide();
	}
}

var bFormInvalid = false;
var cFormFocus = "";
function validateForm() {
	bFormInvalid = false;
	cFormFocus = "";
	var cbReceipt = document.getElementById("need_receipt");
	var cbPubName = document.getElementById("public_donate");

	if (lastAmount <= 0 || lastAmount < tokenMin || lastAmount > tokenMax) {
		$("#amount").css("border", "1px solid #ff0000");
		$("#amount").focus();
		if (lastAmount < tokenMin)
			document.getElementById("estimated").innerHTML = "miminum amount is<br>"+tokenMin+" "+token;
		else if (lastAmount > tokenMax)
			document.getElementById("estimated").innerHTML = "maximum amount is<br>"+tokenMax+" "+token;
		else
			alert('please enter an amount');
		return false;
	}
	else {
		$("#amount").css("border", "1px solid #d7d7d7");
	}

	updateEstimation(lastAmount, lastRate);

	if (cbPubName.checked == true) {
		validateTextField("name_short");
	}
	else {
		$("#name_short").css("border", "1px solid #d7d7d7");
	}

	if (cbReceipt.checked == true) {
		validateTextField("name");
		validateTextField("surname");
		validateTextField("email");
		validateTextField("street");
		validateTextField("zip");
		validateTextField("city");
		validateTextField("name_short");
		validateTextField("name_short");
		validateTextField("name_short");
		validateTextField("name_short");

		if ($("#country").val() < 1) {
			$("#country").css("border", "1px solid #ff0000");
			bFormInvalid = true;
			if (cFormFocus == "")
				cFormFocus = "#country";
		}
		else {
			$("#country").css("border", "1px solid #d7d7d7");
		}
	}

	if (cFormFocus != "") {
		$(cFormFocus).focus();
	}
	
	return !bFormInvalid;
}

function validateTextField(id) {
	if ($("#"+id).val() == '') {
		$("#"+id).css("border", "1px solid #ff0000");
		bFormInvalid = true;
		if (cFormFocus == "")
			cFormFocus = "#"+id;
		return false;
	}
	else {
		$("#"+id).css("border", "1px solid #d7d7d7");
		return true;
	}
}

function submitForm(addon) {

	if (!validateForm())
		return;
}