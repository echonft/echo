import { NavigationLayout } from '@echo/ui/components/layout/navigation/navigation-layout'
import { NewOfferSliderManager } from '@echo/ui/components/offer/new/new-offer-slider-manager'
import { getCollectionNavigationItems } from '@echo/ui/helpers/collection/get-collection-navigation-items'
import type { NavigationItemId } from '@echo/ui/types/navigation-item-id'
import type { FunctionComponent, PropsWithChildren } from 'react'

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
      <section>
        <NewOfferSliderManager />
      </section>
    </NavigationLayout>
  )
}
