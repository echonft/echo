import { NavigationLayoutSkeleton } from '@echo/ui/components/base/navigation/skeleton/navigation-layout-skeleton'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const ProfileNavigationLayoutSkeleton: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <NavigationLayoutSkeleton pillsCount={5}>{children}</NavigationLayoutSkeleton>
}
