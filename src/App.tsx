import { Router } from "./Router"
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "../src/styles/themes/global"
import { defaultTheme } from "./styles/themes/default"
import { CyclesContextProvider } from "./contexts/CyclesContext"
export function App() {

  return (

    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
