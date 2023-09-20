// import React from 'react'
import ReactDOM from 'react-dom/client'
import "normalize.css"
import './index.css'
import { AppRouter } from './AppRouter.tsx'
import { AuthProvider } from './providers/AuthProvider.tsx'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>
)
