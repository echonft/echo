import { NavigationLayoutSkeleton } from '@echo/ui/components/layout/navigation/skeleton/navigation-layout-skeleton'
import { getUserNavigationItems } from '@echo/ui/helpers/user/get-user-navigation-items'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  activeNavigationItem: NavigationItemId
}
export const UserNavigationLayoutSkeleton: FunctionComponent<PropsWithChildren<Props>> = ({
  activeNavigationItem,
  children
}) => {
  return (
    <NavigationLayoutSkeleton navigationItems={getUserNavigationItems()} activeNavigationItem={activeNavigationItem}>
      {children}
    </NavigationLayoutSkeleton>
  )
}
