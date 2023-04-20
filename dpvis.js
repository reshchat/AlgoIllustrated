function run_graph() {
	// set the dimensions and margins of the graph
	var width = 1000;
	var height = 400;
  	var radius = 20;

var pseudo= "create a queue Q \n <br>" +
	"mark current node as visited and put it into Q \n<br>" +
	"while Q is non-empty \n<br>" +
	"    remove the head node of Q \n<br>" +
	"    mark and enqueue all (unvisited) neighbours<br> of this node\n <br><br>"
	// append the svg object to the body of the page
	var svg = d3
		.select("#graphsvg")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
    // .attr("x", "100")
    ;
    $("svg").css({top: 100, left: 60, position:'absolute'});

	// Features of the forces applied to the nodes:
	var simulation = d3
		.forceSimulation(data.nodes)
		.force("center", d3.forceCenter(width / 3, height / 2)) // Attraction to the center of the svg area
		.force("charge", d3.forceManyBody().strength(-50)) // Nodes are attracted one each other of value is > 0
		.force("collide", d3.forceCollide().strength(0.1).radius(30).iterations(1)) // Force that avoids circle overlapping
		.force(
			"link",
			d3.forceLink(data.links).id((d) => d.id)
		)
		.on("tick", ticked);




	var drag = d3
		.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended);



	function ticked() {
	}

	// What happens when a circle is dragged?
	function dragstarted(d) {
		if (!d3.event.active) simulation.alphaTarget(0.03).restart();
		d.fx = d.x;
		d.fy = d.y;
	}
	function dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
		fix_nodes(d);
	}
	function dragended(d) {
		if (!d3.event.active) simulation.alphaTarget(0.03);
		d.fx = d.x;
		d.fy = d.y;
	}






	//run_graph_matlist(qss[bfs_i],labs,values, weights,capacity);

	if (bfs_en){
		console.log(arr)
		run_graph_matlist(arr,labs,values, weights,capacity);
	}
	else{
		run_graph_matlist(qss[bfs_i],labs,values, weights,capacity);

	}
	if(bfs_en == false){
		highlight_edge(highlight[bfs_i])
	}

}

run_graph();