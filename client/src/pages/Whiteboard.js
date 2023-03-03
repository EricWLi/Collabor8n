import { useState, createContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useWindowResize from '../hooks/useWindowResize';
import useBoardById from '../hooks/useBoardById';
import { useAuthContext } from '../contexts/AuthContext';

import { AppBar, Box, Typography } from '@mui/material';
import { socket } from '../App';

import Canvas from '../components/Canvas';
import ChatBox from '../components/ChatBox';
import Toolbar from '../components/Toolbar';
import ToastNotification from '../components/ToastNotification';

export const ToolContext = createContext(null);

function Whiteboard() {
  const { boardId } = useParams();
  const board = useBoardById(boardId);
  const [strokes, setStrokes] = useState([]);
  const [tool, setTool] = useState({
    name: 'pen',
    size: 3,
    color: '#000000'
  });

  const { user } = useAuthContext();
  const { width, height } = useWindowResize();

  useEffect(() => {
    if (board && board._id) {
      setStrokes(board.objects);

      socket.emit('join', board._id);
      console.log('Joined room', board._id);

      return () => {
        socket.emit('leave', board._id)
        console.log('Left room', board._id);
      };
    }
  }, [board]);

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

      <ChatBox user={user} />

      <ToastNotification notification={board} />
    </Box>
  );
}

export default Whiteboard;