import type { NavigationItem } from '@echo/ui/types/navigation-item'

export type NavigationSkeletonItem = Omit<NavigationItem, 'path'>
