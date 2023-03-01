import { useState, createContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AppBar, Box, Typography } from '@mui/material';
import io from 'socket.io-client';
import Canvas from './Canvas';
import ChatBox from './ChatBox';
import Toolbar from './Toolbar';
import useWindowResize from '../hooks/useWindowResize';
import ToastNotification from './ToastNotification';

export const socket = io();
export const ToolContext = createContext(null);

function Whiteboard() {
  const { width, height } = useWindowResize();
  const board = useLoaderData();
  const [strokes, setStrokes] = useState(board && board.objects ? board.objects : []);
  const [tool, setTool] = useState({
    name: 'pen',
    size: 3,
    color: '#000000'
  });

  useEffect(() => {
    if (board && board._id) {
      socket.emit('join', board._id);
      console.log('Joined room', board._id);
    }
    
    return () => {
      socket.emit('leave', board._id)
      console.log('Left room', board._id);
    };
  }, []);

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
    <Box className="whiteboard-container">
      <AppBar position="fixed">
        <Typography>Collabor8n</Typography>
      </AppBar>

      <Canvas width={width} height={height} tool={tool} strokes={strokes} updateStrokes={updateStrokes} />

      <ToolContext.Provider value={tool}>
        <Toolbar handleToolChange={handleToolChange} handleUndo={handleUndoStroke} />
      </ToolContext.Provider>

      <ChatBox />

      <ToastNotification board={board} />
    </Box>
  );
}

export default Whiteboard;