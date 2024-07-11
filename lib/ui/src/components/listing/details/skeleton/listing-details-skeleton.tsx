import { CardsSkeleton } from '@echo/ui/components/base/card/skeleton/cards-skeleton'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ListingDetailsItemsAndTargetLayout } from '@echo/ui/components/listing/details/layout/listing-details-items-and-target-layout'
import { ListingDetailsItemsLayout } from '@echo/ui/components/listing/details/layout/listing-details-items-layout'
import { ListingDetailsLayout } from '@echo/ui/components/listing/details/layout/listing-details-layout'
import { ListingDetailsTargetLayout } from '@echo/ui/components/listing/details/layout/listing-details-target-layout'
import { ListingDetailsUserStateLayout } from '@echo/ui/components/listing/details/layout/listing-details-user-state-layout'
import { ListingDetailsTargetSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-target-skeleton'
import { UserDetailsSkeleton } from '@echo/ui/components/user/details/skeleton/user-details-skeleton'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { type FunctionComponent } from 'react'

export const ListingDetailsSkeleton: FunctionComponent = () => (
  <ListingDetailsLayout>
    <ListingDetailsUserStateLayout role={undefined}>
      <UserDetailsSkeleton />
    </ListingDetailsUserStateLayout>
    <ListingDetailsItemsAndTargetLayout>
      <ListingDetailsItemsLayout>
        <CardsSkeleton alignment={ALIGNMENT_CENTER} />
      </ListingDetailsItemsLayout>
      <ItemsSeparator />
      <ListingDetailsTargetLayout>
        <ListingDetailsTargetSkeleton />
      </ListingDetailsTargetLayout>
    </ListingDetailsItemsAndTargetLayout>
  </ListingDetailsLayout>
)
