import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Whiteboard from './components/Whiteboard';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import canvasLoader from './loaders/canvasLoader';
import SignupPage from './pages/SignupPage';

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
      primary: {
        main: '#FD7547',
        contrastText: '#fff',
      },
      secondary: {
        main: '#2196F3'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
