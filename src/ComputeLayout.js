import dagre from 'dagre';

// get a visually nice layout for the nodes
const computeLayout = (nodes, edges) => {
    const graph = new dagre.graphlib.Graph();
    graph.setGraph({});
    graph.setDefaultEdgeLabel(() => ({}));

    nodes.forEach((node) => {
      graph.setNode(node.id, { width: 150, height: 50 }); // set node width/height
    });

    edges.forEach((edge) => {
        graph.setEdge(edge.source, edge.target);
    });

    dagre.layout(graph);
    return graph;
};

export default computeLayout;