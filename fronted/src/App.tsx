import { ThemeProvider } from '@/components/theme-provider'
import Router from './router/routes'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router />
    </ThemeProvider>
  )
}
