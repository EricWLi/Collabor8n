import { useState, createContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { House } from 'react-bootstrap-icons';
import useWindowResize from '../hooks/useWindowResize';
import useBoardById from '../hooks/useBoardById';
import useHideScroll from '../hooks/useHideScroll';
import { useAuthContext } from '../contexts/AuthContext';
import Canvas from '../components/Canvas';
import ChatBox from '../components/ChatBox';
import ToolSelector from '../components/ToolSelector';
import ToastNotification from '../components/ToastNotification';
import { socket } from '../App';
import ShareDialog from '../components/ShareDialog';

export const ToolContext = createContext(null);

function Whiteboard() {
  useHideScroll();
  const { boardId } = useParams();
  const board = useBoardById(boardId);
  const { user, signout } = useAuthContext();
  const { width, height } = useWindowResize();
  const navigate = useNavigate();
  const [showShare, setShowShare] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const [tool, setTool] = useState({
    name: 'pen',
    size: 3,
    color: '#000000'
  });

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

  async function handleSignout() {
    await signout();
    navigate('/login');
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

          {user ?
            (
              <Box>
                <Button color="inherit" onClick={() => setShowShare(true)}>Share</Button>
                <Button color="inherit" onClick={handleSignout}>Signout</Button>
              </Box>
            ) : (
              <Box>
                <Button color="inherit" component={Link} to="/login">Login</Button>
              </Box>
            )
          }
        </Toolbar>
      </AppBar>

      <Canvas width={width} height={height} tool={tool} strokes={strokes} updateStrokes={updateStrokes} />

      <ToolContext.Provider value={tool}>
        <ToolSelector handleToolChange={handleToolChange} handleUndo={handleUndoStroke} />
      </ToolContext.Provider>

      <ChatBox user={user} />

      { board &&
        <>
          <ToastNotification notification={board} />
          <ShareDialog open={showShare} board={board} setOpen={setShowShare} onClose={() => setShowShare(false)} />
        </>
      }
    </Box>
  );
}

export default Whiteboard;