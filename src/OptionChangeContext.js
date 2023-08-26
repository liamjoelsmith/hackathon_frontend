import React from 'react';
// const OptionChangeContext = React.createContext();
const OptionChangeContext = React.createContext({
    handleDegreeChange: () => {},
    handleMajorChange: () => {}
});
export default OptionChangeContext;
