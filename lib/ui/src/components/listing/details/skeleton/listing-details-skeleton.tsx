import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ListingDetailsItemsContainerSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-items-container-skeleton'
import { ListingDetailsTargetsContainerSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-targets-container-skeleton'
import { ListingOfferUserDetailsSkeleton } from '@echo/ui/components/user/listing-offer/skeleton/listing-offer-user-details-skeleton'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ListingDetailsSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-col', 'gap-20', 'p-4')}>
    <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'pb-5')}>
      <ListingOfferUserDetailsSkeleton />
    </div>
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('pb-16')}>
        <ListingDetailsItemsContainerSkeleton />
      </div>
      <ItemsSeparator />
      <div className={clsx('flex', 'justify-end')}>
        <ListingDetailsTargetsContainerSkeleton />
      </div>
    </div>
  </div>
)
