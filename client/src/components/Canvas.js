import { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';

export const socket = io('http://localhost:8000');

function Canvas({ width, height, tool, strokes, updateStrokes }) {
  const [mouseDown, setMouseDown] = useState(false);
  const [currStroke, setCurrStroke] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    // Clear canvas and redraw, since bitmap elements keep their content even on re-render.
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    draw(currStroke);
    strokes.forEach(stroke => draw(stroke));

    socket.on('connect', () => console.log('Socket connected.'));
    socket.on('drawing', (stroke) => {
      addStroke(stroke);
    });

    return () =>  {
      socket.off('drawing');
      socket.off('connect');
    }
  });

  function draw(stroke) {
    if (!stroke || !stroke.points) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    const first = stroke.points[0];

    ctx.beginPath();
    ctx.moveTo(first.x, first.y);

    // Canvas does not allow single point line; extend by one pixel
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
  }

  function addPoint(x, y) {
    const canvas = canvasRef.current;
    const boundingBox = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingBox.width;
    const scaleY = canvas.height / boundingBox.height;

    // Calculate new coordinates by scale factor
    const transformedX = Math.floor((x - boundingBox.left) * scaleX);
    const transformedY = Math.floor((y - boundingBox.top) * scaleY);

    const points = currStroke ? currStroke.points : [];

    setCurrStroke({
      color: tool.color,
      width: tool.brushSize,
      points: [...points, { x: transformedX, y: transformedY }]
    });
  }

  function addStroke(stroke) {
    updateStrokes(prevStrokes => [...prevStrokes, stroke]);
  }

  function handleMouseDown(event) {
    // Ignore right and middle clicks
    if (event.button !== 0) {
      return;
    }

    addPoint(event.clientX, event.clientY);
    setMouseDown(true);
  }

  function handleMouseUp() {
    addStroke(currStroke);
    socket.emit('drawing', currStroke);
    setCurrStroke(null);
    setMouseDown(false);
  }

  function handleMouseMove(event) {
    if (!mouseDown || !strokes) {
      return;
    }

    addPoint(event.clientX, event.clientY);
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