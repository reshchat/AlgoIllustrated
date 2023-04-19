var node_ctr = data.nodes.at(data.nodes.length - 1).id;
var edge_click = false;
var edge_del = false;
var node_del = false;
var bfs_en = false;
var selected_nodes = [];
var bfs_indices = [];
var qss =[];
var bfs_i = 0;
function openPopup() {
	var popup = document.getElementById("popup");
	popup.style.display = "block";
}
function closePopup() {
	var popup = document.getElementById("popup");
	popup.style.display = "none";
}

var add_node = function add_node() {
	node_ctr += 1;
	var new_node = {
		id: node_ctr,
	};
	console.log(data.nodes);
	data.nodes.push(new_node);
	d3.select("svg").remove();
	run_graph();
};

var del_node = function del_node() {
	node_del = true;
};
var add_edge = function add_edge() {
	edge_click = true;
};
var del_edge = function del_edge() {
	edge_del = true;
};
var bfs = function bfs() {
	changeText("BFS (Graph, Source)<br>&emsp;tlet Q be a queue<br>&emsp;Q.enqueue(Source)<br>&emsp;mark Source as visited<br>&emsp;while (Q is not empty)<br>&emsp;&emsp;v  =  Q.dequeue()<br>&emsp;&emsp;for all neighbours w of v in Graph<br>&emsp;&emsp;&emsp;if w is not visited<br>&emsp;&emsp;&emsp;&emsp;Q.enqueue(w)<br>&emsp;&emsp;&emsp;&emsp;mark w as visited");
	bfs_en = true;
	showCodetracePanel();
	hideActionsPanel();
	hideGuidePanel();
	hideInstructionPanel();
};
var clear_scr = function clear_scr() {
    console.log("clear")
	data = {
		nodes: [],
		links: []
	}
	node_ctr = 0
    d3.selectAll("graphsvg").remove();
	$("#graphsvg").empty();
	// $("#graphsvg").selectAll("*").remove();
};

// BFS

var prev = []; // visited
var cur = [];
var next = [];
var curli = [];
var ncurl = [];

class Queue {
	constructor() {
		this.items = {};
		this.frontIndex = 0;
		this.backIndex = 0;
	}
	enqueue(item) {
		var ss=[]
		for (let i = this.frontIndex; i < this.backIndex; i++) {
			ss.push(this.items[i])
		}
		if (ss.indexOf(item)==-1) {
			this.items[this.backIndex] = item;
			this.backIndex++;
			return item + " inserted";
		}
	}
	dequeue() {
		const item = this.items[this.frontIndex];
		delete this.items[this.frontIndex];
		this.frontIndex++;
		return item;
	}
	peek() {
		return this.items[this.frontIndex];
	}
	printQueue() {
		return this.items;
	}
	printQueues() {
		var ss=[]
		for (let i = this.frontIndex; i < this.backIndex; i++) {
			ss.push(this.items[i])
		}
		return ss;
	}
}

const q = new Queue();

var sim_bfs = function sim_bfs() {
	changeText("BFS (Graph, Source)<br>&emsp;tlet Q be a queue<br>&emsp;Q.enqueue(Source)<br>&emsp;mark Source as visited<br>&emsp;while (Q is not empty)<br>&emsp;&emsp;v  =  Q.dequeue()<br>&emsp;&emsp;for all neighbours w of v in Graph<br>&emsp;&emsp;&emsp;if w is not visited<br>&emsp;&emsp;&emsp;&emsp;Q.enqueue(w)<br>&emsp;&emsp;&emsp;&emsp;mark w as visited");
	showCodetracePanel();
	hideActionsPanel();
	hideGuidePanel();
	hideInstructionPanel();
	bfs_indices=[]
	console.log(Object.keys(q.items).length);
	while (bfs_indices.length < data.nodes.length) {
		console.log(q.items);
		if (Object.keys(q.items).length === 0) {
			for (var i = 0; i < data.nodes.length; i++) {
				if (bfs_indices.indexOf(data.nodes[i].id) == -1) {
					//console.log(data.nodes[i].id)
					q.enqueue(data.nodes[i].id);
					break;
				}
			}
		} else {
			var p = q.dequeue();
			if (bfs_indices.indexOf(p) == -1){
				bfs_indices.push(p);
			for (var i = 0; i < data.links.length; i++) {
				if (
					p == data.links[i].source.id &&
					bfs_indices.indexOf(data.links[i].target.id) == -1
				) {
					q.enqueue(data.links[i].target.id);
				}
				if (
					p == data.links[i].target.id &&
					bfs_indices.indexOf(data.links[i].source.id) == -1
				) {
					q.enqueue(data.links[i].source.id);
				}
			}
		}
		}
        qss.push(q.printQueues());
	}
	console.log(bfs_indices);
};
var prev_bfs = function prev_bfs() {
	if (bfs_i > 0) {
		bfs_i = bfs_i - 1;
		d3.select("svg").remove();
		run_graph();
	}
}
var next_bfs1 = function next_bfs1() {
	if (bfs_i < bfs_indices.length) {
		bfs_i = bfs_i + 1;
		d3.select("svg").remove();
		run_graph();
	}
}
