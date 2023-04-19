function openNav() {
	document.getElementById("myNav").style.width = "25%";
}
  
function closeNav() {
	document.getElementById("myNav").style.width = "0%";
}

var mode = "interaction";
var codetraceColor = 'white';

var actionsWidth = 150;
var statusInstructionWidth = 300;
var statusCodetraceWidth = 420;

// opening and closing panels
var isActionsOpen = false;
var isGuideOpen = false;
var isInstructionOpen = false;
var isStatusOpen = false;
var isCodetraceOpen = false;

function showActionsPanel() {
	if(!isActionsOpen) {
		$('#actions').animate({
			width: "+="+actionsWidth,
		});
		isActionsOpen = true;
	}
}
function hideActionsPanel() {
	if(isActionsOpen) {
		$('#actions').animate({
			width: "-="+actionsWidth,
		});
		isActionsOpen = false;
	}
}
function showStatusPanel() {
	if(!isStatusOpen) {
		$('#current-action').show();
		$('#status').animate({
			width: "+="+statusCodetraceWidth,
		});
		isStatusOpen = true;
	}
}
function hideStatusPanel() {
	if(isStatusOpen) {
		$('#current-action').hide();
		$('#status').animate({
			width: "-="+statusCodetraceWidth,
		});
		isStatusOpen = false;
	}
}
function showCodetracePanel() {
	if(!isCodetraceOpen) {
		$('#codetrace').animate({
			width: "+="+statusCodetraceWidth,
		});
		isCodetraceOpen = true;
	}
}
function hideCodetracePanel() {
	if(isCodetraceOpen) {
		$('#codetrace').animate({
			width: "-="+statusCodetraceWidth,
		});
		isCodetraceOpen = false;
	}
}
function showGuidePanel() {
	if(!isGuideOpen) {
		$('#guide').animate({
			width: "+="+statusCodetraceWidth,
		});
		isGuideOpen = true;
	}
}
function hideGuidePanel() {
	if(isGuideOpen) {
		$('#guide').animate({
			width: "-="+statusCodetraceWidth,
		});
		isGuideOpen = false;
	}
}
function showInstructionPanel() {
	if(!isInstructionOpen) {
		$('#instruction').animate({
			width: "+="+statusInstructionWidth,
		});
		isInstructionOpen = true;
	}
}
function hideInstructionPanel() {
	if(isInstructionOpen) {
		$('#instruction').animate({
			width: "-="+statusInstructionWidth,
		});
		isInstructionOpen = false;
	}
}

$( document ).ready(function() {	
	$('#current-action').hide();	
	// $('#actions').css('width', actionsWidth);
	showActionsPanel();
	
	$('#mode-menu a').click(function() {
		var currentMode = $('#mode-button').html().split("<")[0];
		
		if(currentMode == "Simulation Mode") {
			mode = "simulation";
			$('#status-hide').show();
			$('#codetrace-hide').show();
			$('#actions-hide').show();
			$('#guide-hide').show();
			$('#status').show();
			$('#codetrace').show();
			$('#actions').show();
			$('#guide').show();
			hideStatusPanel();
			hideCodetracePanel();
			hideGuidePanel();
			showActionsPanel();
		} else if (currentMode == "Interaction Mode") {
			mode = "interaction";
			$('#status-hide').show();
			$('#codetrace-hide').show();
			$('#actions-hide').show();
			$('#guide-hide').show();
			$('#current-action').html("");
			$('#status').show();
			$('#codetrace').show();
			$('#actions').show();
			$('#guide').show();
			hideStatusPanel();
			hideCodetracePanel();
			hideGuidePanel();
			showActionsPanel();
		}
	});
	
	$('#status-hide').click(function() {
		if(isStatusOpen) {
			hideStatusPanel();
		} else {
			showStatusPanel();
			hideActionsPanel();
			hideGuidePanel();
			hideInstructionPanel();
		}
	});
	$('#codetrace-hide').click(function() {
		if(isCodetraceOpen) {
			hideCodetracePanel();
		} else {
			showCodetracePanel();
			hideActionsPanel();
			hideGuidePanel();
			hideInstructionPanel();
		}
	});
	$('#actions-hide').click(function() {
		if(isActionsOpen) {
			hideActionsPanel();
		} else {
			showActionsPanel();
			hideActionsPanel();
			hideGuidePanel();
			hideInstructionPanel();
		}
	});
	$('#guide-hide').click(function() {
		if(isGuideOpen) {
			hideGuidePanel(); 
		} else {
			showGuidePanel();
			hideActionsPanel();
			hideGuidePanel();
			hideInstructionPanel();
		}
	});
	$('#instruction-hide').click(function() {
		if(isInstructionOpen) {
			hideInstructionPanel(); 
		} else {
			showInstructionPanel();
			hideActionsPanel();
			hideGuidePanel();
			hideInstructionPanel();
		}
	});
	
});

// Codetrace highlight
function highlightLine(lineNumbers) {  // lineNumbers can be an array or a single number.
	$('#codetrace p').css('background-color', colourTheThird).css('color',codetraceColor);
	if (lineNumbers instanceof Array) {
		for(var i=0; i<lineNumbers.length; i++) {
			if(lineNumbers[i] != 0) {
				$('#code'+lineNumbers[i]).css('background-color', 'black').css('color','white');
			}
		}
	} else {
		$('#code'+lineNumbers).css('background-color', 'black').css('color','white');
	}
}