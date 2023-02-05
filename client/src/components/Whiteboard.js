import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar";

function Whiteboard() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

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

  return (
    <>
      <Canvas width={width} height={height} />
      <Toolbar />
    </>
  );
}

export default Whiteboard;