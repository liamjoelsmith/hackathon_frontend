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

export const nodes = [
  { id: 'abcd', data: { label: 'Root' }, position, style: { backgroundColor: corebg, color: fontcol} },
  { id: '2', data: { label: 'Child 1' }, position, style: { backgroundColor: partabg,  color: fontcol} },
  { id: '3', data: { label: 'Child 2' }, position, style: { backgroundColor: partabg,  color: fontcol} },
  { id: '4', data: { label: 'Grandchild 1' }, position, style: { backgroundColor: partbbg,  color: fontcol} },
  { id: '5', data: { label: 'Grandchild 2' }, position, style: { backgroundColor: partbbg,  color: fontcol} },
  { id: '6', data: { label: 'Grandchild 1' }, position, style: { backgroundColor: partbbg,  color: fontcol} },
  { id: '7', data: { label: 'Grandchild 2' }, position, style: { backgroundColor: partbbg,  color: fontcol} },
];

export const edges = [
  { id: 'e1-2', source: 'abcd', target: '2', type: edgeType, animated: animate },
  { id: 'e1-2', source: '1', target: '2', type: edgeType, animated: animate },
  { id: 'e1-3', source: '1', target: '3', type: edgeType, animated: animate },
  { id: 'e2-4', source: '2', target: '4', type: edgeType, animated: animate },
  { id: 'e2-5', source: '2', target: '5', type: edgeType, animated: animate },
  { id: 'e3-6', source: '3', target: '6', type: edgeType, animated: animate },
  { id: 'e3-7', source: '3', target: '7', type: edgeType, animated: animate },
];



