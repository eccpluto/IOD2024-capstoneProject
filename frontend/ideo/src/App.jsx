import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { NavigationBar } from './components/common'
import { Toolbar } from '@mui/material'


function App() {

  return (
    <React.Fragment>
      {/* navigation bar should stateful and accessible from all pages */}
      <NavigationBar />
      {/* secondary toolbar to push displace screen space */}
      {/* https://stackoverflow.com/questions/56436811/why-are-there-two-toolbar-components-needed-to-render-correctly-in-the-materi */}
      <Toolbar/>
      <AppRoutes />
    </React.Fragment>
  )
}

export default App
