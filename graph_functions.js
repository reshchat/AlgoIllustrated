var node_ctr = data.nodes.at(data.nodes.length - 1).id;
var edge_click = false;
var edge_del = false;
var node_del = false;
var bfs_en = false;
var selected_nodes = [];
var bfs_indices = [];
var bfs_i = 0;

var add_node = function add_node() {
	node_ctr += 1;
	var new_node = {
		id: node_ctr,
		name: "K",
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
var clear = function clear() {
    console.log("clear")
    d3.selectAll("svg").remove();
};
var bfs = function bfs() {
	bfs_en = true;
};

// BFS

var prev = []; // visited
var cur = [];
var next = [];

class Queue {
	constructor() {
		this.items = {};
		this.frontIndex = 0;
		this.backIndex = 0;
	}
	enqueue(item) {
		this.items[this.backIndex] = item;
		this.backIndex++;
		return item + " inserted";
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
}

const q = new Queue();
var sim_bfs = function sim_bfs() {
	bfs_indices=[]
	console.log(Object.keys(q.items).length);
	while (bfs_indices.length < data.nodes.length) {
		console.log(Object.keys(q.items).length);
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
