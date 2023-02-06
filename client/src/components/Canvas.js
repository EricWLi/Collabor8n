import { useState, useEffect, useRef } from 'react';

function Canvas({ width, height, tool }) {
  const [mouseDown, setMouseDown] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    strokes.forEach(stroke => {
      const first = stroke.points[0];
      ctx.beginPath();
      ctx.moveTo(first.x, first.y);

      // Canvas does not allow single point lines, so use a rectangle instead
      if (stroke.points.length < 2) {
        const offset = stroke.width / 2;
        ctx.fillRect(first.x - offset, first.y - offset, stroke.width, stroke.width);
      }

      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }

      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.stroke();
    });

  });

  function calculateOffset(event) {
    const canvas = canvasRef.current;
    const boundingBox = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingBox.width;
    const scaleY = canvas.height / boundingBox.height;

    // Calculate new coordinates by scale factor
    const x = (event.clientX - boundingBox.left) * scaleX;
    const y = (event.clientY - boundingBox.top) * scaleY;
    return [x, y];
  }

  function handleMouseDown(event) {
    const [x, y] = calculateOffset(event);
    const stroke = {
      color: tool.color,
      width: tool.brushSize,
      points: [{x: x, y: y}]
    };

    setStrokes([...strokes, stroke]);
    setMouseDown(true);
  }

  function handleMouseUp() {
    setMouseDown(false);
  }

  function handleMouseMove(event) {
    if (!mouseDown || !strokes) {
      return;
    }

    const [x, y] = calculateOffset(event);

    setStrokes(prevStrokes => {
      const currStroke = prevStrokes[prevStrokes.length - 1];
      const nextPoint = [...currStroke.points, {x: x, y: y}];
      return [...prevStrokes.slice(0, prevStrokes.length - 1), {
        ...currStroke,
        points: nextPoint
      }];
    });
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