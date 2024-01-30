'use client'
import { createOffer } from '@echo/api/fetchers/create-offer'
import { linkProvider } from '@echo/api/routing/link-provider'
import { NavigationLayout } from '@echo/ui/components/base/navigation/navigation-layout'
import { NewOfferManager } from '@echo/ui/components/offer/new/new-offer-manager'
import { NAVIGATION_LISTINGS, NAVIGATION_NFTS, NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  username: string
  activeNavigationItem: NavigationItemId
}
export const UserNavigationLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  username,
  activeNavigationItem,
  children
}) => {
  const t = useTranslations('user.navigation')
  return (
    <NavigationLayout
      navigationItems={[
        {
          id: NAVIGATION_NFTS,
          name: t('items'),
          path: linkProvider.user.items.get({ username })
        },
        {
          id: NAVIGATION_LISTINGS,
          name: t('listings'),
          path: linkProvider.user.listings.get({ username })
        },
        {
          id: NAVIGATION_SWAPS,
          name: t('swaps'),
          path: linkProvider.user.swaps.get({ username })
        }
      ]}
      activeNavigationItem={activeNavigationItem}
    >
      {children}
      <NewOfferManager fetcher={{ createOffer }} />
    </NavigationLayout>
  )
}
