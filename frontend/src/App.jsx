
import NavBar from './components/navbar/navbar';
import MessagePage from './components/meldinger/MessagePage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <NavBar />
      <MessagePage />
    </LocalizationProvider>
  )
}

export default App
