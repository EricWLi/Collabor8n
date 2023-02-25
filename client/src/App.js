import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage'
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
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
