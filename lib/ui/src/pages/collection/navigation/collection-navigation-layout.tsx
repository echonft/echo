'use client'
import { pathProvider } from '@echo/api/routing/path-provider'
import type { Slug } from '@echo/model/types/slug'
import { NavigationLayout } from '@echo/ui/components/base/navigation/navigation-layout'
import { NAVIGATION_LISTINGS, NAVIGATION_NFTS, NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  slug: Slug
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
          path: pathProvider.collection.items.get({ slug })
        },
        {
          id: NAVIGATION_LISTINGS,
          name: t('listings'),
          path: pathProvider.collection.listings.get({ slug })
        },
        {
          id: NAVIGATION_SWAPS,
          name: t('swaps'),
          path: pathProvider.collection.swaps.get({ slug })
        }
      ]}
      activeNavigationItem={activeNavigationItem}
    >
      {children}
    </NavigationLayout>
  )
}
