import { getUserNavigationItems } from '../../../helpers/user/get-user-navigation-items'
import { NavigationItemId } from '../../../types/navigation-item-id'
import { NavigationLayout } from '../../layout/navigation/navigation-layout'
import { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  username: string
  activeNavigationItem: NavigationItemId
}
export const UserNavigationLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  username,
  activeNavigationItem,
  children
}) => {
  return (
    <NavigationLayout navigationItems={getUserNavigationItems(username)} activeNavigationItem={activeNavigationItem}>
      {children}
    </NavigationLayout>
  )
}
