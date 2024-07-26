import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.jsx'
import { LibraryProvider } from './contexts/LibraryContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Routes should have access to UserContext for user-specific data access */}
    <UserProvider>
      <LibraryProvider>
          {/* BrowserRouter allows for CS routing, and is utilised by Routes inside the router */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </LibraryProvider>
    </UserProvider>
  </React.StrictMode>,
)
