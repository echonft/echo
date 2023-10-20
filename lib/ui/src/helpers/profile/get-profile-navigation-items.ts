import { links } from '@echo/ui/constants/links'
import {
  NavigationItems,
  NavigationListingsCreated,
  NavigationListingsReceived,
  NavigationOffersCreated,
  NavigationOffersReceived,
  NavigationSwaps
} from '@echo/ui/constants/navigation-item'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { type NavigationItem } from '@echo/ui/types/navigation-item'

export function getProfileNavigationItems(disableLinks?: boolean): NavigationItem[] {
  const t = getTranslator()
  return [
    {
      id: NavigationItems,
      name: t('profile.navigation.items'),
      path: disableLinks ? '#' : links.profile.items
    },
    {
      id: NavigationOffersCreated,
      name: t('profile.navigation.offersCreated'),
      path: disableLinks ? '#' : links.profile.offersCreated
    },
    {
      id: NavigationOffersReceived,
      name: t('profile.navigation.offersReceived'),
      path: disableLinks ? '#' : links.profile.offersReceived
    },
    {
      id: NavigationListingsCreated,
      name: t('profile.navigation.listingsCreated'),
      path: disableLinks ? '#' : links.profile.listingsCreated
    },
    {
      id: NavigationListingsReceived,
      name: t('profile.navigation.listingsReceived'),
      path: disableLinks ? '#' : links.profile.listingsReceived
    },
    {
      id: NavigationSwaps,
      name: t('profile.navigation.swaps'),
      path: disableLinks ? '#' : links.profile.swaps
    }
  ]
}
