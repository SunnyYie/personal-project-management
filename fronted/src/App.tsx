import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { ThemeProvider } from '@/components/theme-provider'
import { AppRouteObject } from './router/types'
import { Suspense } from 'react'
import { routes } from './router'

export default function App() {
  const renderRoute = (route: AppRouteObject) => {
    const Element = route.element || Navigate
    const to = route.navigate || ''

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.navigate ? (
            <Navigate to={to} replace />
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <Element />
            </Suspense>
          )
        }
      >
        {route.children?.map(renderRoute)}
      </Route>
    )
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>{routes.map(renderRoute)}</Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
