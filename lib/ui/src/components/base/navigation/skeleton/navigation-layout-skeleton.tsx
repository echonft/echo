import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { NavigationPillsSkeleton } from '@echo/ui/components/base/navigation/skeleton/navigation-pills-skeleton'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import type { NavigationSkeletonItem } from '@echo/ui/types/navigation-skeleton-item'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  navigationItems: NavigationSkeletonItem[]
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
