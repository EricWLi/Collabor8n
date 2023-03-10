import { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import LoadingScreen from '../components/LoadingScreen';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch('/api/users/token');
        const data = await res.json();

        if (data.token) {
          setUser(getUserFromToken(data.token));
        } else if (data.error) {
            setUser(null);
            setError(null);
            setIsLoading(false);
        }
      } catch {
        console.log('Error fetching token.');
      }

      setIsLoading(false);
    }

    if (!user) {
      fetchToken();
    }
  }, []);

  const loginAsGuest = async () => {
    try {
      const res = await fetch('/api/canvases', { method: 'POST' });
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
      } else {
        setError(null);
        return `/boards/${data._id}`;
      }
    } catch {
      setError('An error occurred while logging in as guest. Please try again later.');
    }
  }

  const login = async (username, password) => {
    if (!username) {
      setError('Please enter a username.');
      return;
    }

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
      } else if (data.token) {
        setUser(getUserFromToken(data.token));
        setError(null);
      }
    } catch {
      setError('An error occurred while logging in. Please try again later.');
    }
  }

  const signout = async () => {
    try {
      const res = await fetch('/api/users/logout', { method: 'POST' });

      if (res.ok) {
        setUser(null);
        setError(null);
      }
    } catch {
      setError('An error occurred while logging out. Please try again later.');
    }
  }

  const signup = async (user) => {
    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error.message);
    } else {
      setUser(getUserFromToken(data.token));
      setError(null);
    }
  }

  const getUserFromToken = (token) => {
    return {
      ...jwt_decode(token),
      token
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={
      {
        loginAsGuest,
        login,
        signout,
        signup,
        user,
        error,
        setError
      }
    }>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);