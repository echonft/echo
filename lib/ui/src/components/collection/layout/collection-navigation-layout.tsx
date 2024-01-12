import { createOffer } from '@echo/api/services/fetcher/create-offer'
import { CalloutManager } from '@echo/ui/components/layout/callout/callout-manager'
import { NavigationLayout } from '@echo/ui/components/layout/navigation/navigation-layout'
import { NewOfferManager } from '@echo/ui/components/offer/new/new-offer-manager'
import { getCollectionNavigationItems } from '@echo/ui/helpers/collection/get-collection-navigation-items'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { type FunctionComponent, type PropsWithChildren } from 'react'

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
      <NewOfferManager fetcher={{ createOffer }} />
      <CalloutManager />
    </NavigationLayout>
  )
}
