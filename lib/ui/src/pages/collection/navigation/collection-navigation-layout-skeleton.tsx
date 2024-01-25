import { NavigationLayoutSkeleton } from '@echo/ui/components/base/navigation/skeleton/navigation-layout-skeleton'
import { NAVIGATION_LISTINGS, NAVIGATION_NFTS, NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  activeNavigationItem: NavigationItemId
}
export const CollectionNavigationLayoutSkeleton: FunctionComponent<PropsWithChildren<Props>> = ({
  activeNavigationItem,
  children
}) => {
  const t = useTranslations('collection.navigation')
  return (
    <NavigationLayoutSkeleton
      navigationItems={[
        {
          id: NAVIGATION_NFTS,
          name: t('items')
        },
        {
          id: NAVIGATION_LISTINGS,
          name: t('listings')
        },
        {
          id: NAVIGATION_SWAPS,
          name: t('swaps')
        }
      ]}
      activeNavigationItem={activeNavigationItem}
    >
      {children}
    </NavigationLayoutSkeleton>
  )
}
