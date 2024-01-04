import { linkProvider } from '@echo/api/services/routing/link-provider'
import { NAVIGATION_ITEMS, NAVIGATION_LISTINGS, NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { messages } from '@echo/ui/messages/en'
import { type NavigationItem } from '@echo/ui/types/navigation-item'
import { createTranslator } from 'next-intl'
import { isNil } from 'ramda'

export function getCollectionNavigationItems(slug?: string): NavigationItem[] {
  const t = createTranslator({ locale: 'en', messages })
  return [
    {
      id: NAVIGATION_ITEMS,
      name: t('collection.navigation.items'),
      path: isNil(slug) ? '#' : linkProvider.collection.items.get({ slug })
    },
    {
      id: NAVIGATION_LISTINGS,
      name: t('collection.navigation.listings'),
      path: isNil(slug) ? '#' : linkProvider.collection.listings.get({ slug })
    },
    {
      id: NAVIGATION_SWAPS,
      name: t('collection.navigation.swaps'),
      path: isNil(slug) ? '#' : linkProvider.collection.swaps.get({ slug })
    }
  ]
}
