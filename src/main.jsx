import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AlertProvider } from './context/alertContext.jsx'
import { AuthContextProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)