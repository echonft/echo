import { NavigationLayoutSkeleton } from '@echo/ui/components/base/navigation/skeleton/navigation-layout-skeleton'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const UserNavigationLayoutSkeleton: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <NavigationLayoutSkeleton pillsCount={3}>{children}</NavigationLayoutSkeleton>
}
