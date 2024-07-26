import React, { useMemo, useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { NavigationBar } from './components/common'
import { createTheme, CssBaseline, ThemeProvider, Toolbar, useTheme } from '@mui/material'

function App() {

  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: mode,
          mode: mode,
          background: {
            dark: "hsl(230, 17%, 14%)",
            light: "hsl(0, 0%, 100%)"
          }
        }
      })
    ,
    [mode]
  );

  const toggleTheme = () => {
    console.log(mode);
    console.log(theme);
    setMode(mode == 'light' ? 'dark' : 'light');
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          {/* navigation bar should stateful and accessible from all pages */}
          <NavigationBar toggleTheme={toggleTheme} />
          {/* secondary toolbar to push displace screen space */}
          {/* https://stackoverflow.com/questions/56436811/why-are-there-two-toolbar-components-needed-to-render-correctly-in-the-materi */}
          <Toolbar />
          <AppRoutes />
        </CssBaseline>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
