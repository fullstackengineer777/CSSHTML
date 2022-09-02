var queueID = null;
var timer_start = null;
var rate_value = null;
var rate_time = null;

function showInfo(cInfo, bHideAll = true) {
	if (bHideAll) {
		$("#progress").hide();
		$("#loading").hide();
		$("#warning").hide();
		$("#error").hide();
		$("#content").hide();
	}
	$("#info-msg").html(cInfo);
	$("#info").show();
}
function showWarning(cWarning, bHideAll = true) {
	if (bHideAll) {
		$("#progress").hide();
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
		$("#progress").hide();
		$("#loading").hide();
		$("#info").hide();
		$("#warning").hide();
		$("#content").hide();
	}
	$("#error-msg").html(cError);
	$("#error").show();
}
function showContent(cContent = false, bHideAll = true) {
	if (bHideAll) {
		$("#progress").hide();
		$("#loading").hide();
		$("#info").hide();
		$("#warning").hide();
		$("#error").hide();
	}
	if (cContent != false)
		$("#content").html(cContent);
	$("#content").show();
}

function person_type_change() {
	if ($("#natural_person").is(':checked')) {
		$("#file_info_natural").show();
		$("#file_info_entity").hide();
		$("#entity_div").hide();
		$('.company-error').hide();
	} else {
		$("#file_info_natural").hide();
		$("#file_info_entity").show();
		$("#entity_div").show();
	}
}

function _(el) {
	return document.getElementById(el);
}

var bFormInvalid = false;
var cFormFocus = "";
var fileList = ["empty"];
function validateForm() {
	bFormInvalid = false;
	cFormFocus = "";
	fileList.length = 0;

	validateTextField("name");
	validateTextField("surname");
	validateTextField("email");
	validateTextField("street");
	validateTextField("zip");
	validateTextField("city");
	validateTextField("country");

	if ($("#natural_person").is(':checked')) {
		bFormInvalid = bFormInvalid || !validateFile("fileNaturalID");
		bFormInvalid = bFormInvalid || !validateFile("fileNaturalResidence");
		validateTextField("messageNaturalSOF");
		bFormInvalid = bFormInvalid || !validateFile("fileNaturalSOF1");
		bFormInvalid = bFormInvalid || !validateFile("fileNaturalSOF2", false);
		bFormInvalid = bFormInvalid || !validateFile("fileNaturalSOF3", false);
		bFormInvalid = bFormInvalid || !validateFile("fileNaturalPOI", false);			
	} else {
		//Entity
		validateTextField("company");
		bFormInvalid = bFormInvalid || !validateFile("fileEntityRegister");

		validateTextField("entityFirstName1");
		validateTextField("entitySurname1");
		validateTextField("entityBirthday1");
		validateTextField("entityNationality1");
		validateTextField("entityCountry1");
		validateTextField("entityShare1");

		if ($("#entityFirstName2").val()+$("#entitySurname2").val() != '') {
			validateTextField("entityFirstName2");
			validateTextField("entitySurname2");
			validateTextField("entityBirthday2");
			validateTextField("entityNationality2");
			validateTextField("entityCountry2");
			validateTextField("entityShare2");			
		}

		if ($("#entityFirstName3").val()+$("#entitySurname3").val() != '') {
			validateTextField("entityFirstName3");
			validateTextField("entitySurname3");
			validateTextField("entityBirthday3");
			validateTextField("entityNationality3");
			validateTextField("entityCountry3");
			validateTextField("entityShare3");			
		}
	
		validateTextField("messageEntitySOF");
		bFormInvalid = bFormInvalid || !validateFile("fileEntitySOF1");
		bFormInvalid = bFormInvalid || !validateFile("fileEntitySOF2", false);
		bFormInvalid = bFormInvalid || !validateFile("fileEntitySOF3", false);
		bFormInvalid = bFormInvalid || !validateFile("fileEntityPOI", false);		
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

function validateFile(id, needed = true) {
	var bInvalid = false;

	if (_(id).files.length == 0) {
		if (needed) {
			$("#"+id).css("border", "1px solid #ff0000");
			cFormFocus = "#"+id;
			return false;
		}
		return !needed;
	}

	var file = _(id).files[0];

	if (file.size > 5 * 1024 * 1024) {
		showError(file.name + " is to big! maximum file-size is 5MB", false);
		bInvalid = true;
	}

	if (file.type != "application/pdf" && !file.type.startsWith("image/")) {
		showError(file.name + " is not valid! only pdf-documents and images are allowed: "+file.type, false);
		bInvalid = true;
	}

	if (bInvalid) {
		if (needed) {
			$("#"+id).css("border", "1px solid #ff0000");
			cFormFocus = "#"+id;
		}
	} else {
		$("#"+id).css("border", "1px solid #d7d7d7");
		fileList.push(id); //add to upload
	}

	return !bInvalid;
}

function redonate() {
	window.location.href = 'donate.php?redonate=' + queueID;
}

function submitForm() {

	if (!validateForm())
		return;
}