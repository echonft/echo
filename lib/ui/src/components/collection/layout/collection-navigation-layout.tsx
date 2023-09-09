import { getCollectionNavigationItems } from '../../../helpers/collection/get-collection-navigation-items'
import { NavigationItemId } from '../../../types/navigation-item-id'
import { NavigationLayout } from '../../layout/navigation/navigation-layout'
import { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  slug: string
  activeNavigationItem: NavigationItemId
}
export const CollectionNavigationLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  slug,
  activeNavigationItem,
  children
}) => {
  return (
    <NavigationLayout navigationItems={getCollectionNavigationItems(slug)} activeNavigationItem={activeNavigationItem}>
      {children}
    </NavigationLayout>
  )
}
