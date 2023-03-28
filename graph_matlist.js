var create_adj_matrix = function (data) {
	var matrix = [];
	for (var i = 0; i < data.nodes.length; i++) {
		matrix.push([]);
		for (var j = 0; j < data.nodes.length; j++) {
			matrix[i].push(0);
		}
	}
	for (var i = 0; i < data.links.length; i++) {
		matrix[data.links[i].source.id - 1][data.links[i].target.id - 1] = 1;
		matrix[data.links[i].target.id - 1][data.links[i].source.id - 1] = 1;
	}
	return matrix;
};

var create_adj_list = function (data) {
	var data_list = [];
	for (var i = 0; i < data.nodes.length; i++) {
		data_list.push([]);
	}
	for (var i = 0; i < data.links.length; i++) {
		data_list[data.links[i].source.id - 1].push(data.links[i].target.id);
		data_list[data.links[i].target.id - 1].push(data.links[i].source.id);
	}
	return data_list;
};

var run_graph_matlist = function run_graph_matlist(data) {
	var graph_data_matrix = create_adj_matrix(data);
	var graph_data_list = create_adj_list(data);

	var margin = { top: 60, right: 100, bottom: 100, left: 800 },
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
	var numcols = graph_data_matrix[0].length;

	var matrix = new Array(numrows);
	for (var i = 0; i < numrows; i++) {
		matrix[i] = new Array(numcols);
		for (var j = 0; j < numcols; j++) {
			matrix[i][j] = graph_data_matrix[i][j];
		}
	}

	var rowLabels = new Array(numrows);
	for (var i = 0; i < numrows; i++) {
		rowLabels[i] = i + 1;
	}

	var columnLabels = new Array(numcols);
	for (var i = 0; i < numcols; i++) {
		columnLabels[i] = i + 1;
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
		.data(matrix)
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
