var graph_data_matrix;
var graph_data_list;

var run_graph_matlist = function run_graph_matlist(matrix,labs,values, weights,capacity) {
	graph_data_matrix = matrix;
	graph_data_list = matrix;

	run_graph_matrix(graph_data_matrix);
	run_graph_list(graph_data_list,labs,values, weights,capacity);
};


var highlight_edge = function (link) {
	var rowIndex = link.source.id;
	var colIndex = link.target.id;
	var duration = 5000; // in milliseconds
	console.log(rowIndex, colIndex);

	// Select the cell using its row and column index
	var cell1 = d3
		.select(".row:nth-child(" + (rowIndex + 1) + ")")
		.select(".cell:nth-child(" + colIndex + ")");
	var cell2 = d3
		.select(".row:nth-child(" + (colIndex + 1) + ")")
		.select(".cell:nth-child(" + rowIndex + ")");

	// Set the fill attribute of the cell to the desired color and transition it
	cell1
		.transition()
		.duration(duration)
		.attr("fill", "blue")
		.style("font-weight", "bold")
		.transition()
		.attr("fill", null)
		.style("font-weight", "normal");
	cell2
		.transition()
		.duration(duration)
		.attr("fill", "blue")
		.style("font-weight", "bold")
		.transition()
		.attr("fill", null)
		.style("font-weight", "normal"); // reset

	// find the edge element in adjacency list graph_data_list using the source and target id
	console.log("graph_data_list", graph_data_list);
	var edge_pos = -1;
	for (let i = 0; i < graph_data_list.length; i++) {
		for (let j = 0; j < graph_data_list[i].length; j++) {
			if (i == link.source.id - 1 && graph_data_list[i][j] == link.target.id) {
				console.log(i, graph_data_list[i][j]);
				edge_pos = j;
			}
		}
	}
	console.log("edge_pos", edge_pos, "index", link.source.id - 1);
	var list_elem1 = d3
		.select(".item_label:nth-child(" + link.source.id + ")")
		.select(".tspan:nth-child(" + (edge_pos + 1) + ")");
	console.log("item", list_elem1);
	list_elem1
		.transition()
		.duration(duration)
		.attr("fill", "blue")
		.style("font-weight", "bold")
		.transition()
		.attr("fill", null)
		.style("font-weight", "normal"); // reset
};

var run_graph_matrix = function run_graph_matrix(graph_data_matrix) {
	var margin = { top: 40, right: 100, bottom: 100, left: 800 },
		width = 125,
		height = 125;

	var svg = d3
		.select("svg")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg
		.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height)
		.attr("fill", "#b3a2c8")
		.attr("stroke", "black");

	var numrows = graph_data_matrix.length;
	//var numcols = graph_data_matrix[0].length;
	var numcols = capacity+1;
	var rowLabels = new Array(numrows);
	for (var i = 0; i < numrows; i++) {
		rowLabels[i] = i ;
	}

	var columnLabels = new Array(numcols);
	for (var i = 0; i < numcols; i++) {
		columnLabels[i] = i ;
	}

	var x = d3
		.scaleBand()
		.domain(d3.range(numcols))
		.range([0, width])
		.padding(0.1);

	var y = d3
		.scaleBand()
		.domain(d3.range(numrows))
		.range([0, height])
		.padding(0.1);

	var text = svg
		.selectAll(".row")
		.data(graph_data_matrix)
		.enter()
		.append("g")
		.attr("class", "row")
		.attr("transform", function (d, i) {
			return "translate(0," + y(i) + ")";
		});

	text
		.selectAll(".cell")
		.data(function (d) {
			return d;
		})
		.enter()
		.append("text")
		.attr("class", "cell")
		.attr("x", function (d, i) {
			return x(i) + x.bandwidth() / 2;
		})
		.attr("y", function (d, i) {
			return y.bandwidth() / 2;
		})
		.attr("dy", ".35em")
		.attr("text-anchor", "middle")
		.text(function (d) {
			return d;
		});

	var row = svg
		.selectAll(".column")
		.data(rowLabels)
		.enter()
		.append("g")
		.attr("class", "row")
		.attr("transform", function (d, i) {
			return "translate(0," + y(i) + ")";
		});

	row
		.append("text")
		.attr("x", 0)
		.attr("y", y.bandwidth() / 2)
		.attr("dx", "-.32em")
		.attr("dy", ".32em")
		.attr("text-anchor", "end")
		// .text(function (d, i) {
		//     return i;
		// });
		.text(function (d, i) {
			return d;
		});

	var column = svg
		.selectAll(".column")
		.data(columnLabels)
		.enter()
		.append("g")
		.attr("class", "column")
		.attr("transform", function (d, i) {
			return "translate(" + x(i) + ")rotate(-90)";
		});

	column
		.append("text")
		.attr("x", 6)
		.attr("y", y.bandwidth() / 2)
		.attr("dy", ".32em")
		.attr("text-anchor", "start")
		.text(function (d, i) {
			return d;
		});
};

