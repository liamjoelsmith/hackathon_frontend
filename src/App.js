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
// import { nodes as emptyNodes, edges as emptyEdges } from './initial-elements';
import {nodes as emptyNodes, edges as emptyEdges} from './EmptyNodeState';
import 'reactflow/dist/style.css';
import './overview.css';

// import helper .js files
import OptionChangeContext from './OptionChangeContext';
import computeLayout from './ComputeLayout';
import CustomNode from './CustomNode';
import { infoNode, rootNode } from './HeaderNodes';

// alias for custom node type
const nodeTypes = {
  custom: CustomNode,
};

// define mini map
const minimapStyle = {
  height: 120,
};

// computes automatic graph layout
const computeAutoLayout = () => {
  const graph = computeLayout(emptyNodes, emptyEdges);
  const newNodes = emptyNodes.map((node) => ({
      ...node,
      position: {
          x: graph.node(node.id).x - 75 + window.innerWidth/4, // /4 ?
          y: graph.node(node.id).y - 25 + 100   
      }
  }));

  return [...newNodes, ...rootNode, ...infoNode];
};

const OverviewFlow = () => {
  // fetch degree information...
  //...

  // const [infoNodeElements, setInfoNodeElements] = useNodesState(infoNode);
  // const [rootNodeElements, setRootNodeElements] = useNodesState(rootNode);

  // define useful information
  const [degreeSelected, setDegreeSelected] = useState('-');
  const [majorSelected, setMajorSelected] = useNodesState('-');

  // define initial node state
  const [nodes, setNodes, onNodesChange] = useNodesState(emptyNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(emptyEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  // keep track of degree selected
  const handleDegreeChange = (newOption) => {
    setDegreeSelected(newOption);
    
    // change root node name
    // ...

    // fetch the degree from the database
    // ...

    // 

    console.log('Degree changed to:', newOption);
  };

  // keep track of major selected
  const handleMajorChange = (newOption) => {
    setMajorSelected(newOption);

    // fetch the degree from the database
    // ...

    console.log('Major changed to:', newOption);
  };

  // react flow wrapper
  const reactFlowWrapper = useRef(null);

  // adjust edge type
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
      edge.type = edgeType;
    }
    return edge;
  });

  // run auto layout
  useEffect(() => {
    const layoutResult = computeAutoLayout();
    setNodes(layoutResult);
  }, []); 

  // pan/zoom to fit nodes
  useEffect(() => {
    if (reactFlowWrapper.current && nodes.length) {
      const instance = reactFlowWrapper.current.reactFlowInstance;
      instance.fitView();
    }
  }, [nodes]);

  return (
    <OptionChangeContext.Provider value={{handleDegreeChange, handleMajorChange}}>
      <ReactFlow
        nodes={nodes}
        edges={edgesWithUpdatedTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Panel position="top-left">UQ Degree Planner</Panel>
      <Panel position="top-right">Hackathon 2023</Panel>
      <Background color="#aaa" gap={16} />
      </ReactFlow>
    </OptionChangeContext.Provider>
  );
};

export default OverviewFlow;
