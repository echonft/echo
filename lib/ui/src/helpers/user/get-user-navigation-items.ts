import { links } from '@echo/ui/constants/links'
import { NavigationItems, NavigationListings, NavigationSwaps } from '@echo/ui/constants/navigation-item'
import { getTranslator } from '@echo/ui/messages/get-translator'
import type { NavigationItem } from '@echo/ui/types/navigation-item'
import { isNil } from 'ramda'

export function getUserNavigationItems(username?: string): NavigationItem[] {
  const t = getTranslator()
  return [
    {
      id: NavigationItems,
      name: t('navigation.items'),
      path: isNil(username) ? '#' : links.user.items(username)
    },
    {
      id: NavigationListings,
      name: t('navigation.listings'),
      path: isNil(username) ? '#' : links.user.listings(username)
    },
    {
      id: NavigationSwaps,
      name: t('navigation.swaps'),
      path: isNil(username) ? '#' : links.user.swaps(username)
    }
  ]
}
