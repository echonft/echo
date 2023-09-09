import { NavigationSwaps } from '../../../../constants/navigation-item'
import { OfferCollectionRowSkeleton } from '../../../offer/row/skeleton/offer-collection-row-skeleton'
import { CollectionNavigationLayoutSkeleton } from '../../layout/skeleton/collection-navigation-layout-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const CollectionSwapsSkeleton: FunctionComponent = () => {
  return (
    <CollectionNavigationLayoutSkeleton activeNavigationItem={NavigationSwaps}>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'w-full', 'gap-12')}>
        <OfferCollectionRowSkeleton />
      </div>
    </CollectionNavigationLayoutSkeleton>
  )
}
