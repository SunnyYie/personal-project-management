import { LucideIcon } from 'lucide-react'
import { RouteObject } from 'react-router'

export interface MetaProps {
  title: string
  icon?: LucideIcon
  menu?: boolean
}

export interface AppRouteObject extends Omit<RouteObject, 'children'> {
  meta?: MetaProps
  children?: AppRouteObject[]
  navigate?: string
}
