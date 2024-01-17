import { createListing } from '@echo/api/services/fetcher/create-listing'
import { createOffer } from '@echo/api/services/fetcher/create-offer'
import { collections } from '@echo/api/services/providers/collections'
import { NavigationLayout } from '@echo/ui/components/layout/navigation/navigation-layout'
import { NewListingManager } from '@echo/ui/components/listing/new/new-listing-manager'
import { NewOfferManager } from '@echo/ui/components/offer/new/new-offer-manager'
import { getProfileNavigationItems } from '@echo/ui/helpers/profile/get-profile-navigation-items'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  activeNavigationItem: NavigationItemId
}
export const ProfileNavigationLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  activeNavigationItem,
  children
}) => {
  return (
    <NavigationLayout navigationItems={getProfileNavigationItems()} activeNavigationItem={activeNavigationItem}>
      {children}
      <NewOfferManager fetcher={{ createOffer }} />
      <NewListingManager fetcher={{ createListing }} provider={{ collections }} />
    </NavigationLayout>
  )
}
