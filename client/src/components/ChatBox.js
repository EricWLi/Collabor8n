import { useState } from 'react';
import { socket } from './Whiteboard';
import { Fab, Badge } from '@mui/material';
import { ChatRightText, ArrowDown } from 'react-bootstrap-icons';
import ChatMessage from './ChatMessage';

function ChatBox() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {open && 
                <div className='chatbox'>
                    <div className='chatbox-messages'>
                        <ChatMessage name='Eric' message='Hello world!' />
                    </div>

                    <div className='chatbox-msgbox'>
                        <textarea></textarea>
                    </div>
                </div>
            }

            <div className='chat-button'>
                <Fab onClick={() => setOpen(!open)}>
                    {open ? 
                        <ArrowDown size={24} /> : 
                        <Badge color='primary' badgeContent={0}>
                            <ChatRightText size={24} />
                        </Badge>
                    }
                </Fab>
            </div>
        </>
    );
}

export default ChatBox;