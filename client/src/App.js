import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

  return (
    <RouterProvider router={router} />
  );
}

export default App;
