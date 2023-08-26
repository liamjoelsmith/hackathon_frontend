import React, { useState, useEffect } from 'react';
// const OptionChangeContext = React.createContext();
const OptionChangeContext = React.createContext({
    nodes: [],
    handleDegreeChange: () => {},
    handleMajorChange: () => {}
});
export default OptionChangeContext;

// export function OptionChangeProvider({ children }) {
//     const [nodes, setNodes] = useState([]);

//     const handleDegreeChange = (degreeOptions) => {
//         const updatedNodes = degreeOptions.map(option => {
//             return {
//                 id: option.value,
//                 type: 'default',
//                 data: { label: option.label },
//                 position: { x: Math.random() * 500, y: Math.random() * 500 }
//             };
//         });
//         setNodes(updatedNodes);
//     };

//     const value = {
//         nodes,
//         handleDegreeChange
//         // ... 
//     };

//     return (
//         <OptionChangeContext.Provider value={value}>
//             {children}
//         </OptionChangeContext.Provider>
//     );
// }

