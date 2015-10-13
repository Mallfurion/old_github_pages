var watchTime = new Date();
var breakStart = new Date();
var breakEnd = new Date();
var totalBreak = 0;
var interval;

Date.prototype.getWeek = function () {
	var onejan = new Date(this.getFullYear(), 0, 1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

$(function () {
	$('#schedule').load('schedule.html', function () {
		var startWeek = 40;
		var today = new Date();
		var weekno = today.getWeek();
		weekno = weekno - startWeek + 1;
		$('.current-week').html("Week number: <b>" + weekno + "</b>.");
		if (weekno % 2 == 0) {
			$('.sapt1').css('display', 'none');
		}
		var day = today.getDay();
		switch (day) {
			case 1:
				$('.luni').attr('style', 'color: red !important').css('font-weight', 'bold');
				break;
			case 2:
				$('.marti').attr('style', 'color: red !important').css('font-weight', 'bold');
				break;
			case 3:
				$('.miercuri').attr('style', 'color: red !important').css('font-weight', 'bold');
				break;
			case 4:
				$('.joi').attr('style', 'color: red !important').css('font-weight', 'bold');
		}
		$('#accordion').accordion({ collapsible: true, active: 'none' });
	});
});



function updateClock() {
	var sec = watchTime.getSeconds() + 1;
	watchTime.setSeconds(sec);
	$('#learning-clock').text(
		('0' + watchTime.getHours().toString()).slice(-2) +
		":" +
		('0' + watchTime.getMinutes().toString()).slice(-2) +
		":" +
		('0' + watchTime.getSeconds().toString()).slice(-2));
};

function secondsToString(seconds) {
	var strg = "";
	if (seconds >= 3600) {
		var hours = seconds / 3600;
		seconds = seconds - hours * 3600;
		strg = hours + " hour(s) ";
	}
	if (seconds >= 60) {
		var minutes = seconds / 60;
		seconds = seconds - minutes * 60;
		strg += minutes + " min ";
	}
	if (seconds > 0) {
		strg += seconds + " sec";
	}
	return strg;
}

function timeToString(time) {
	var seconds = parseInt(time.slice(-2));
	var minutes = parseInt(time.slice(3, 5));
	var hours = parseInt(time.slice(0, 2));
	var strg = "Duration - <b>";
	if (hours != 0) {
		strg = hours + " h ";
		totalBreak += hours * 60 * 60;
	}
	if (minutes != 0 || hours != 0) {
		strg = strg + minutes + " min ";
		totalBreak += minutes * 60;
	}
	if (seconds != 0 || minutes != 0 || hours != 0) {
		strg = strg + seconds + " sec </b>";
		totalBreak += seconds;
	}
	return strg;
}

$(document).ready(function () {
	
	//start learning
	$('#learning-start').click(function () {
		watchTime.setHours(0);
		watchTime.setMinutes(0);
		watchTime.setSeconds(0);
		$(this).attr('disabled', true).css('display', 'none');
		$('#learning-stop').attr('disabled', false).css('display', 'inline-block');
		$('#break-start').attr('disabled', false);
		$('#breaks').empty();
		$('#breaks').append("<p style='font-weight: bold; font-size: 16px;'>Breaks</p>");
		interval = setInterval('updateClock()', 1000);
	});
	//stop learning
	$('#learning-stop').click(function () {
		$(this).attr('disabled', true).css('display', 'none');
		$('#learning-start').attr('disabled', false).css('display', 'inline-block');
		$('#break-stop').css('display', 'none');
		$('#break-start').css('display', 'inline-block').attr('disabled', true);

		window.clearInterval(interval);
		$('#breaks').empty();
		$('#breaks').append("<p>Total learning time - " + $('#learning-clock').text() + "</p>");
		$('#breaks').append("<p>Total break time - " + secondsToString(totalBreak) + "</p>");
		$('#learning-clock').text("00:00:00");
		totalBreak = 0;
	});	
	//take break
	$('#break-start').click(function () {
		$(this).attr('disabled', true).css('display', 'none');
		$('#break-stop').attr('disabled', false).css('display', 'inline-block');
		clearInterval(interval);
		breakStart = new Date().getTime();
	});
	//i'm back
	$('#break-stop').click(function () {
		$(this).attr('disabled', true).css('display', 'none');
		$('#break-start').attr('disabled', false).css('display', 'inline-block');
		interval = setInterval('updateClock()', 1000);
		breakEnd = new Date().getTime();
		var diff = new Date((breakEnd - breakStart) - (1000 * 60 * 60 * 2)).toLocaleTimeString();
		$('#breaks').append("<p>" + timeToString(diff) + "</p>");
	});
});