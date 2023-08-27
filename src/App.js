import React, { useCallback, useEffect, useRef, useState} from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
} from 'reactflow';
import {nodes as emptyNodes, edges as emptyEdges} from './EmptyNodeState';
import 'reactflow/dist/style.css';
import './overview.css';

// import helper .js files
import OptionChangeContext from './OptionChangeContext';
import computeLayout from './ComputeLayout';
import CustomNode from './CustomNode';
import { infoNode } from './HeaderNodes';

// alias for custom node type
const nodeTypes = {
  custom: CustomNode,
};

// define mini map
const minimapStyle = {
  height: 120,
};

// computes automatic graph layout
const computeAutoLayout = (nodes, edges) => {
  // compute the layout for the nodes and edges
  const graph = computeLayout(nodes, edges);

  // update the position of the nodes based on the computed layout
  const newNodes = nodes.map((node) => ({
      ...node,
      position: {
          x: graph.node(node.id).x - 25 + 100, 
          y: graph.node(node.id).y*1.5*(1-0.1*Math.random()) - 25 + 225   
      }
  }));

  return newNodes;
};

function fetchElements(url) {
  return fetch(url)
      .then(response => response.json());
}

const OverviewFlow = () => {
  // degree and major variables 
  const [degreeSelected, setDegreeSelected] = useState('-');
  const [majorSelected, setMajorSelected] = useState('-');

  // define initial node state
  var [nodes, setNodes, onNodesChange] = useNodesState(emptyNodes);
  var [edges, setEdges, onEdgesChange] = useEdgesState(emptyEdges);

  // keep track of degree selected
  const handleDegreeChange = (newOption) => {
    setDegreeSelected(newOption);
    console.log('Degree changed to:', newOption);
  };

  // keep track of major selected
  const handleMajorChange = (newOption, newNodes, newEdges) => {
    setMajorSelected(newOption);

    const updatedNodes = computeAutoLayout(newNodes, newEdges);
    const mergedNodes = [...infoNode, ...updatedNodes];
    setNodes(mergedNodes);
    setEdges(newEdges);

    console.log('Major changed to:', newOption);
  };

  // adjust edge type
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
      edge.type = edgeType;
    }
    return edge;
  });

  // set initial layout (info node only)
  useEffect(() => {
    setNodes(infoNode);
  }, []); 

  return (
    <OptionChangeContext.Provider value={{
        nodes: nodes,
        handleDegreeChange, 
        handleMajorChange,
        setNodes,
    }}>
      <ReactFlow
        nodes={nodes}
        edges={edgesWithUpdatedTypes}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        nodesDraggable={true}
        style={{ backgroundColor: 'rgba(203, 195, 227, 0.15)' }}
      >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Panel position="top-left">UQ Prereq Grapher <br /> 2023 Hackathon </Panel>
      <Panel position="top-right">Key: courses are coloured by level.</Panel>
      <Background color="rgba(148, 3, 252, 0.6)" gap={16} />
      </ReactFlow>
    </OptionChangeContext.Provider>
  );
};

export default OverviewFlow;
