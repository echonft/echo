'use client'
import { pathProvider } from '@echo/api/routing/path-provider'
import { NavigationLayout } from '@echo/ui/components/base/navigation/navigation-layout'
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
          path: pathProvider.user.items.get({ username })
        },
        {
          id: NAVIGATION_LISTINGS,
          name: t('listings'),
          path: pathProvider.user.listings.get({ username })
        },
        {
          id: NAVIGATION_SWAPS,
          name: t('swaps'),
          path: pathProvider.user.swaps.get({ username })
        }
      ]}
      activeNavigationItem={activeNavigationItem}
    >
      {children}
    </NavigationLayout>
  )
}
