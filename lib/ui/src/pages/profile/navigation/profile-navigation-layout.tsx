'use client'
import { createListing } from '@echo/api/fetchers/create-listing'
import { createOffer } from '@echo/api/fetchers/create-offer'
import { collections } from '@echo/api/providers/collections'
import { linkProvider } from '@echo/api/routing/link-provider'
import { ExploreNavigationPill } from '@echo/ui/components/base/navigation/explore-navigation-pill'
import { NavigationLayout } from '@echo/ui/components/base/navigation/navigation-layout'
import { CreateListingManager } from '@echo/ui/components/listing/create/create-listing-manager'
import { CreateOfferManager } from '@echo/ui/components/offer/create/create-offer-manager'
import {
  NAVIGATION_LISTINGS_CREATED,
  NAVIGATION_LISTINGS_RECEIVED,
  NAVIGATION_NFTS,
  NAVIGATION_OFFERS_CREATED,
  NAVIGATION_OFFERS_RECEIVED
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
          path: linkProvider.profile.listingsReceived.get(),
          render: (props) => <ExploreNavigationPill {...props} />
        }
      ]}
      activeNavigationItem={activeNavigationItem}
    >
      {children}
      <CreateOfferManager fetcher={{ createOffer }} />
      <CreateListingManager fetcher={{ createListing }} provider={{ collections }} />
    </NavigationLayout>
  )
}
