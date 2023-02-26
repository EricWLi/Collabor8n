import { useState, createContext } from 'react';
import io from 'socket.io-client';
import NavBar from './NavBar'
import Canvas from './Canvas';
import ChatBox from './ChatBox';
import Toolbar from './Toolbar';
import useWindowResize from '../hooks/useWindowResize';
import { useLoaderData } from 'react-router-dom';
import ToastNotification from './ToastNotification';

export const socket = io();
export const ToolContext = createContext(null);

function Whiteboard() {
  const board = useLoaderData();
  const [strokes, setStrokes] = useState(board && board.objects ? board.objects : []);
  const { width, height } = useWindowResize();
  const [tool, setTool] = useState({
    name: 'pen',
    size: 3,
    color: '#000000'
  });

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
    const nextStrokes = [...strokes.slice(0, -1)];
    socket.emit('resyncall', nextStrokes);
    setStrokes(nextStrokes);
  }

  return (
    <div className="whiteboard-container">
      <NavBar />
      <Canvas width={width} height={height} tool={tool} strokes={strokes} updateStrokes={updateStrokes} />

      <ToolContext.Provider value={tool}>
        <Toolbar handleToolChange={handleToolChange} handleUndo={handleUndoStroke} />
      </ToolContext.Provider>

      <ChatBox />

      <ToastNotification board={board} />
    </div>
  );
}

export default Whiteboard;