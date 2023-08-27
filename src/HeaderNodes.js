import React, {
    useState
} from 'react';

// define default node attributes
const position = { x: 0, y: 0 };  // place-holder position const
const edgeType = 'smoothstep';    // specify edge type
const animate = true;             // specify edge animation true/false
const fontcol = 'white'

// define colours for course category
const corebg = '#3F3B6C';
const partabg = '#624F82';
const partbbg = '#9F73AB';
const partcbg = '#A3C7D6';

// app information node, used to select degree and major
export const infoNode = [
{
    id: 'info',
    type: 'custom',
    position: { x: 50, y: 75 },
    data: {
    label: 'Select a degree:',
    selects: {
        'handle-0': 'smoothstep',  // defines the drop downs
    },
    },
},
];

// // the root node, whose name will be changed to contain the degree name
// export const useRootNodeState = () => {
//     const [rootNode, setRootNode] = useState({
//         id: 'root',
//         position: { x: window.innerWidth / 2, y: 100 },
//         data: {
//             label: '-',
//         },
//         style: { backgroundColor: 'corebg', color: 'fontcol' }
//     });

//     const handleLabelChange = (newOption) => {
//         const updatedRoot = { ...rootNode };
//         updatedRoot.data.label = newOption;
//         setRootNode(updatedRoot);
//     };

//     return [rootNode, handleLabelChange];
// };


// export const rootNode = [
// {
//     id: 'root',
//     position: { x: window.innerWidth / 2, y: 100 },
//     data: {
//     label: '-',
//     },
//     style: { backgroundColor: corebg, color: fontcol}
// },
// ];