import { links } from '@echo/ui/constants/links'
import { NavigationItems, NavigationListings, NavigationSwaps } from '@echo/ui/constants/navigation-item'
import { getTranslator } from '@echo/ui/messages/get-translator'
import type { NavigationItem } from '@echo/ui/types/navigation-item'
import { isNil } from 'ramda'

export function getCollectionNavigationItems(slug?: string): NavigationItem[] {
  const t = getTranslator()
  return [
    {
      id: NavigationItems,
      name: t('navigation.items'),
      path: isNil(slug) ? '#' : links.collection.items(slug)
    },
    {
      id: NavigationListings,
      name: t('navigation.listings'),
      path: isNil(slug) ? '#' : links.collection.listings(slug)
    },
    {
      id: NavigationSwaps,
      name: t('navigation.swaps'),
      path: isNil(slug) ? '#' : links.collection.swaps(slug)
    }
  ]
}
