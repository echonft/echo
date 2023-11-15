import { links } from '@echo/ui/constants/links'
import { NAVIGATION_ITEMS, NAVIGATION_LISTINGS, NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { type NavigationItem } from '@echo/ui/types/navigation-item'
import { isNil } from 'ramda'

export function getCollectionNavigationItems(slug?: string): NavigationItem[] {
  const t = getTranslator()
  return [
    {
      id: NAVIGATION_ITEMS,
      name: t('collection.navigation.items'),
      path: isNil(slug) ? '#' : links.collection.items(slug)
    },
    {
      id: NAVIGATION_LISTINGS,
      name: t('collection.navigation.listings'),
      path: isNil(slug) ? '#' : links.collection.listings(slug)
    },
    {
      id: NAVIGATION_SWAPS,
      name: t('collection.navigation.swaps'),
      path: isNil(slug) ? '#' : links.collection.swaps(slug)
    }
  ]
}
