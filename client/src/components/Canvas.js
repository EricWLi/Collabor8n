import { useState, useEffect, useRef } from 'react';

function Canvas({ width, height, tool, strokes, updateStrokes }) {
  const [mouseDown, setMouseDown] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    // Clear canvas, since bitmap elements keep their content even on re-render.
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    strokes.forEach(stroke => {
      const first = stroke.points[0];
      ctx.beginPath();
      ctx.moveTo(first.x, first.y);

      // Canvas does not allow single point lines, so use a rectangle instead
      if (stroke.points.length < 2) {
        ctx.lineTo(first.x, first.y + 1);
      }

      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }

      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke();
    });

  });

  function calculateOffset(event) {
    const canvas = canvasRef.current;
    const boundingBox = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingBox.width;
    const scaleY = canvas.height / boundingBox.height;

    // Calculate new coordinates by scale factor
    const x = Math.floor((event.clientX - boundingBox.left) * scaleX);
    const y = Math.floor((event.clientY - boundingBox.top) * scaleY);
    return [x, y];
  }

  function handleMouseDown(event) {
    // Ignore right and middle clicks
    if (event.button !== 0) {
      return;
    }

    const [x, y] = calculateOffset(event);
    const stroke = {
      color: tool.color,
      width: tool.brushSize,
      points: [{x: x, y: y}]
    };

    updateStrokes([...strokes, stroke]);
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

    updateStrokes(prevStrokes => {
      const currStroke = prevStrokes[prevStrokes.length - 1];
      const nextPoint = [...currStroke.points, {x: x, y: y}];
      return [...prevStrokes.slice(0, prevStrokes.length - 1), {
        ...currStroke,
        points: nextPoint
      }];
    });
  }

  return (
    <div className='canvas-container'>
      <canvas 
        className='canvas'
        ref={canvasRef}
        width={width} 
        height={height}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
      </canvas>
    </div>
  );
}

export default Canvas;