import { NavigationItem } from '../../../types/navigation-item'
import { NavigationItemId } from '../../../types/navigation-item-id'
import { PaddedContainer } from '../padded-container'
import { NavigationPills } from './navigation-pills'
import { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  navigationItems: Array<NavigationItem>
  activeNavigationItem: NavigationItemId
}

export const NavigationLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  navigationItems,
  activeNavigationItem,
  children
}) => {
  return (
    <PaddedContainer>
      <NavigationPills items={navigationItems} activeItem={activeNavigationItem} />
      {children}
    </PaddedContainer>
  )
}
