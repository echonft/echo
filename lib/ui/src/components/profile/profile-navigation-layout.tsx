import { NavigationLayout } from '@echo/ui/components/layout/navigation/navigation-layout'
import { getProfileNavigationItems } from '@echo/ui/helpers/profile/get-profile-navigation-items'
import type { NavigationItemId } from '@echo/ui/types/navigation-item-id'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  activeNavigationItem: NavigationItemId
}
export const ProfileNavigationLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  activeNavigationItem,
  children
}) => {
  return (
    <NavigationLayout navigationItems={getProfileNavigationItems()} activeNavigationItem={activeNavigationItem}>
      {children}
    </NavigationLayout>
  )
}
