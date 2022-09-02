var queueID = null;
var timer_start = null;
var rate_value = null;
var rate_time = null;
var kycDone = false;

function copyWallet(address) {
	try {
		navigator.clipboard.writeText(address);
		$("#target_address").html("copy to clipboard success")
	} catch (error) {
		$("#target_address").html("error: "+error);
	}
	setTimeout(function () {
		$("#target_address").html(address);
	}, 2000);
}

const zeroPad = (num, places) => String(num).padStart(places, '0');

function redonate() {
	window.location.href = 'donate.php?redonate=' + queueID;
}