import { getUserNavigationItems } from '../../../../helpers/user/get-user-navigation-items'
import { NavigationItemId } from '../../../../types/navigation-item-id'
import { NavigationLayoutSkeleton } from '../../../layout/navigation/skeleton/navigation-layout-skeleton'
import { FunctionComponent, PropsWithChildren } from 'react'

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
