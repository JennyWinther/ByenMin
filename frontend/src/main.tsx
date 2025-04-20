
import ReactDOM from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles'
import App from './App.js'
import './App.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MessagePage from './components/meldinger/MessagePage.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import LoginPage from './components/bruker/LoginPage.js';
import Vær from './components/vær/Vær.js';
import RegisterUserPage from './components/bruker/RegisterUserPage.js';
import ProfilSide from './components/bruker/ProfilSide.js';
import { CsrfProvider } from './api/CsrfContext.js';

import { Route } from 'react-router-dom';

// Routerwrapper for useContext slik at alle mulige consumers er provided til
function RouteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CsrfProvider>
      {children}
    </CsrfProvider>
  );
}

// Routes for applikasjonen.
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RouteWrapper><App /></RouteWrapper>} />
      <Route path="/politiloggen" element={<RouteWrapper><MessagePage /></RouteWrapper>} />
      <Route path="/vaeret" element={<RouteWrapper><Vær /></RouteWrapper>} />
      <Route path="/login" element={<RouteWrapper><LoginPage /></RouteWrapper>} />
      <Route path="/registrer" element={<RouteWrapper><RegisterUserPage /></RouteWrapper>} />
      <Route path="/profil" element={<RouteWrapper><ProfilSide /></RouteWrapper>} />
    </>
  )
)

// Her starter applikasjonen og setter opp router og styling.
// StyledEngineProvider brukes for å sette opp MUI-stilene.
// RouterProvider brukes for å sette opp routing i applikasjonen.
// LocalizationProvider og AdapterDayjs brukes for å sette opp datoformatet i applikasjonen.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StyledEngineProvider injectFirst>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CsrfProvider>
        <RouterProvider router={router} />
      </CsrfProvider>
    </LocalizationProvider>
  </StyledEngineProvider>
)


//Vær-widget ikoner: https://nrkno.github.io/yr-weather-symbols/

