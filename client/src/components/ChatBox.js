import { useEffect, useState } from 'react';
import { socket } from '../App';
import { Fab, Badge, Box, TextField } from '@mui/material';
import { ChatRightText, ArrowDown } from 'react-bootstrap-icons';
import ChatMessage from './ChatMessage';

function ChatBox({ user }) {
  const [open, setOpen] = useState(false);
  const [guestName, setGuestName] = useState('Guest');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat', data => {
      setMessages(messages => [...messages, data]);
    });

    return () => socket.off('chat');
  }, []);

  const chatMessages = messages.map((msg, i) => {
    return <ChatMessage name={msg.name} message={msg.message} key={i} />
  });

  function handleChatEnterKey(event) {
    if (event.key !== 'Enter') {
      return;
    }

    const name = user ? `${user.firstName} ${user.lastName}` : `Guest: ${guestName}`;
    const message = event.target.value;
    socket.emit('chat', { name, message });

    event.target.value = '';
  }

  return (
    <Box>
      {open &&
        <Box className="chatbox">
          <Box className="chatbox-messages">
            {chatMessages}
          </Box>

          <Box sx={{ margin: '8px' }}>
            { !user &&
              <TextField
                size='small'
                label='Guest Name'
                onChange={e => setGuestName(e.target.value)}
                className='chatbox-guestname-input'
                fullWidth
              />
            }
            <TextField
              label='Message'
              onKeyDown={handleChatEnterKey}
              fullWidth
            />
          </Box>
        </Box>
      }

      <Box className="chat-button">
        <Fab color="primary" onClick={() => setOpen(!open)}>
          {open ?
            <ArrowDown size={24} /> :
            <Badge color="primary" badgeContent={0}>
              <ChatRightText size={24} />
            </Badge>
          }
        </Fab>
      </Box>
    </Box>
  );
}

export default ChatBox;