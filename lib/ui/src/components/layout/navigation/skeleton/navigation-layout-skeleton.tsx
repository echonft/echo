import { NavigationPillsSkeleton } from '@echo/ui/components/layout/navigation/skeleton/navigation-pills-skeleton'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { type NavigationItem } from '@echo/ui/types/navigation-item'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  navigationItems: NavigationItem[]
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
