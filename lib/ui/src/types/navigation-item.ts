import type { NavigationPillProps } from '@echo/ui/components/base/navigation/navigation-pill'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { type ReactNode } from 'react'

export interface NavigationItem {
  id: NavigationItemId
  name: string
  path: string
  render?: (props: NavigationPillProps) => ReactNode
}
