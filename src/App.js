import React, { useState, useEffect, } from 'react';
import ReactFlow, {
  Panel,
  Background,
  MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';

const position = { x: 0, y: 0 };  // place-holder position const
const edgeType = 'smoothstep';    // specify edge type
const animate = true;             // specify edge animation true/false

// define colours for course category
const corebg = '#3F3B6C';
const partabg = '#624F82';
const partbbg = '#9F73AB';
// const partcbg = '#A3C7D6';

// text colour
const fontcol = 'white'

// (temporary) example set of initial nodes
const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Root' }, position, style: { backgroundColor: corebg, color: fontcol} },
  { id: '2', data: { label: 'Child 1' }, position, style: { backgroundColor: partabg,  color: fontcol} },
  { id: '3', data: { label: 'Child 2' }, position, style: { backgroundColor: partabg,  color: fontcol} },
  { id: '4', data: { label: 'Grandchild 1' }, position, style: { backgroundColor: partbbg,  color: fontcol} },
  { id: '5', data: { label: 'Grandchild 2' }, position, style: { backgroundColor: partbbg,  color: fontcol} },
  { id: '6', data: { label: 'Grandchild 1' }, position, style: { backgroundColor: partbbg,  color: fontcol} },
  { id: '7', data: { label: 'Grandchild 2' }, position, style: { backgroundColor: partbbg,  color: fontcol} },
];

// (temporary) example set of initial edges
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: edgeType, animated: animate },
  { id: 'e1-3', source: '1', target: '3', type: edgeType, animated: animate },
  { id: 'e2-4', source: '2', target: '4', type: edgeType, animated: animate },
  { id: 'e2-5', source: '2', target: '5', type: edgeType, animated: animate },
  { id: 'e3-6', source: '3', target: '6', type: edgeType, animated: animate },
  { id: 'e3-7', source: '3', target: '7', type: edgeType, animated: animate },
];

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

// the main app
export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges] = useState(initialEdges); // const [edges, setEdges] = useState(initialEdges);

  // compute the layout
  useEffect(() => {
    const graph = computeLayout(initialNodes, initialEdges);
    const newNodes = initialNodes.map((node) => ({
        ...node,
        position: {
            x: graph.node(node.id).x - 75,  // half of the width
            y: graph.node(node.id).y - 25   // half of the height
        }
    }));

    setNodes(newNodes);
  }, []);

  return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow nodes={nodes} edges={edges}>
          <Panel position="top-left">UQ Degree Planner</Panel>
          <Background variant="cross" />
          <MiniMap nodeStrokeWidth={3} zoomable pannable />
        </ReactFlow>
      </div>
  );
}
