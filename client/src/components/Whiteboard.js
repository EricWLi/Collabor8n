import { useState, useEffect, createContext } from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';

export const ToolContext = createContext(null);

function Whiteboard() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [strokes, setStrokes] = useState([]);
  const [tool, setTool] = useState({
    tool: 'pencil',
    brushSize: 3,
    color: 'black'
  });

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  })

  /* Handlers */

  function handleToolChange(newTool) {
    setTool({
      ...tool, 
      ...newTool
    });
  }

  function updateStrokes(nextStrokes) {
    setStrokes(nextStrokes);
  }

  function handleUndoStroke() {
    setStrokes([...strokes.slice(0, -1)]);
  }

  return (
    <div className='whiteboard-container'>
      <Canvas width={width} height={height} tool={tool} strokes={strokes} updateStrokes={updateStrokes} />
      <ToolContext.Provider value={tool}>
        <Toolbar handleToolChange={handleToolChange} handleUndo={handleUndoStroke} />
      </ToolContext.Provider>
    </div>
  );
}

export default Whiteboard;