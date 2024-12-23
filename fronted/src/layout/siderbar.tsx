import { Link, useLocation } from 'react-router'
import { routes, getMenuRoutes } from '@/router'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Sidebar() {
  const menuRoutes = getMenuRoutes(routes)
  const location = useLocation()

  return (
    <div className="w-64 min-h-screen bg-background border-r">
      <div className="space-y-2 py-4">
        {menuRoutes.map(route => {
          const Icon = route.meta?.icon
          return (
            <Link key={route.path} to={`/dashboard/${route.path}`}>
              <Button
                variant="ghost"
                className={cn('w-full justify-start', location.pathname === `/dashboard/${route.path}` && 'bg-muted')}
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {route.meta?.title}
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
