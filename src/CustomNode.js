import React, { memo, useContext } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';
import FetchData from './FetchData'
import OptionChangeContext from './OptionChangeContext';

const degreeOptions = [
  {
    value: '-',
    label: '-',
  },
  {
    value: 'testa',
    label: 'testa',
  },
  {
    value: 'testb',
    label: 'testb',
  },
];

const majorOptions = [
  {
    value: '-',
    label: '-',
  },
  {
    value: 'dega',
    label: 'dega',
  },
  {
    value: 'degb',
    label: 'degb',
  },
];

function Select({ degreeValue, majorValue, handleId, nodeId }) {
  const { handleDegreeChange, handleMajorChange } = useContext(OptionChangeContext);
  
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onDegreeChange = (evt) => {
    const newValue = evt.target.value;
    handleDegreeChange(newValue);
    doUpdate(newValue, "degree")
  }

  const onMajorChange = (evt) => {
    const newValue = evt.target.value;
    handleMajorChange(newValue);
    doUpdate(newValue, "major")
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
