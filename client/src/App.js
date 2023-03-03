import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, ScopedCssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import io from 'socket.io-client';
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Whiteboard from './pages/Whiteboard';

export const socket = io();

function App() {
  // Theme for home, login, signup, and dashboard pages.
  const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#1A1A1A'
      },
      primary: {
        main: '#FD7547',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#2196F3',
      }
    }
  });

  // Theme for the whiteboard.
  const boardTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#FD7547',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#2196F3',
      }
    }
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/signup',
      element: <SignupPage />
    },
    {
      path: '/boards/:boardId',
      element: (
        <ThemeProvider theme={boardTheme}>
          <ScopedCssBaseline>
            <Whiteboard />
          </ScopedCssBaseline>
        </ThemeProvider>
      )
    }
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
