'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import { ExploreNavigationPill } from '@echo/ui/components/base/navigation/explore-navigation-pill'
import { NavigationLayout } from '@echo/ui/components/base/navigation/navigation-layout'
import { CreateListingManager } from '@echo/ui/components/listing/create/create-listing-manager'
import { CreateOfferManager } from '@echo/ui/components/offer/create/create-offer-manager'
import {
  NAVIGATION_EXPLORE,
  NAVIGATION_LISTINGS,
  NAVIGATION_NFTS,
  NAVIGATION_OFFERS,
  NAVIGATION_PENDING_OFFERS
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
          id: NAVIGATION_OFFERS,
          name: t('offers'),
          path: linkProvider.profile.offers.get()
        },
        {
          id: NAVIGATION_PENDING_OFFERS,
          name: t('pendingOffers'),
          path: linkProvider.profile.pendingOffers.get()
        },
        {
          id: NAVIGATION_LISTINGS,
          name: t('listings'),
          path: linkProvider.profile.listings.get()
        },
        {
          id: NAVIGATION_EXPLORE,
          name: t('explore'),
          path: linkProvider.profile.explore.get(),
          render: (props) => <ExploreNavigationPill {...props} />
        }
      ]}
      activeNavigationItem={activeNavigationItem}
    >
      {children}
      <CreateOfferManager />
      <CreateListingManager />
    </NavigationLayout>
  )
}
