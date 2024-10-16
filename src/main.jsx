import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Page3d from './pages/3d.jsx';
import { AudioProvider } from './store/AudioContext.jsx';
import ProjDetail from './pages/ProjDetail.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/3d",
    element: <Page3d></Page3d>,
  },
  {
    path: "/project/:id",
    element: <ProjDetail></ProjDetail>,
  }


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
    <AudioProvider>
      <RouterProvider router={router} />
    </AudioProvider>
  </React.StrictMode>
)
