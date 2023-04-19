changeGuideContent(stack_guide_content);
changeInstructionsContent(stack_simulation_instructions_content);

var node_ctr = 0;
var peek_en = false;
var string = "ABCDEF";
var arr = [];
var cur = -1;
var rev = "";
var algo1 = false;
var algo2 = false;
var algo3 = false;
var algo4 = false;

var peek = function peek() {
	if(peek_en == false){
		top_val = data.value[data.value.length - 1].name
		console.log('Peek Value: ', top_val)
		peek_en = true	
		color_change(data.value[data.value.length - 1].id, "blue")
		return top_val;
	}
	else{
		peek_en = false
		color_change(data.value[data.value.length - 1].id, "#7700b3")
	}
};

var peek_val = function peek_val() {
	top_val = data.value[data.value.length - 1].name
	return top_val;
};

var push = function push(){
	if(inp = document.getElementById("push_val").value == "")
		return;
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

var push_val = function push_val(inp){
	node_ctr = node_ctr + 1
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

function openRevPop() {
	var popup = document.getElementById("popup_strrev");
	popup.style.display = "block";
}

function closeRevPop() {
	var popup = document.getElementById("popup_strrev");
	popup.style.display = "none";
}

function openParPop() {
	var popup = document.getElementById("popup_par");
	popup.style.display = "block";
}

function closeParPop() {
	var popup = document.getElementById("popup_par");
	popup.style.display = "none";
}

function openOutPop(output) {
	var popup = document.getElementById("popup_out");
	document.getElementById("status_out").innerHTML = output;
	popup.style.display = "block";
}

function closeOutPop() {
	var popup = document.getElementById("popup_out");
	popup.style.display = "none";
}

function openInstr() {
	var popup = document.getElementById("popup_instr");
	popup.style.display = "block";
}

function closeInstr() {
	var popup = document.getElementById("popup_instr");
	popup.style.display = "none";
}

var strrev = function strrev(){
	changeText("<b>reverseString(string)</b><br>&emsp;create an empty stack<br>&emsp;for all characters i in string<br>&emsp;&emsp;push i to stack<br>&emsp;while stack is not empty<br>&emsp;&emsp;pop from stack and append to output");
	showCodetracePanel();
	hideActionsPanel();
	hideGuidePanel();
	hideInstructionPanel();

	document.getElementById('media-controls').style.visibility = 'visible';

	algo1 = true;
	closeRevPop();
	clear_scr();
	string = String(document.getElementById("string").value);
	arr = [];
	for(var i = 0; i<string.length; i++){
		arr.push({func: "push", val: string.charAt(i)});
	}
	for(var i = string.length-1; i>=0; i--){
		arr.push({func: "pop", val: string.charAt(i)});
	}
	cur = 0;
	document.getElementById("output").innerHTML = String("String: " + string);
}

var strrevint = function strrevint(){
	changeText("<b>reverseString(string)</b><br>&emsp;create an empty stack<br>&emsp;for all characters i in string<br>&emsp;&emsp;push i to stack<br>&emsp;while stack is not empty<br>&emsp;&emsp;pop from stack and append to output");
	showCodetracePanel();
	hideActionsPanel();
	hideGuidePanel();
	hideInstructionPanel();

	algo3 = true;
	closeRevPop();
	clear_scr();
	string = String(document.getElementById("string").value);
	arr = [];
	for(var i = 0; i<string.length; i++){
		arr.push({func: "push", val: string.charAt(i)});
	}
	for(var i = string.length-1; i>=0; i--){
		arr.push({func: "pop", val: string.charAt(i)});
	}
	cur = 0;
	rev = "";
	document.getElementById("push_btn").style.visibility = "visible";
	document.getElementById("pushed").style.visibility = "visible";
	document.getElementById("pop_btn").style.visibility = "visible";
	document.getElementById("rev_btn").style.visibility = "visible";
	document.getElementById("output").innerHTML = String("String: " + string);
}

function highlight(obj, color){
	var orig = obj.style.backgroundColor;
	obj.style.backgroundColor = color;
	setTimeout(function(){
		 obj.style.backgroundColor = orig;
	}, 500);
 }

var pushalg = function pushalg(){
	if(cur>=0 && cur<arr.length && arr[cur].func == "push" && document.getElementById("pushed").value == arr[cur].val){
		push_val(arr[cur].val);
		cur += 1;
		highlight(document.getElementById("push_btn"), 'green')
	}
	else{
		highlight(document.getElementById("push_btn"), 'red')
	}
	if(algo4 == true){
		var hi = "";
		for(var i = 0; i<string.length; i++){
			if(i == cur)
				hi += "-";
			else 
				hi += "&nbsp;";
		}
		console.log(string);
		console.log(hi);
		document.getElementById("output_hi").innerHTML = hi;
	}
}

var popalg = function popalg(){
	if(cur>=0 && cur<arr.length && arr[cur].func == "pop"){
		rev += peek_val();
		pop();
		cur += 1;
		highlight(document.getElementById("pop_btn"), 'green')
		if(algo3 == true){
			document.getElementById("output").innerHTML = String("Popped Characters: " + rev);
		}
	}
	else{
		highlight(document.getElementById("pop_btn"), 'red')
	}
	if(algo4 == true){
		var hi = "";
		for(var i = 0; i<string.length; i++){
			if(i == cur)
				hi += "-";
			else 
				hi += "&nbsp;";
		}
		console.log(string);
		console.log(hi);
		document.getElementById("output_hi").innerHTML = hi;
	}
}

var reversed = function reversed(){
	if(algo3 == true && rev == string.split("").reverse().join("")){
		document.getElementById("rev_btn").style.backgroundColor = 'green';
		algo3 = false;
	}
	else{
		highlight(document.getElementById("rev_btn"), 'red')
	}
}

var balanced = function balanced(){
	if(algo4 == true && arr[cur].func == "status" && arr[cur].val == "Balanced"){
		document.getElementById("bal_btn").style.backgroundColor = 'green';
		algo4 = false;
	}
	else{
		highlight(document.getElementById("bal_btn"), 'red')
	}
}

var unbalanced = function unbalanced(){
	if(algo4 == true && arr[cur].func == "status" && arr[cur].val == "Unbalanced"){
		document.getElementById("unbal_btn").style.backgroundColor = 'green';
		algo4 = false;
	}
	else{
		highlight(document.getElementById("unbal_btn"), 'red')
	}
}

var parcheck = function parcheck(){
	changeText("<b>checkParantheses(string)</b><br>&emsp;create an empty stack<br>&emsp;for all characters i in string<br>&emsp;&emsp;if the current character is a starting bracket ( \'(\') or \'{\'  or \'[\' )<br>&emsp;&emsp;&emsp;push i to stack<br>&emsp;&emsp;if the current character is a closing bracket ( \')\' or \'}\' or \']\' )<br>&emsp;&emsp;&emsp;pop from stack<br>&emsp;&emsp;&emsp;if the popped character is the matching starting bracket, continue<br>&emsp;&emsp;&emsp;else brackets are Not Balanced<br>&emsp;if there is some starting bracket left in stack then Not balanced, else Balanced");
	showCodetracePanel();
	hideActionsPanel();
	hideGuidePanel();
	hideInstructionPanel();

	document.getElementById('media-controls').style.visibility = 'visible';

	algo2 = true;
	closeParPop();
	clear_scr();
	string = String(document.getElementById("par").value);
	arr = [];
	document.getElementById("output").innerHTML = string;
	var stack = [];
	var len = 0;
	for(var i = 0; i<string.length; i++){
		if(string.charAt(i) == '(' || string.charAt(i) == '[' || string.charAt(i) == '{')
		{
			arr.push({func: "push", val: string.charAt(i)});
			stack[len] = string.charAt(i);
			len++;
		}
		else if(string.charAt(i) == ')' || string.charAt(i) == ']' || string.charAt(i) == '}')
		{
			if(len == 0)
			{
				arr.push({func: "status", val: "Unbalanced"});
				break;
			}
			else if(string.charAt(i) == ')' && stack[len - 1] == '(')
			{
				arr.push({func: "pop", val: '('});
				stack[len - 1] = null;
				len = len - 1
			}
			else if(string.charAt(i) == ']' && stack[len - 1] == '[')
			{
				arr.push({func: "pop", val: '['});
				stack[len - 1] = null;
				len = len - 1
			}
			else if(string.charAt(i) == '}' && stack[len - 1] == '{')
			{	
				arr.push({func: "pop", val: '{'});
				stack[len - 1] = null;
				len = len - 1
			}
			else
			{
				arr.push({func: "status", val: "Unbalanced"});
				break;
			}
		}
	}
	if(len == 0)
	{
		arr.push({func: "status", val: "Balanced"});
	}
	else{
		arr.push({func: "status", val: "Unbalanced"});
	}
	cur = 0;
}

var parcheckint = function parcheckint(){
	changeText("<b>checkParantheses(string)</b><br>&emsp;create an empty stack<br>&emsp;for all characters i in string<br>&emsp;&emsp;if the current character is a starting bracket ( \'(\') or \'{\'  or \'[\' )<br>&emsp;&emsp;&emsp;push i to stack<br>&emsp;&emsp;if the current character is a closing bracket ( \')\' or \'}\' or \']\' )<br>&emsp;&emsp;&emsp;pop from stack<br>&emsp;&emsp;&emsp;if the popped character is the matching starting bracket, continue<br>&emsp;&emsp;&emsp;else brackets are Not Balanced<br>&emsp;if there is some starting bracket left in stack then Not balanced, else Balanced");
	showCodetracePanel();
	hideActionsPanel();
	hideGuidePanel();
	hideInstructionPanel();

	algo4 = true;
	closeParPop();
	clear_scr();
	string = String(document.getElementById("par").value);
	arr = [];
	document.getElementById("output").innerHTML = string;
	var hi = "-";
	for(var i = 1; i<string.length; i++){
		hi += "&nbsp;";
	}
	document.getElementById("output_hi").innerHTML = hi;
	var stack = [];
	var len = 0;
	for(var i = 0; i<string.length; i++){
		if(string.charAt(i) == '(' || string.charAt(i) == '[' || string.charAt(i) == '{')
		{
			arr.push({func: "push", val: string.charAt(i)});
			stack[len] = string.charAt(i);
			len++;
		}
		else if(string.charAt(i) == ')' || string.charAt(i) == ']' || string.charAt(i) == '}')
		{
			if(len == 0)
			{
				arr.push({func: "status", val: "Unbalanced"});
				break;
			}
			else if(string.charAt(i) == ')' && stack[len - 1] == '(')
			{
				arr.push({func: "pop", val: '('});
				stack[len - 1] = null;
				len = len - 1
			}
			else if(string.charAt(i) == ']' && stack[len - 1] == '[')
			{
				arr.push({func: "pop", val: '['});
				stack[len - 1] = null;
				len = len - 1
			}
			else if(string.charAt(i) == '}' && stack[len - 1] == '{')
			{	
				arr.push({func: "pop", val: '{'});
				stack[len - 1] = null;
				len = len - 1
			}
			else
			{
				arr.push({func: "status", val: "Unbalanced"});
				break;
			}
		}
	}
	if(len == 0)
	{
		arr.push({func: "status", val: "Balanced"});
	}
	else{
		arr.push({func: "status", val: "Unbalanced"});
	}
	cur = 0;
	document.getElementById("push_btn").style.visibility = "visible";
	document.getElementById("pushed").style.visibility = "visible";
	document.getElementById("pop_btn").style.visibility = "visible";
	document.getElementById("bal_btn").style.visibility = "visible";
	document.getElementById("unbal_btn").style.visibility = "visible";
}

var prev_bfs = function prev_bfs(){
	if(algo1 == true){
		if(cur > 0){
			if(arr[cur-1].func == "push"){
				pop();
			}
			else{
				push_val(arr[cur-1].val);
				rev = rev.substring(0, rev.length-1);
			}
			cur = cur - 1;
		}
		console.log("Reverse String: " + rev);
		document.getElementById("output").innerHTML = String("String: " + string + "<br>Reverse String: " + rev);
		// openOutPop("Reverse String: " + rev);
	}
	else if(algo2 == true){
		if(cur > 0){
			var hi = "";
			for(var i = 0; i<string.length; i++){
				if(i == cur)
					hi += "-";
				else 
					hi += " ";
			}
			document.getElementById("output_hi").innerHTML = hi;

			if(arr[cur-1].func == "status"){
				// document.getElementById("output").innerHTML = String("&emsp;&emsp;&emsp;&emsp;" + arr[cur-1].val);
				openOutPop("Type of Expression: " + arr[cur-1].val);
				algo2 = false;
			}
			else if(arr[cur-1].func == "push"){
				// try {
				// 	pop();
				// }
				// catch(err) {
				// 	document.getElementById("output").innerHTML = String("&emsp;&emsp;&emsp;Unbalanced");
				// 	algo2 = false;
				// }
				pop();
			}
			else{
				push_val(arr[cur-1].val);
			}
			cur = cur - 1;
		}
	}
}

var next_bfs1 = function next_bfs1(){
	if(algo1 == true){
		if(cur <= arr.length-1){
			if(arr[cur].func == "push"){
				push_val(arr[cur].val);
			}
			else{
				pop();
				rev = rev + arr[cur].val;
			}
			cur = cur + 1;
		}
		console.log("Reverse String: " + rev);
		if(cur == arr.length){
			console.log("DONE");
			openOutPop("Reverse String: " + rev)
			algo1 = false;
		}
		document.getElementById("output").innerHTML = String("String: " + string + "<br>Reverse String: " + rev);
	}
	else if(algo2 == true){
		var hi = "";
		for(var i = 0; i<string.length; i++){
			if(i == cur)
				hi += "-";
			else 
				hi += "&nbsp;";
		}
		document.getElementById("output_hi").innerHTML = hi;

		if(cur <= arr.length-1){
			if(arr[cur].func == "status")
			{
				// document.getElementById("output").innerHTML = String("&emsp;&emsp;&emsp;&emsp;" + arr[cur].val);
				openOutPop("Type of Expression: " + arr[cur].val);
				algo2 = false;
			}
			else if(arr[cur].func == "push"){
				push_val(arr[cur].val);
			}
			else{
				// try {
				// 	pop();
				// }
				// catch(err) {
				// 	document.getElementById("output").innerHTML = String("&emsp;&emsp;&emsp;Unbalanced");
				// 	algo2 = false;
				// }
				pop();
			}
			cur = cur + 1;
		}
		// if(cur == arr.length){
		// 	console.log("DONE");
		// 	if(data.value.length == 0)
		// 		document.getElementById("output").innerHTML = String("&emsp;&emsp;&emsp;Balanced");
		// 	else
		// 		document.getElementById("output").innerHTML = String("&emsp;&emsp;&emsp;Unbalanced");
		// 	algo2 = false;
		// }
	}
}

var reverse = function reverse(str){
	if(str.length > 0){
		push(str.charAt(0));
		next = str.substring(1);
	}
	else{
		final = final + peek();
		pop();
	}
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
