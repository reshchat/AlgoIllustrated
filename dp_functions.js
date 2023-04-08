var arr=[[0,1],[1,0]]

function openPopup() {
	var popup = document.getElementById("popup");
	popup.style.display = "block";
}
function closePopup() {
	var popup = document.getElementById("popup");
	popup.style.display = "none";
}

function openPopupi() {
	var popup = document.getElementById("popup_i");
	popup.style.display = "block";
}
function closePopupi() {
	var popup = document.getElementById("popup_i");
	popup.style.display = "none";
}
function openPopupc() {
	var popup = document.getElementById("popup_cap");
	popup.style.display = "block";
}
function closePopupc() {
	var popup = document.getElementById("popup_cap");
	popup.style.display = "none";
}
var add_item = function add_item(){
values.push(Number(document.getElementById("value").value));
weights.push(Number(document.getElementById("weight").value));
	closePopup();
	d3.select("svg").remove();
	run_graph();
}

var del_item = function del_item(){
	console.log("DELSH")
	var i = Number(document.getElementById("indexi").value)-1
	console.log(document.getElementById("indexi").value)
	if(i>-1){
		values.splice(i,1);
		weights.splice(i,1);
	}
	closePopupi();
	d3.select("svg").remove();
	run_graph();
}

var edit_cap = function edit_cap(){
	console.log("cPPPP")
	console.log(document.getElementById("cap").value)
	var c = Number(document.getElementById("cap").value)
	capacity=c;
	closePopupc();
	d3.select("svg").remove();
	run_graph();
}

var clear_items = function clear_items(){
	values=[]
	weights=[]
	capacity=0
	d3.select("svg").remove();
	run_graph();
}

var node_ctr = data.nodes.at(data.nodes.length - 1).id;
var edge_click = false;
var edge_del = false;
var node_del = false;
var bfs_en = false;
var selected_nodes = [];
var bfs_indices = [];
var qss =[arr];
var highlight=[];
var bfs_i = 0;

var bfs = function bfs() {
	bfs_en = true;
};


var sim_bfs = function sim_bfs() {
	qss=[]
	// arr = new Array(values.length + 1);
	// for (let i = 0; i < arr.length; i++){
	// 	arr[i] = new Array(capacity + 1).fill(0);
	// }
arr=[]
	for (var i = 0; i < values.length+1; i++) {
		arr.push([]);
		for (var j = 0; j < capacity+1; j++) {
			arr[i].push(0);
		}
	}

	for (let i = 1; i <= values.length; i++) {
		// choose all weights from 0 to maximum capacity

		for (let j = 0; j <= capacity; j++) {
			// Don't pick ith element if j-weights[i-1] is negative
			if (weights[i - 1] > j) {
				console.log(arr[i - 1][j])
				arr[i][j] = arr[i - 1][j];
			} else {
				// Store the max value that we get by picking or leaving the i-th item
				arr[i][j] = Math.max(arr[i - 1][j], arr[i - 1][j - weights[i - 1]] + values[i - 1]);
			}
			arr2=[]
			for (let i2=0; i2<arr.length;i2++){
				arr3=[]
				for (let y2=0; y2<arr[0].length;y2++){
					arr3.push(arr[i2][y2])
				}
				arr2.push(arr3);
			}
			highlight.push([i,j])
			qss.push(arr2);
		}
	}
	console.log(qss);
};
var prev_bfs = function prev_bfs() {
	if (bfs_i > 0) {
		bfs_i = bfs_i - 1;
		d3.select("svg").remove();
		run_graph();
	}
}
var next_bfs1 = function next_bfs1() {
	if (bfs_i < (capacity+1)*values.length) {
		bfs_i = bfs_i + 1;
		d3.select("svg").remove();
		run_graph();
	}
}
