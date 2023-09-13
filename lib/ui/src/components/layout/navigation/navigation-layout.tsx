import { NavigationPills } from '@echo/ui/components/layout/navigation/navigation-pills'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import type { NavigationItem } from '@echo/ui/types/navigation-item'
import type { NavigationItemId } from '@echo/ui/types/navigation-item-id'
import type { FunctionComponent, PropsWithChildren } from 'react'

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
