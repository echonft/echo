'use client'
import { createListing } from '@echo/api/services/fetchers/create-listing'
import { createOffer } from '@echo/api/services/fetchers/create-offer'
import { collections } from '@echo/api/services/providers/collections'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { NavigationLayout } from '@echo/ui/components/base/navigation/navigation-layout'
import { NewListingManager } from '@echo/ui/components/listing/new/new-listing-manager'
import { NewOfferManager } from '@echo/ui/components/offer/new/new-offer-manager'
import {
  NAVIGATION_LISTINGS_CREATED,
  NAVIGATION_LISTINGS_RECEIVED,
  NAVIGATION_NFTS,
  NAVIGATION_OFFERS_CREATED,
  NAVIGATION_OFFERS_RECEIVED,
  NAVIGATION_SWAPS
} from '@echo/ui/constants/navigation-item'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  activeNavigationItem: NavigationItemId
}
export const ProfileNavigationLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  activeNavigationItem,
  children
}) => {
  const t = useTranslations('profile.navigation')
  return (
    <NavigationLayout
      navigationItems={[
        {
          id: NAVIGATION_NFTS,
          name: t('items'),
          path: linkProvider.profile.items.get()
        },
        {
          id: NAVIGATION_OFFERS_CREATED,
          name: t('offersCreated'),
          path: linkProvider.profile.offersCreated.get()
        },
        {
          id: NAVIGATION_OFFERS_RECEIVED,
          name: t('offersReceived'),
          path: linkProvider.profile.offersReceived.get()
        },
        {
          id: NAVIGATION_LISTINGS_CREATED,
          name: t('listingsCreated'),
          path: linkProvider.profile.listingsCreated.get()
        },
        {
          id: NAVIGATION_LISTINGS_RECEIVED,
          name: t('listingsReceived'),
          path: linkProvider.profile.listingsReceived.get()
        },
        {
          id: NAVIGATION_SWAPS,
          name: t('swaps'),
          path: linkProvider.profile.swaps.get()
        }
      ]}
      activeNavigationItem={activeNavigationItem}
    >
      {children}
      <NewOfferManager fetcher={{ createOffer }} />
      <NewListingManager fetcher={{ createListing }} provider={{ collections }} />
    </NavigationLayout>
  )
}
