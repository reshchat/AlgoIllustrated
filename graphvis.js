function run_graph() {
	// set the dimensions and margins of the graph
	var width = 1000;
	var height = 400;
  	var radius = 20;

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

	var link = svg
		.append("g")
		.selectAll("line")
		.data(data.links)
		.enter()
		.append("line")
		.attr("stroke-width", 3)
		.style("stroke", "#aaa");
	link.on("click", function (d) {
		console.log(d);
		if (edge_click == true) {
			console.log(d);
		}
	});

	// Initialize the circle: all located at the center of the svg area
	var node = svg
		.append("g")
		.attr("class", "node")
		.selectAll("circle")
		.data(data.nodes)
		.enter()
		.append("circle")
		.attr("r", radius)
		.attr("cx", width / 2)
		.attr("cy", height / 2)
		.style("fill", "#A5EEDB")
		// .style("fill-opacity", 0.3)
		.attr("stroke", "#b3a2c8")
		.style("stroke-width", 4)
		.call(
			d3
				.drag() // call specific function when circle is dragged
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended)
		)
		.attr("id", function (d) {
			return d.id;
		});

	var texts = svg
		.append("g")
		.selectAll("text")
		.data(data.nodes)
		.enter()
		.append("text")
    .text((d) => d.id)
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
	// .attr("font-size", "12px")
	// .attr("fill", "black")
	// .attr("font-family", "sans-serif")
	// .attr("font-weight", "bold")
  ;

	var drag = d3
		.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended);

	node.call(drag);

	function ticked() {
		texts
			.attr("x", (d) => Math.max(radius, Math.min(width - radius, d.x)))
			.attr("y", (d) => Math.max(radius, Math.min(height - radius, d.y)));
		link
			.attr("x1", function (d) {
				return Math.max(radius, Math.min(width - radius, d.source.x));
			})
			.attr("y1", function (d) {
				return Math.max(radius, Math.min(height - radius, d.source.y));
			})
			.attr("x2", function (d) {
				return Math.max(radius, Math.min(width - radius, d.target.x));
			})
			.attr("y2", function (d) {
				return Math.max(radius, Math.min(height - radius, d.target.y));
			});
		node
			.attr("cx", function (d) {
				return d.x;
			})
			.attr("cy", function (d) {
				return d.y;
			})
			.attr("cx", d => Math.max(radius, Math.min(width - radius, d.x)))
			.attr("cy", d => Math.max(radius, Math.min(height - radius, d.y)));
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
	function fix_nodes(this_node) {
		node.each(function (d) {
			if (this_node != d) {
				d.fx = d.x;
				d.fy = d.y;
			}
		});
	}

	node.on("click", function (d) {
		console.log(d);
		// node
		// 	.filter(function (s) {
		// 		return s.id == d.id;
		// 	})
		// 	.style("fill", "red");

		if (node_del == true) {
			node
				.filter(function (s) {
					return s.id == d.id;
				})
				.style("fill", "red");

			var nodes = [];
			for (var i = 0; i < data.nodes.length; i++) {
				if (i != d.index) {
					nodes.push(data.nodes[i]);
				}
			}
			data.nodes = nodes;

			var links = [];
			for (var i = 0; i < data.links.length; i++) {
				if (
					d.id != data.links[i].source.id &&
					d.id != data.links[i].target.id
				) {
					links.push(data.links[i]);
				}
			}
			data.links = links;

			d3.select("svg").remove();
			run_graph();
			node_del = false;
		}
		if (edge_click == true) {
			console.log("Adding Edges")
			if (selected_nodes.length == 1) {
				var tar = selected_nodes.pop();
				if (tar != d.id) {
					node
						.filter(function (s) {
							console.log(s.id)
							console.log(d.id)
							return s.id == d.id;
						})
						.style("fill", "red");

					var new_link = {
						source: d.id,
						target: tar,
					};
					data.links.push(new_link);

					d3.select("svg").remove();
					run_graph();
					highlight_edge(new_link);
					console.log(data.nodes), console.log(data.links);
					edge_click = false;
				}
			} else {
				selected_nodes.push(d.id);
				node
					.filter(function (s) {
						console.log(s.id)
						console.log(d.id)
						return s.id == d.id;
					})
					.style("fill", "#F88379");
			}
		}
		if (bfs_en == true) {
			if (prev.indexOf(d.id) != -1) {
				changeText("Error")
			} else if (cur.length == 0) {

				node
					.filter(function (s) {
						return s.id == d.id;
					})
					.style("fill", "red");
				prev.push(d.id);
				for (var i = 0; i < data.links.length; i++) {
					if (d.id == data.links[i].source.id) {
						cur.push(data.links[i].target.id);
					}
					if (d.id == data.links[i].target.id) {
						cur.push(data.links[i].source.id);
					}
				}
				changeText(prev.toString())
			} else {
				if (cur.indexOf(d.id) == -1) {
					changeText("error")
				} else {
					console.log("222222");
					var temp = [];
					for (var i = 0; i < cur.length; i++) {
						if (d.id != cur[i]) {
							temp.push(cur[i]);
						}
					}
					cur = temp;
					node
						.filter(function (s) {
							return s.id == d.id;
						})
						.style("fill", "red");
					prev.push(d.id);
					changeText(prev.toString())
					for (var i = 0; i < data.links.length; i++) {
						if (
							d.id == data.links[i].source.id &&
							prev.indexOf(data.links[i].target.id) == -1
						) {
							next.push(data.links[i].target.id);
						}
						if (
							d.id == data.links[i].target.id &&
							prev.indexOf(data.links[i].source.id) == -1
						) {
							next.push(data.links[i].source.id);
						}
					}
				}
			}
			if (cur.length == 0 && next.length > 0) {
				console.log("33");
				cur = next;
				next = [];
			}
			if (cur.length == 0 && next.length == 0) {
				if (prev.length == data.nodes.length) {
					console.log("444");
					bfs_en = false;
					console.log("SUCCESS");
				}
			}
		}
	});

	link.on("click", function (d) {
		console.log("d", d);
		if (edge_del == true) {
			var links = [];
			for (var i = 0; i < data.links.length; i++) {
				if (i != d.index) {
					links.push(data.links[i]);
				}
			}
			data.links = links;
		}
		d3.select("svg").remove();
		run_graph();
		highlight_edge(d);
		edge_del = false;
	});

	node
		.filter(function (s) {
			return bfs_indices.slice(0, bfs_i).indexOf(s.id) != -1;
		})
		.style("fill", "blue"); //s.id == d.id
	if (bfs_i>0){
		changeText(bfs_i.toString())
	}

	run_graph_matlist(data);
}

run_graph();