import type { NavigationItem } from '@echo/ui/types/navigation-item'
import type { ReactNode } from 'react'

export interface NavigationSkeletonItem extends Omit<NavigationItem, 'path' | 'render'> {
  render?: (props: { name: string; selected?: boolean }) => ReactNode
}
