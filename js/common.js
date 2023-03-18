//surprise colour!
//Referenced to in  home.js and viz.js also
var colourArray = ["#52bc69", "#ed5a7d", "#2ebbd1", "#d9513c", "#fec515", "#4b65ba", "#ff8a27", "#a7d41e"];
					//green, pink, blue, red, yellow, indigo, orange, lime
//var colourArray = ["#15a346", "#ed5a7d", "#23b1bf", "#ce5226", "#deb003", "#574882", "#ff8a27", "#a7d41e"];

function getColours() {
	var generatedColours = new Array();
	while(generatedColours.length < 4) {
		var n = (Math.floor(Math.random()*colourArray.length));
		if($.inArray(n, generatedColours) == -1) {
			generatedColours.push(n);
		}
	}
	return generatedColours;
}
var generatedColours = getColours();
var surpriseColour = colourArray[generatedColours[0]];
var colourTheSecond = colourArray[generatedColours[1]];
var colourTheThird = colourArray[generatedColours[2]];
var colourTheFourth = colourArray[generatedColours[3]];

$( document ).ready(function() {
	
	$('.colour').css("color", surpriseColour); //name
	$('h4').css("background-color", surpriseColour); 

	//title
	$('#title a').click(function() {
		$('#title a').removeClass('selected-viz');
		$(this).addClass('selected-viz');
	});
	
	$('.close-overlay').click(function() {
		$('.overlays').fadeOut(function(){
			$('#dark-overlay').fadeOut();
		});
	});
	
});