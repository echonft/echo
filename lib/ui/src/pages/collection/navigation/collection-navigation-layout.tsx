'use client'
import { createListing } from '@echo/api/services/fetchers/create-listing'
import { createOffer } from '@echo/api/services/fetchers/create-offer'
import { collections } from '@echo/api/services/providers/collections'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { NavigationLayout } from '@echo/ui/components/base/navigation/navigation-layout'
import { CreateListingManager } from '@echo/ui/components/listing/create/create-listing-manager'
import { NewOfferManager } from '@echo/ui/components/offer/new/new-offer-manager'
import { NAVIGATION_LISTINGS, NAVIGATION_NFTS, NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('collection.navigation')
  return (
    <NavigationLayout
      navigationItems={[
        {
          id: NAVIGATION_NFTS,
          name: t('items'),
          path: linkProvider.collection.items.get({ slug })
        },
        {
          id: NAVIGATION_LISTINGS,
          name: t('listings'),
          path: linkProvider.collection.listings.get({ slug })
        },
        {
          id: NAVIGATION_SWAPS,
          name: t('swaps'),
          path: linkProvider.collection.swaps.get({ slug })
        }
      ]}
      activeNavigationItem={activeNavigationItem}
    >
      {children}
      <NewOfferManager fetcher={{ createOffer }} />
      <CreateListingManager fetcher={{ createListing }} provider={{ collections }} />
    </NavigationLayout>
  )
}
