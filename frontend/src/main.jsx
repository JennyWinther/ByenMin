
import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles'
import App from './App.jsx'
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MessagePage from './components/meldinger/MessagePage.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import LoginPage from './components/navbar/LoginPage.jsx';
import Været from './components/vær/Vær.jsx';


const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
  },
  {
    path: "/politiloggen",
    element: <MessagePage />,
  },
  {
    path: "/vaeret",
    element: <Været />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <StyledEngineProvider injectFirst>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </StyledEngineProvider>
)


//Vær-widget ikoner: https://nrkno.github.io/yr-weather-symbols/

