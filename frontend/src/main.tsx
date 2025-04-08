
import ReactDOM from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles'
import App from './App.js'
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MessagePage from './components/meldinger/MessagePage.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import LoginPage from './components/bruker/LoginPage.js';
import Vær from './components/vær/Vær.js';
import RegisterUserPage from './components/bruker/RegisterUserPage.js';
import ProfilSide from './components/bruker/ProfilSide.js';

// Routes for applikasjonen.

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
    element: <Vær />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registrer",
    element: <RegisterUserPage />,
  },
  {
    path: "/profil",
    element: <ProfilSide />,
  }
])

// Her starter applikasjonen og setter opp router og styling.
// StyledEngineProvider brukes for å sette opp MUI-stilene.
// RouterProvider brukes for å sette opp routing i applikasjonen.
// LocalizationProvider og AdapterDayjs brukes for å sette opp datoformatet i applikasjonen.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StyledEngineProvider injectFirst>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </StyledEngineProvider>
)


//Vær-widget ikoner: https://nrkno.github.io/yr-weather-symbols/

