import { links } from '../../constants/links'
import { NavigationItems, NavigationListings, NavigationSwaps } from '../../constants/navigation-item'
import { getTranslator } from '../../messages/get-translator'
import { NavigationItem } from '../../types/navigation-item'
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
