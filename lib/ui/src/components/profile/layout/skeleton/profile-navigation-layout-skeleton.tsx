import { getProfileNavigationItems } from '../../../../helpers/profile/get-profile-navigation-items'
import { NavigationItemId } from '../../../../types/navigation-item-id'
import { NavigationLayoutSkeleton } from '../../../layout/navigation/skeleton/navigation-layout-skeleton'
import { FunctionComponent, PropsWithChildren } from 'react'

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
