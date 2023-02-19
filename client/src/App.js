import './App.css';
import Whiteboard from './components/Whiteboard';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Whiteboard />
  },
  {
    path: ':canvasId',
    element: <Whiteboard />,
    loader: ({ params }) => {
      return fetch(`/api/canvases/${params.canvasId}`)
    }
  }
]);

function App() {
  return (
    // <Whiteboard />
    <RouterProvider router={router} />
  );
}

export default App;
