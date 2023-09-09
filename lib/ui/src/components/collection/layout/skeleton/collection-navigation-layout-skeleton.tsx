import { getCollectionNavigationItems } from '../../../../helpers/collection/get-collection-navigation-items'
import { NavigationItemId } from '../../../../types/navigation-item-id'
import { NavigationLayoutSkeleton } from '../../../layout/navigation/skeleton/navigation-layout-skeleton'
import { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  activeNavigationItem: NavigationItemId
}
export const CollectionNavigationLayoutSkeleton: FunctionComponent<PropsWithChildren<Props>> = ({
  activeNavigationItem,
  children
}) => {
  return (
    <NavigationLayoutSkeleton
      navigationItems={getCollectionNavigationItems()}
      activeNavigationItem={activeNavigationItem}
    >
      {children}
    </NavigationLayoutSkeleton>
  )
}
