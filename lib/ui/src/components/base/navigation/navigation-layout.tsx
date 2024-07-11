import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { NavigationPills } from '@echo/ui/components/base/navigation/navigation-pills'
import { type NavigationItem } from '@echo/ui/types/navigation-item'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  navigationItems: NavigationItem[]
  activeNavigationItem: NavigationItemId
}

export const NavigationLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  navigationItems,
  activeNavigationItem,
  children
}) => {
  return (
    <PaddedLayout>
      <NavigationPills items={navigationItems} activeItem={activeNavigationItem} />
      {children}
    </PaddedLayout>
  )
}
