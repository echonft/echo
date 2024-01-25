import { linkProvider } from '@echo/api/services/routing/link-provider'
import {
  NAVIGATION_LISTINGS_CREATED,
  NAVIGATION_LISTINGS_RECEIVED,
  NAVIGATION_NFTS,
  NAVIGATION_OFFERS_CREATED,
  NAVIGATION_OFFERS_RECEIVED,
  NAVIGATION_SWAPS
} from '@echo/ui/constants/navigation-item'
import { messages } from '@echo/ui/messages/en'
import { type NavigationItem } from '@echo/ui/types/navigation-item'
import { createTranslator } from 'next-intl'

export function getProfileNavigationItems(disableLinks?: boolean): NavigationItem[] {
  const t = createTranslator({ locale: 'en', messages })
  return [
    {
      id: NAVIGATION_NFTS,
      name: t('profile.navigation.items'),
      path: disableLinks ? '#' : linkProvider.profile.items.get()
    },
    {
      id: NAVIGATION_OFFERS_CREATED,
      name: t('profile.navigation.offersCreated'),
      path: disableLinks ? '#' : linkProvider.profile.offersCreated.get()
    },
    {
      id: NAVIGATION_OFFERS_RECEIVED,
      name: t('profile.navigation.offersReceived'),
      path: disableLinks ? '#' : linkProvider.profile.offersReceived.get()
    },
    {
      id: NAVIGATION_LISTINGS_CREATED,
      name: t('profile.navigation.listingsCreated'),
      path: disableLinks ? '#' : linkProvider.profile.listingsCreated.get()
    },
    {
      id: NAVIGATION_LISTINGS_RECEIVED,
      name: t('profile.navigation.listingsReceived'),
      path: disableLinks ? '#' : linkProvider.profile.listingsReceived.get()
    },
    {
      id: NAVIGATION_SWAPS,
      name: t('profile.navigation.swaps'),
      path: disableLinks ? '#' : linkProvider.profile.swaps.get()
    }
  ]
}
