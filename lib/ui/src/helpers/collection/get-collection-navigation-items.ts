import { links } from '../../constants/links'
import { getTranslator } from '../../messages/get-translator'
import { NavigationItem } from '../../types/navigation-item'
import { isNil } from 'ramda'

export function getCollectionNavigationItems(slug?: string): NavigationItem[] {
  const t = getTranslator()
  return [
    {
      id: 'items',
      name: t('navigation.items'),
      path: isNil(slug) ? '#' : links.collection.items(slug)
    },
    {
      id: 'listings',
      name: t('navigation.listings'),
      path: isNil(slug) ? '#' : links.collection.listings(slug)
    },
    {
      id: 'swaps',
      name: t('navigation.swaps'),
      path: isNil(slug) ? '#' : links.collection.swaps(slug)
    }
  ]
}
