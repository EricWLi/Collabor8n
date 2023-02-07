import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import ColorPicker from "./ColorPicker";
import Toolbar from "./Toolbar";

function Whiteboard() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [strokes, setStrokes] = useState([]);
  const [tool, setTool] = useState({
    tool: 'pencil',
    brushSize: 1,
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

  function handleBrushSizeChange(size) {
    setTool({...tool, brushSize: size});
  }

  function updateStrokes(nextStrokes) {
    setStrokes(nextStrokes);
  }

  function handleUndoStroke() {
    setStrokes([...strokes.slice(0, -1)]);
  }

  return (
    <>
      <Canvas width={width} height={height} tool={tool} strokes={strokes} updateStrokes={updateStrokes} />
      <Toolbar onToolChange={handleBrushSizeChange} onUndo={handleUndoStroke} />
      <ColorPicker />
    </>
  );
}

export default Whiteboard;