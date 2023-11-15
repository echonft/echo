import { links } from '@echo/ui/constants/links'
import {
  NAVIGATION_ITEMS,
  NAVIGATION_LISTINGS_CREATED,
  NAVIGATION_LISTINGS_RECEIVED,
  NAVIGATION_OFFERS_CREATED,
  NAVIGATION_OFFERS_RECEIVED,
  NAVIGATION_SWAPS
} from '@echo/ui/constants/navigation-item'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { type NavigationItem } from '@echo/ui/types/navigation-item'

export function getProfileNavigationItems(disableLinks?: boolean): NavigationItem[] {
  const t = getTranslator()
  return [
    {
      id: NAVIGATION_ITEMS,
      name: t('profile.navigation.items'),
      path: disableLinks ? '#' : links.profile.items
    },
    {
      id: NAVIGATION_OFFERS_CREATED,
      name: t('profile.navigation.offersCreated'),
      path: disableLinks ? '#' : links.profile.offersCreated
    },
    {
      id: NAVIGATION_OFFERS_RECEIVED,
      name: t('profile.navigation.offersReceived'),
      path: disableLinks ? '#' : links.profile.offersReceived
    },
    {
      id: NAVIGATION_LISTINGS_CREATED,
      name: t('profile.navigation.listingsCreated'),
      path: disableLinks ? '#' : links.profile.listingsCreated
    },
    {
      id: NAVIGATION_LISTINGS_RECEIVED,
      name: t('profile.navigation.listingsReceived'),
      path: disableLinks ? '#' : links.profile.listingsReceived
    },
    {
      id: NAVIGATION_SWAPS,
      name: t('profile.navigation.swaps'),
      path: disableLinks ? '#' : links.profile.swaps
    }
  ]
}
