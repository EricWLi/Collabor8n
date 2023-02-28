import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Whiteboard from './components/Whiteboard';
import canvasLoader from './loaders/canvasLoader';

function App() {
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
      path: '/canvases/:canvasId',
      element: <Whiteboard />,
      loader: canvasLoader
    }
  ]);

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
