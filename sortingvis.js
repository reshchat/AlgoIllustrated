var width = 1100;
var height = 500;
var nodeWidth = 30;
var canvas;

var create_array = function create_array(list_part, margin) {
	// var margin = { top: 20 + dy, right: 100, bottom: 100, left: width / 2 + dx};
	var svg = canvas
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var nodeHeight = nodeWidth;

	var array = svg
		.append("g")
		.attr("fill", "transparent")
		.attr("width", nodeWidth * list_part.length)
		.attr("height", nodeHeight);

	var nodes = array
		.selectAll(".node")
		.data(list_part)
		.enter()
		.append("g")
		.attr("class", "node")
		.attr("transform", function (d, i) {
			return "translate(" + i * nodeWidth + ",0)";
		});

	nodes
		.append("rect")
		.attr("width", nodeWidth)
		.attr("height", nodeHeight)
		.attr("fill", "#b3a2c8")
		.attr("stroke", "black")
		.attr("stroke-width", "1px");

	nodes
		.append("text")
		.text(function (d) {
			return d;
		})
		.attr("x", nodeWidth / 2)
		.attr("y", nodeHeight / 2)
		.attr("dy", "0.35em")
		.attr("font-size", "16px")
		.attr("font-family", "Arial")
		.attr("fill", "black")
		.attr("text-anchor", "middle")
		.attr("alignment-baseline", "middle");
};

var sorting_divide = function sorting_divide() {
	var margin = { top: 20, right: 100, bottom: 100, left: width / 2 };
	var diff = 50;
	for (let level in lists_down) {
		var num_elements = lists_down[level].length;
        lists_down[level].forEach(function (list) {
            num_elements += list.length;
		});
		var total_width = num_elements * nodeWidth;
		var initial_margin_left = (width - total_width) / 2;
		margin.left = initial_margin_left;
		margin.top += diff;
        var prevlen = 0;
		lists_down[level].forEach(function (list, i) {
            var element_width = prevlen*nodeWidth;
            margin.left += (element_width + 2* nodeWidth);
            prevlen = list.length;
            console.log("list", list, "margin", margin);
			create_array(list, margin);
		});
	}
};

// var sorting_divide = function sorting_divide() {
// 	var margin = { top: 20, right: 100, bottom: 100, left: width / 2 };
// 	var diff = 50;
//     l=lists_down.length
//     for (let i =0; i<l; i++) {

//     }
//     initi= width/2 - tosortlist.length*nodeWidth/2; 
//     niti= prevmargin - width/(i+2) - tosortlist.length*nodeWidth/(i+2); 
// 	for (let level in lists_down) {
// 		var num_elements = lists_down[level].length;
//         lists_down[level].forEach(function (list) {
//             num_elements += list.length;
// 		});
// 		var total_width = num_elements * nodeWidth;
// 		var initial_margin_left = (width - total_width) / 2;
// 		margin.left = initial_margin_left;
// 		margin.top += diff;
//         var prevlen = 0;
// 		lists_down[level].forEach(function (list, i) {
//             var element_width = prevlen*nodeWidth;
//             margin.left += (element_width + 2* nodeWidth);
//             prevlen = list.length;
//             console.log("list", list, "margin", margin);
// 			create_array(list, margin);
// 		});
// 	}
// };

var run_sortingvis = function run_sortingvis() {
	canvas = d3
		.select("#graphsvg")
		.append("svg")
		.attr("width", width)
		.attr("height", height);
	$("svg").css({ top: 60, left: 60, position: "absolute" });
	// create_array(tosortlist, 0, 0);
    sorting_divide();
};

run_sortingvis();
