import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { TournamentProvider } from './contexts/TournamentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <TournamentProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TournamentProvider>
    </AuthProvider>
  </StrictMode>,
)
