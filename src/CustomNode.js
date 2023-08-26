import React, { memo, useContext, useState, useEffect } from 'react';
import {  useReactFlow, useStoreApi } from 'reactflow';
import OptionChangeContext from './OptionChangeContext';

function Select({ degreeValue, majorValue, handleId, nodeId }) {
  const { handleDegreeChange, handleMajorChange } = useContext(OptionChangeContext);
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const [degreeOptions, setDegreeOptions] = useState([]);
  const [majorOptions, setMajorOptions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/degree')
      .then(response => response.json())
      .then(data => {
        setDegreeOptions(data);
      })
      .catch(error => {
        console.error('Error fetching degree options:', error);
      });
  }, []);

  const onDegreeChange = (evt) => {
    const newValue = evt.target.value;
    handleDegreeChange(newValue);
    doUpdate(newValue, "degree");
    fetchMajorOptions(newValue);
  }

  const fetchMajorOptions = (selectedDegree) => {
    fetch(`http://localhost:5000/api/v1/majors/degree/${selectedDegree}`)
      .then(response => response.json())
      .then(data => {
        setMajorOptions(data);
      })
      .catch(error => {
        console.error('Error fetching major options:', error);
      });
  };

  // const onMajorChange = (evt) => {
  //   const newValue = evt.target.value;
  //   handleMajorChange(newValue);
  //   doUpdate(newValue, "major")
  // }

  const onMajorChange = (evt) => {
    const newValue = evt.target.value;

    // Fetch nodes and edges after selecting major
    fetch(`http://localhost:5000/api/v1/courses/mapping/${newValue}`) // Note: Use backticks for template literals
    .then(response => response.json())
    .then(data => {
        const [nodes, edges] = data;

        console.log("inside nodes", nodes);
        console.log("inside edges", edges);

        handleMajorChange(newValue, nodes, edges);
        doUpdate(newValue, "major");

        console.log("New nodes", nodes);
        console.log("New edges", edges);
    })
    .catch(error => {
        console.error('Error fetching nodes and edges:', error);
    });
  }

  const doUpdate = (newValue, type) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          if (type === "degree") {
            node.data = {
              ...node.data,
              selects: {
                ...node.data.selects,
                degree: newValue,
              },
            };
          } else if (type === "major") {
            node.data = {
              ...node.data,
              selects: {
                ...node.data.selects,
                major: newValue,
              },
            };
          }
        }
        return node;
      })
    );
  };

  return (
    <div className="custom-node__select">
      <div>Degree</div>
      <select className="nodrag" onChange={onDegreeChange} value={degreeValue}>
        {degreeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div>Major</div>
      <select className="nodrag" onChange={onMajorChange} value={majorValue}>
        {majorOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function CustomNode({ id, data }) {
  return (
    <>
      <div className="custom-node__header">
        Select your degree below:
      </div>
      <div className="custom-node__body">
        {Object.keys(data.selects).map((handleId) => (
          <Select nodeId={handleId} degreeValue={data.selects.degree} majorValue={data.selects.major} />
        ))}
      </div>
    </>
  );
}

export default memo(CustomNode);
