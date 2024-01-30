import { ExploreNavigationPillSkeleton } from '@echo/ui/components/base/navigation/explore-navigation-pill-skeleton'
import { NavigationLayoutSkeleton } from '@echo/ui/components/base/navigation/skeleton/navigation-layout-skeleton'
import {
  NAVIGATION_LISTINGS_CREATED,
  NAVIGATION_LISTINGS_RECEIVED,
  NAVIGATION_NFTS,
  NAVIGATION_OFFERS_CREATED,
  NAVIGATION_OFFERS_RECEIVED
} from '@echo/ui/constants/navigation-item'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  activeNavigationItem: NavigationItemId
}
export const ProfileNavigationLayoutSkeleton: FunctionComponent<PropsWithChildren<Props>> = ({
  activeNavigationItem,
  children
}) => {
  const t = useTranslations('profile.navigation')
  return (
    <NavigationLayoutSkeleton
      navigationItems={[
        {
          id: NAVIGATION_NFTS,
          name: t('items')
        },
        {
          id: NAVIGATION_OFFERS_CREATED,
          name: t('offersCreated')
        },
        {
          id: NAVIGATION_OFFERS_RECEIVED,
          name: t('offersReceived')
        },
        {
          id: NAVIGATION_LISTINGS_CREATED,
          name: t('listingsCreated')
        },
        {
          id: NAVIGATION_LISTINGS_RECEIVED,
          name: t('listingsReceived'),
          render: (props) => <ExploreNavigationPillSkeleton {...props} />
        }
      ]}
      activeNavigationItem={activeNavigationItem}
    >
      {children}
    </NavigationLayoutSkeleton>
  )
}
