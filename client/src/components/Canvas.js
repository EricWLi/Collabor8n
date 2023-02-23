import { useState, useEffect, useRef } from 'react';
import { socket } from './Whiteboard';

function Canvas({ width, height, tool, strokes, updateStrokes }) {
  const [mouseDown, setMouseDown] = useState(false);
  const [currStroke, setCurrStroke] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    // Clear canvas and redraw, since canvas elements keep their content even on re-render.
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    draw(currStroke);
    strokes.forEach(stroke => draw(stroke));

    socket.on('connect', () => console.log('Socket connected.'));

    socket.on('resync', (strokes) => {
      // Clear existing lines for resynchronization.
      updateStrokes([]);
      strokes.forEach(stroke => addStroke(stroke));
    })

    socket.on('drawing', (stroke) => {
      addStroke(stroke);
    });

    return () =>  {
      socket.off('drawing');
      socket.off('connect');
    }
  });

  function applySelectedTool(event) {
    const x = event.clientX ? event.clientX : event.touches[0].clientX;
    const y = event.clientY ? event.clientY : event.touches[0].clientY;

    if (tool.name === 'pen') {
      addPoint(x, y);
    } else if (tool.name === 'eraser') {
      erase(x, y);
    }
  }

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

  function erase(x, y) {
    if (!strokes) {
      return;
    }

    var nextStrokes = strokes.slice();

    for (let i = 0; i < strokes.length; i++) {
      for (let pt of strokes[i].points) {
        if (x < pt.x + 10 && x > pt.x - 10 && y < pt.y + 10 && y > pt.y - 10) {
          nextStrokes.splice(i, 1);
          updateStrokes(nextStrokes);
          return;
        }
      }
    }
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
      width: tool.size,
      points: [...points, { x: transformedX, y: transformedY }]
    });
  }

  function addStroke(stroke) {
    if (!stroke) {
      return;
    }

    updateStrokes(prevStrokes => [...prevStrokes, stroke]);
  }

  function handleMouseDown(event) {
    // Ignore right and middle clicks
    if (event.button !== 0 && event.type !== 'touchstart') {
      return;
    }

    applySelectedTool(event);
    setMouseDown(true);
  }

  function handleMouseUp() {
    if (tool.name === 'pen') {
      addStroke(currStroke);
      socket.emit('drawing', currStroke);
    } else if (tool.name === 'eraser') {
      socket.emit('resyncall', strokes);
    }
    
    setCurrStroke(null);
    setMouseDown(false);
  }

  function handleMouseMove(event) {
    if (!mouseDown || !strokes) {
      return;
    }

    applySelectedTool(event);
  }

  return (
    <div className='canvas-container'>
      <canvas 
        className='canvas'
        ref={canvasRef}
        width={width} 
        height={height}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      >
      </canvas>
    </div>
  );
}

export default Canvas;