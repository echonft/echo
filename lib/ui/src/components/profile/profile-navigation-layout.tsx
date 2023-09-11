import { getProfileNavigationItems } from '../../helpers/profile/get-profile-navigation-items'
import { NavigationItemId } from '../../types/navigation-item-id'
import { NavigationLayout } from '../layout/navigation/navigation-layout'
import { FunctionComponent, PropsWithChildren } from 'react'

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
