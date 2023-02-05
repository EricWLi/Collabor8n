import { useState, useEffect, useRef } from 'react';

function Canvas({ width, height }) {
  const [mouseDown, setMouseDown] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    strokes.forEach(stroke => {
      const first = stroke[0];
      ctx.beginPath();
      ctx.moveTo(first.x, first.y);

      // Canvas does not allow single point lines, so use a rectangle instead
      if (stroke.length < 2) {
        ctx.fillRect(first.x, first.y, 1, 1);
      }

      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }

      ctx.stroke();
    });

  });

  function handleMouseDown(e) {
    setStrokes([...strokes, [
      {
        x: e.clientX,
        y: e.clientY
      }
    ]]);

    setMouseDown(true);
  }

  function handleMouseUp(e) {
    setMouseDown(false);
  }

  function handleMouseMove(e) {
    if (!mouseDown || !strokes) {
      return;
    }

    setStrokes(prevStrokes => {
      const currStroke = prevStrokes[prevStrokes.length - 1];
      return [...prevStrokes.slice(0, prevStrokes.length - 1), [...currStroke, { x: e.clientX, y: e.clientY }]];
    })
  }

  return (
    <>
      <canvas 
        className="canvas"
        ref={canvasRef}
        width={width} 
        height={height}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
      </canvas>
    </>
  );
}

export default Canvas;