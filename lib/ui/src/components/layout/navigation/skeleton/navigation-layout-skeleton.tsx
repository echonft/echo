import { NavigationItem } from '../../../../types/navigation-item'
import { NavigationItemId } from '../../../../types/navigation-item-id'
import { PaddedContainer } from '../../padded-container'
import { NavigationPillsSkeleton } from './navigation-pills-skeleton'
import { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  navigationItems: Array<NavigationItem>
  activeNavigationItem: NavigationItemId
}

export const NavigationLayoutSkeleton: FunctionComponent<PropsWithChildren<Props>> = ({
  navigationItems,
  activeNavigationItem,
  children
}) => {
  return (
    <PaddedContainer>
      <NavigationPillsSkeleton navigationItems={navigationItems} activeNavigationItem={activeNavigationItem} />
      {children}
    </PaddedContainer>
  )
}
