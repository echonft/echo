import { NavigationLayoutSkeleton } from '@echo/ui/components/base/navigation/skeleton/navigation-layout-skeleton'
import { getProfileNavigationItems } from '@echo/ui/helpers/profile/get-profile-navigation-items'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  activeNavigationItem: NavigationItemId
}
export const ProfileNavigationLayoutSkeleton: FunctionComponent<PropsWithChildren<Props>> = ({
  activeNavigationItem,
  children
}) => {
  return (
    <NavigationLayoutSkeleton
      navigationItems={getProfileNavigationItems(true)}
      activeNavigationItem={activeNavigationItem}
    >
      {children}
    </NavigationLayoutSkeleton>
  )
}
