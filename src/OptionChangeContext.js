import React, { useState, useEffect } from 'react';
// const OptionChangeContext = React.createContext();
const OptionChangeContext = React.createContext({
    nodes: [],
    handleDegreeChange: () => {},
    handleMajorChange: () => {}
});
export default OptionChangeContext;