var run_graph_list = function run_graph_list(graph_data_list,labs,values, weights,capacity) {
	var ind = [];

	for (var i = 1; i <= values.length; i++) {
		ind.push(i);
	}
	graph_data_list=[]
	graph_data_list.push(ind)
	graph_data_list.push(values)
	graph_data_list.push(weights)
	graph_data_list.push([capacity])
	var margin = { top: 70, right: 100, bottom: 100, left: 200 },
		width = 150,
		height = 150;

	var svg = d3
		.select("svg")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg
		.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height)
		.attr("fill", "transparent");

	var rect_width = 40;
	var rect_height = 20;

	var index_rect = svg
		.selectAll(".index_rect")
		.data(graph_data_list)
		.enter()
		.append("rect")
		.attr("class", "index_rect")
		.attr("x", 0)
		.attr("y", function (d, i) {
			return i * rect_height;
		})
		.attr("width", rect_width*2)
		.attr("height", rect_height)
		.style("fill", "#b3a2c8");

	var index_label = svg
		.selectAll(".index_label")
		.data(labs)
		.enter()
		.append("text")
		.attr("class", "index_label")
		.attr("x", rect_width / 2)
		.attr("dx", "-.35em")
		.attr("y", function (d, i) {
			return (i + 0.5) * rect_height;
		})
		.attr("dy", ".35em")
		.text(function (d, i) {
			return d;
		})
		.style("fill", "white");

	var arrow = svg
		.selectAll(".arrow")
		.data(graph_data_list)
		.enter()
		.append("path")
		.attr("class", "arrow")
		.attr("d", function (d, i) {
			var x1 = rect_width + rect_width / 2;
			var y1 = i * rect_height + rect_height / 2;
			var x2 = x1 + rect_width;
			var y2 = y1;
			return "M" + x1 + "," + y1 + "L" + x2 + "," + y2;
		})
		.style("stroke", "black")
		.style("stroke-width", "1px")
		.style("fill", "none")
		.attr("marker-end", "url(#arrowhead)");

	// Define the arrowhead marker.
	var defs = svg.append("defs");
	var marker = defs
		.append("marker")
		.attr("id", "arrowhead")
		.attr("refX", 6)
		.attr("refY", 3)
		.attr("markerWidth", 10)
		.attr("markerHeight", 10)
		.attr("orient", "auto");
	var path = marker
		.append("path")
		.attr("d", "M0,0 L0,6 L6,3 z")
		.style("fill", "black");

	var item_rect = svg
		.selectAll(".item_rect")
		.data(graph_data_list)
		.enter()
		.append("rect")
		.attr("class", "item_rect")
		.attr("width", function (d) {
			return rect_width * d.length;
		})
		.attr("height", rect_height * 0.9)
		.attr("x", rect_width * 2 + rect_width)
		.attr("y", function (d, i) {
			return i * rect_height;
		})
		.style("fill", "#A5EEDB");

	var item_label = svg
		.selectAll(".item_label")
		.data(graph_data_list)
		.enter()
		.append("text")
		.attr("class", "item_label")
		.attr("x", rect_width * 3)
		.attr("y", function (d, i) {
			return (i + 0.5) * rect_height;
		})
		.attr("dy", ".35em")
		.selectAll("tspan")
		.data(function (d) {
			return d;
		})
		.enter()
		.append("tspan")
		.text(function (d) {
			return d + " ";
		});

	svg.selectAll("tspan").attr("dx", "0.5em");

	item_label
		.selectAll("tspan")
		.style("font-size", "12px")
		.style("fill", "black");
};
