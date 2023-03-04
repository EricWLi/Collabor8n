import { useState, createContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useWindowResize from '../hooks/useWindowResize';
import useBoardById from '../hooks/useBoardById';
import { useAuthContext } from '../contexts/AuthContext';

import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { socket } from '../App';

import Canvas from '../components/Canvas';
import ChatBox from '../components/ChatBox';
import ToolSelector from '../components/ToolSelector';
import ToastNotification from '../components/ToastNotification';
import useHideScroll from '../hooks/useHideScroll';
import { House } from 'react-bootstrap-icons';

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
  useHideScroll();

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
        <Toolbar>
          <IconButton edge="start" color="inherit" component={Link} to="/dashboard">
            <House />
          </IconButton>

          <Typography variant="h6" ml={2} sx={{ flexGrow: 1 }}>
            Collabor8n
          </Typography>

          <Button color="inherit">Share</Button>
          <Button color="inherit" component={Link} to="/dashboard">Signout</Button>
        </Toolbar>
      </AppBar>

      <Canvas width={width} height={height} tool={tool} strokes={strokes} updateStrokes={updateStrokes} />

      <ToolContext.Provider value={tool}>
        <ToolSelector handleToolChange={handleToolChange} handleUndo={handleUndoStroke} />
      </ToolContext.Provider>

      <ChatBox user={user} />

      <ToastNotification notification={board} />
    </Box>
  );
}

export default Whiteboard;