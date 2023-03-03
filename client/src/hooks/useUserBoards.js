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

  return { boards, createNewBoard };
}

export default useUserBoards;