import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import ColorPicker from "./ColorPicker";
import Toolbar from "./Toolbar";

function Whiteboard() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
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

  function handleBrushSizeChange(size) {
    setTool({...tool, brushSize: size});
  }

  return (
    <>
      <Canvas width={width} height={height} tool={tool} />
      <Toolbar onToolChange={handleBrushSizeChange} />
      <ColorPicker />
    </>
  );
}

export default Whiteboard;