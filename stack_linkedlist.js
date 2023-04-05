var run_graph_matlist = function run_graph_matlist(data) {
    console.log("Running now")
	run_graph_list(data);
};

var run_graph_list = function run_graph_list(data) {
	var margin = { top: 200, right: 100, bottom: 100, left: 500 },
		width = 150,
		height = 150;

	var svg = d3
		// .select("#graphsvg")
        .select("svg")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg
		.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height)
		.attr("fill", "transparent");

	var rect_width = 30;
	var rect_height = 30;

	// var head_rect = svg
	// 	.selectAll(".head_rect")
	// 	.data(data)
	// 	.enter()
	// 	.append("rect")
	// 	.attr("class", "head_rect")
	// 	.attr("x", 0)
	// 	.attr("y", 0)
	// 	.attr("width", rect_width)
	// 	.attr("height", rect_height)
	// 	.style("fill", "#b3a2c8");

    lis = []
    for(var i = data.value.length-1; i>=0; i--){
        lis.push(data.value[i])
    }

    var element_rect = svg
		.selectAll(".element_rect")
		.data(lis)
		.enter()
		.append("rect")
		.attr("class", "element_rect")
		.attr("x", function (d, i) {
            console.log("HERE")
            console.log(i)
			return i * rect_width * 1.5;
		})
		.attr("y", 0)
		.attr("width", rect_width)
		.attr("height", rect_height)
		.style("fill", function (d, i) {
            if(i == 0)
                return "#d580ff";
            else
                return "#aa00ff";
        })
		.attr("stroke", "black")
		.style("stroke-width", 1);

	var label = svg
		.selectAll(".index_label")
		.data(lis)
		.enter()
		.append("text")
		.attr("class", "index_label")
		.attr("x", function (d, i) {
			return ((1.5 * i) + 0.5) * rect_width;
		})
		.attr("dx", "-.35em")
		.attr("y", rect_width / 2)
		.attr("dy", ".35em")
		.text(function (d, i) {
			return lis[i].name;
		})
		.attr("stroke", "white")		
		.attr("font-size", "10px")
		.attr("font-family", "Comic Sans MS");

	var arrow = svg
		.selectAll(".arrow")
		.data(lis.splice(0, data.value.length - 1))
		.enter()
		.append("path")
		.attr("class", "arrow")
		.attr("d", function (d, i) {
			var x1 = (i * rect_width * 1.5) + rect_height;
			var y1 = rect_width / 2;
			var x2 = x1 + (rect_width / 2);
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

	svg.selectAll("tspan").attr("dx", "0.5em");

    label
    .selectAll("tspan")
    .style("font-size", "12px")
    .style("fill", "black");
};
