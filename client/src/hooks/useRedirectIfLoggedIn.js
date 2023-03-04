import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

function useRedirectIfLoggedIn() {
  const { user, setError } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }

    return () => setError(null);
  }, [user, setError, navigate]);
}

export default useRedirectIfLoggedIn;