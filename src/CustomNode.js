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

  const onMajorChange = (evt) => {
    const newValue = evt.target.value;

    // Fetch nodes and edges after selecting major
    fetch(`http://localhost:5000/api/v1/courses/mapping/${newValue}`) // Note: Use backticks for template literals
    .then(response => //response.json()
    {// Check if the response content type is JSON before parsing
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
          return response.json();
      }
      throw new TypeError("Oops, we haven't got JSON!");}
    )
    .then(data => {
        console.log(data);
        let [nodes, edges] = data;

        // modify node colours based on course level
        nodes = nodes.map(node => {
          let bgColor = '#3F3B6C';
          // find the first number in the label
          const firstNumberMatch = node.data?.label.match(/\d/);
          const firstNumber = firstNumberMatch ? firstNumberMatch[0] : null;
          if (firstNumber === '1') {
              bgColor = '#624F82';
          } else if (firstNumber === '2') {
              bgColor = '#9F73AB';
          } else {
            bgColor = '#A3C7D6';
          }
          return {
              ...node,
              style: {
                  ...node.style,
                  background: bgColor,
                  color: 'white',
              }
          };
        });

      edges = edges.map(edge => ({
        ...edge,
        markerEnd: { type: 'arrow', color: 'black' },
      }));

        // console.log("inside nodes", nodes);
        // console.log("inside edges", edges);

        handleMajorChange(newValue, nodes, edges);
        doUpdate(newValue, "major");

        // console.log("New nodes", nodes);
        // console.log("New edges", edges);
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
