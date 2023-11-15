import { links } from '@echo/ui/constants/links'
import { NAVIGATION_ITEMS, NAVIGATION_LISTINGS, NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { type NavigationItem } from '@echo/ui/types/navigation-item'
import { isNil } from 'ramda'

export function getUserNavigationItems(username?: string): NavigationItem[] {
  const t = getTranslator()
  return [
    {
      id: NAVIGATION_ITEMS,
      name: t('user.navigation.items'),
      path: isNil(username) ? '#' : links.user.items(username)
    },
    {
      id: NAVIGATION_LISTINGS,
      name: t('user.navigation.listings'),
      path: isNil(username) ? '#' : links.user.listings(username)
    },
    {
      id: NAVIGATION_SWAPS,
      name: t('user.navigation.swaps'),
      path: isNil(username) ? '#' : links.user.swaps(username)
    }
  ]
}
