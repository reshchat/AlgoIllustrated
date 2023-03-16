var data = {
  "nodes": [
    {
      "id": 1,
      "name": "A"
    },
    {
      "id": 2,
      "name": "B"
    },
    {
      "id": 3,
      "name": "C"
    },
    {
      "id": 4,
      "name": "D"
    },
    {
      "id": 5,
      "name": "E"
    },
    {
      "id": 6,
      "name": "E"
    }
  ],
  "links": [

    {
      "source": 1,
      "target": 2
    },
    {
      "source": 2,
      "target": 3
    },
    {
      "source": 4,
      "target": 2
    },
    {
      "source": 3,
      "target": 5
    },
    {
      "source": 1,
      "target": 6
    }
  ]
};

var edge_click=false;
var edge_del=false;
var node_del=false;
var bfs_en = false;
var selected_nodes=[];

function run_graph(){
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 40},
  width = 1000 - margin.left - margin.right,
  height = 1000 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var gp = document.getElementById("my_dataviz")
  var svg = d3.select(gp)
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  // Initialize the links
  var link = svg
  .selectAll("line")
  .data(data.links)
  .enter()
  .append("line")
  .style("stroke", "#aaa")

  link.on("click", function(d) {
    console.log(d)
    if(edge_click==true){
      console.log(d)
    }
  })

  // Initialize the nodes
  var node = svg
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("g") // use a group element to hold circle and text elements
      .attr("class", "node")
      .attr("id", function(d) { return d.id; })


  node.append("circle")
        .attr("r", 20)
        .style("fill", "#69b3a2")

  node.append("text")
        .text(function(d) { return d.id; }) // set the text to node id
        .style("font-size", "12px") // set font size

  node.on("click", function(d) {
    console.log(d)
    if(node_del==true){

        var links = [];
        for(var i = 0; i<data.nodes.length; i++){
          if (i != d.index) {
            links.push(data.nodes[i])
          }
        }
        data.nodes = links

      links = [];
      for(var i = 0; i<data.links.length; i++){
        if (d.id != data.links[i].source.id && d.id != data.links[i].target.id) {
          links.push(data.links[i])
        }
      }
      data.links = links


      d3.select("svg").remove();
      run_graph();
      node_del=false;
    }
    if(edge_click==true){
      if(selected_nodes.length==1){
        var new_link = {
          "source": d.id,
          "target": selected_nodes.pop()
        }
        data.links.push(new_link);

        d3.select("svg").remove();
        run_graph();
        console.log(data.nodes), console.log(data.links);
        edge_click=false;
      }
      else{
        selected_nodes.push(d.id);
      }
    }
  })

  link.on("click", function(d) {
    console.log(d)
    if(edge_del==true){
      var links = [];
      for(var i = 0; i<data.links.length; i++){
        if (i != d.index) {
          links.push(data.links[i])
        }
      }
      data.links = links
    }
    d3.select("svg").remove();
    run_graph();
    edge_del=false;
  })

  node.on("click", function(d) {
    console.log(d)
    if(bfs_en==true){
      if (cur.length == 0){
        console.log("0000000000000000")
        prev.push(d.id)
        for(var i = 0; i<data.links.length; i++){
          if (d.id == data.links[i].source.id) {
            cur.push(data.links[i].target.id)
          }
          if (d.id == data.links[i].target.id) {
            cur.push(data.links[i].source.id)
          }
        }
      }
      else{
        console.log("1111111111111")
        if (cur.indexOf(d.id) == -1){
          console.log('ERROR')
        }
        else{
          console.log("222222")
          var temp = []
          for(var i = 0; i<cur.length; i++){
            if (d.id != cur[i]) {
              temp.push(cur[i])
            }
          }
          cur = temp
          prev.push(d.id)
          for(var i = 0; i<data.links.length; i++){
            if (d.id == data.links[i].source.id && prev.indexOf(data.links[i].target.id) == -1) {
              next.push(data.links[i].target.id)
            }
            if (d.id == data.links[i].target.id && prev.indexOf(data.links[i].source.id) == -1) {
              next.push(data.links[i].source.id)
            }
          }
        }
      }
      if(cur.length == 0 && next.length > 0){
        console.log("33")
        cur = next
        next = []
      }
      if(cur.length == 0 && next.length == 0){
        console.log("444")
        bfs_en = false
        console.log('SUCCESS')
      }
    }
  })

  // Let's list the force we wanna apply on the network
  var simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
  .force("link", d3.forceLink()                               // This force provides links between nodes
      .id(function(d) { return d.id; })                     // This provide  the id of a node
      .links(data.links)                                    // and this the list of links
  )
  .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
  .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
  .on("end", ticked);

  // This function is run at each iteration of the force algorithm, updating the nodes position.
  function ticked() {
  link
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

  node
    .attr("transform", d => `translate(${d.x+6},${d.y-6})`);
  }
}

run_graph();
var node_ctr = 2;

function add_node(){
  node_ctr += 1;
  source_num = Math.floor(Math.random() * (node_ctr-2)) + 1;
  var new_node = {
    "id": node_ctr,
    "name": "K"
  }
  console.log(data.nodes);
  data.nodes.push(new_node);

  d3.select("svg").remove();
  run_graph();
  console.log(data.nodes), console.log(data.links);
}

function add_edge(){
  edge_click=true

}

function del_edge(){
  edge_del=true
}

function del_node(){
  node_del=true
}

function bfs(){
  bfs_en = true
}

var prev = [] //Visited
var cur = []
var next = []
