import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

function useUserBoards() {
  const [boards, setBoards] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await fetch("/api/canvases", {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.token}` }
      });

      const boards = await response.json();
      setBoards(boards);
    };

    fetchBoards();
  }, [user]);

  const createNewBoard = async () => {
    const res = await fetch('/api/canvases', {
      method: 'POST',
      headers: { Authorization: `Bearer ${user.token}` }
    });

    return await res.json();
  }

  const deleteBoard = async (id) => {
    const res = await fetch(`/api/canvases/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` }
    });

    if (res.ok) {
      setBoards(boards.filter(board => board._id !== id));
    }

    return res.ok;
  }

  return { boards, createNewBoard, deleteBoard };
}

export default useUserBoards;