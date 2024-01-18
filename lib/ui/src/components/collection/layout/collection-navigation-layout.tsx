import { createListing } from '@echo/api/services/fetchers/create-listing'
import { createOffer } from '@echo/api/services/fetchers/create-offer'
import { collections } from '@echo/api/services/providers/collections'
import { NavigationLayout } from '@echo/ui/components/layout/navigation/navigation-layout'
import { NewListingManager } from '@echo/ui/components/listing/new/new-listing-manager'
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
      <NewListingManager fetcher={{ createListing }} provider={{ collections }} />
    </NavigationLayout>
  )
}
