import { links } from '../../constants/links'
import { getTranslator } from '../../messages/get-translator'
import { NavigationItem } from '../../types/navigation-item'
import { isNil } from 'ramda'

export function getUserNavigationItems(username?: string): NavigationItem[] {
  const t = getTranslator()
  return [
    {
      id: 'items',
      name: t('navigation.items'),
      path: isNil(username) ? '#' : links.user.items(username)
    },
    {
      id: 'listings',
      name: t('navigation.listings'),
      path: isNil(username) ? '#' : links.user.listings(username)
    },
    {
      id: 'swaps',
      name: t('navigation.swaps'),
      path: isNil(username) ? '#' : links.user.swaps(username)
    }
  ]
}
