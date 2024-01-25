import { linkProvider } from '@echo/api/services/routing/link-provider'
import { NAVIGATION_LISTINGS, NAVIGATION_NFTS, NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { messages } from '@echo/ui/messages/en'
import { type NavigationItem } from '@echo/ui/types/navigation-item'
import { createTranslator } from 'next-intl'
import { isNil } from 'ramda'

export function getUserNavigationItems(username?: string): NavigationItem[] {
  const t = createTranslator({ locale: 'en', messages })
  return [
    {
      id: NAVIGATION_NFTS,
      name: t('user.navigation.items'),
      path: isNil(username) ? '#' : linkProvider.user.items.get({ username })
    },
    {
      id: NAVIGATION_LISTINGS,
      name: t('user.navigation.listings'),
      path: isNil(username) ? '#' : linkProvider.user.listings.get({ username })
    },
    {
      id: NAVIGATION_SWAPS,
      name: t('user.navigation.swaps'),
      path: isNil(username) ? '#' : linkProvider.user.swaps.get({ username })
    }
  ]
}
