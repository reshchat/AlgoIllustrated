var tosortlist = [4, 1, 2, 5, 3];
var lists_down = {};
var lists_up = {};

var clear_scr = function clear_scr() {
    lists_down = {};
    lists_up = {};
    console.log("clear")
    d3.selectAll("graphsvg").remove();
	$("#graphsvg").empty();
};

var parse_data = function() {
    tosortlist = document.getElementById("sort_list").value.split(",");
    start_sorting();
}

var start_sorting = function start_sorting() {
    clear_scr();
    var sortedlist = merge_sort(tosortlist, 0, lists_down);
    console.log("lists_down", lists_down); 
    console.log("lists_up", lists_up); 
    console.log("sortedlist", sortedlist);
    run_sortingvis(); 
}

var merge = function merge(left, right) {
    var result = [];
    var i = 0;
    var j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    result = result.concat(left.slice(i)).concat(right.slice(j));
    return result;
};

var merge_sort = function merge_sort(list, level, lists_down) {
    if (!lists_down.hasOwnProperty(level.toString())) {
        lists_down[level.toString()] = []; 
    }
    if (!lists_up.hasOwnProperty(level.toString())) {
        lists_up[level.toString()] = []; 
    }
    lists_down[level.toString()].push(list);
    if (list.length > 1) {
        var mid = list.length / 2;
        var left = list.slice(0, mid);
        var right = list.slice(mid);
        list = merge(
            merge_sort(left, level+1, lists_down), 
            merge_sort(right, level+1, lists_down)
        );
        lists_up[level.toString()].push(list);
        return list;
    }
    return list;
};
