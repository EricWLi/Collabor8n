import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

function useBoardById(boardId) {
  const [board, setBoard] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const options = { method: 'GET' };
        
        // Add token to request header if user is logged in
        if (user) {
            options.headers = { Authorization: `Bearer ${user.token}` };
        }

        const res = await fetch(`/api/canvases/${boardId}`, options);
        const data = await res.json();
        setBoard(data);
      } catch {
        setBoard({ error: { message: 'Failed to retrieve board data. Please try again later.' }});
      }
    };

    fetchBoard();
  }, []);

  return board;
}

export default useBoardById;