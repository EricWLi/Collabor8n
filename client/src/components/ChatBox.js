import { useState } from 'react';
import { socket } from './Whiteboard';
import { Fab } from '@mui/material';
import { ChatRightText, ArrowDown } from 'react-bootstrap-icons';

function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='chat-container'>
            <div className='chat-box'>
                
            </div>

            <div className='chat-button'>
                <Fab onClick={() => setIsOpen(!isOpen)}>
                    { isOpen ? 
                        <ArrowDown size={24} /> : 
                        <ChatRightText size={24} />
                    }
                </Fab>
            </div>
        </div>
    );
}

export default ChatBox;