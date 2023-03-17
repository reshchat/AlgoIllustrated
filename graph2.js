
// Set up the SVG element and its container
const svg = d3.select('#graph');
const width = svg.node().getBoundingClientRect().width;
const height = svg.node().getBoundingClientRect().height;
const container = svg.append('g');

// Define the simulation with a drag force and a centering force
const simulation = d3.forceSimulation()
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('charge', d3.forceManyBody().strength(-30).distanceMax(150))
    .force('link', d3.forceLink().id(d => d.id));

// Load the data and create the nodes and links
d3.json('graph_temp.json', function(data) {
    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));
    
    // Add the links
    const link = container.selectAll('.link')
    .data(links)
    .join('line')
    .classed('link', true);
    
    // Add the nodes
    const node = container.selectAll('.node')
    .data(nodes)
    .join('circle')
    .classed('node', true)
    .attr('r', 10)
    .call(drag(simulation));
    
    // Start the simulation
    simulation.nodes(nodes);
    simulation.force('link').links(links);
    simulation.on('tick', () => {
    link.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
    node.attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
});

// Define the drag behavior
function drag(simulation) {
    function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
    }
    function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
    }
    function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
    }
    return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
}