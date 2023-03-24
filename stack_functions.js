var node_ctr = 0;
var peek_en = false

var peek = function peek() {
	if(peek_en == false){
		top_val = data.value[data.value.length - 1].name
		console.log('Peek Value: ', top_val)
		peek_en = true	
		color_change(data.value[data.value.length - 1].id, "blue")
	}
	else{
		peek_en = false
		color_change(data.value[data.value.length - 1].id, "red")
	}
};

var push = function push(){
	node_ctr = node_ctr + 1
	inp = document.getElementById("push_val").value
	var new_node = {
		id: node_ctr,
		name: inp,
	};
	if(node_ctr > 1){
		data.next[data.next.length-1].target = node_ctr
	}
	data.next.push({source: node_ctr, target: null})
	data.value.push(new_node);
	console.log(data)
	d3.select("graphsvg").remove();
	run_graph();
}

var pop = function pop(){
	node_ctr = node_ctr - 1
	let values = []
	let next = []
	for(var i = 0; i<data.value.length-1; i++){
		values.push(data.value[i])
		next.push(data.next[i])
	}
	data.value = values
	data.next = next
	console.log(data)
	d3.select("graphsvg").remove();
	$("#graphsvg").empty();
	run_graph();
}

var clear_scr = function clear_scr() {
    console.log("clear")
	data = {
		value: [],
		next: []
	}
	node_ctr = 0
    d3.selectAll("graphsvg").remove();
	$("#graphsvg").empty();
	// $("#graphsvg").selectAll("*").remove();
};
