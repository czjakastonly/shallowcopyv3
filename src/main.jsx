import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { theme, Provider as DesignSystemProvider } from '@stonly/design-system'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <DesignSystemProvider>
      <App />
    </DesignSystemProvider>
  </ThemeProvider>,
)
