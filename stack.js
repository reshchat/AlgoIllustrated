var blocks = []

function run_graph() {
	blocks = []

	var top_sc = 120
	var left_sc = 300
	// set the dimensions and margins of the graph
	var width = 1100;
	var height = 500;

	// append the svg object to the body of the page
	var svg = d3
		.select("#graphsvg")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
    ;
    $("svg").css({top: 60, left: 60, position:'absolute'});
	
	var topmarker = svg
	.append("text")	
	.text("TOP")
	.attr("x", left_sc - 30)
	.attr("y", top_sc + 5)
	.attr("font-size", "12px")
	.attr("font-family", "Comic Sans MS")
	.attr("fill", "black")
	.attr("font-weight", "bold")
	.attr("text-anchor", "middle")
	.attr("alignment-baseline", "middle");

	for(var i = data.value.length-1; i >= 0; i--){
		block = svg
			.append("rect")
			.attr("x", left_sc)
			.attr("y", top_sc)
			.attr("width", 80)
			.attr("height", 20)
			.style("fill", "#7700b3")
			.attr("stroke", "black")
			.style("stroke-width", 1)
			.attr("id", data.value[i].id);
		
		blocks.push(block)
		
		texts = svg
			.append("text")
			.text(data.value[i].name)
			.attr("x", left_sc + 36)
			.attr("y", top_sc + 14)	
			.attr("stroke", "white")		
			.attr("font-size", "10px")
			.attr("font-family", "Comic Sans MS");			
	
		// if(data.next[i].target != null){
		// 	var next = svg
		// 		.append("line")
		// 		.attr("x1", 129)
		// 		.attr("y1", top_sc + 15.5)
		// 		.attr("x2", 129)
		// 		.attr("y2", top_sc + 20)
		// 		.attr("stroke-width", 3)
		// 		.style("stroke", "#aaa");
		// 	next.on("click", function (d) {
		// 		console.log(d);			
		// 	});
		// }
		
		top_sc = top_sc + 25
	}

	run_graph_matlist(data);
}

run_graph();

function color_change(id, col){
	for(var i = 0; i<blocks.length; i++){
		console.log(blocks[i]["_groups"][0][0].id == id) 
		if(blocks[i]["_groups"][0][0].id == id){
			var node = document.createAttribute("style")
			node.value = "fill: ".concat(col, "; stroke-width: 1px;")
			blocks[0]["_groups"][0][0]["attributes"].setNamedItem(node)
		}
	}
}
//-----------------------------------------------------------------------------------------
// create svg element:
// var svg = d3.select("#graphsvg").append("svg").attr("width", 1000).attr("height", 450)
// $("svg").css({top: 60, left: 562, position:'absolute'});

// var ctr = 0
// var top_sc = 120

// function add_block(){
// 	// Add the path using this helper function
// 	var block = svg.append('rect')
// 	.attr('x', 100)
// 	.attr('y', top_sc)
// 	.attr('width', 60)
// 	.attr('height', 15)
// 	.attr('stroke', 'black')
// 	.attr('fill', 'red')
// 	.attr('id', ctr);

// 	block.on("click", function(d){
// 		console.log(d.id)
// 	})
// }

// for(var i = 0; i<5; i++){
// 	add_block()
// 	top_sc = top_sc + 20
// 	ctr = ctr + 1
// }
