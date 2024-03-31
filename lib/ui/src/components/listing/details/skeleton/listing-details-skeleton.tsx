import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ListingDetailsItemsContainerLayout } from '@echo/ui/components/listing/details/layout/listing-details-items-container-layout'
import { ListingDetailsItemsLayout } from '@echo/ui/components/listing/details/layout/listing-details-items-layout'
import { ListingDetailsLayout } from '@echo/ui/components/listing/details/layout/listing-details-layout'
import { ListingDetailsTargetsContainerLayout } from '@echo/ui/components/listing/details/layout/listing-details-targets-container-layout'
import { ListingDetailsUserStateLayout } from '@echo/ui/components/listing/details/layout/listing-details-user-state-layout'
import { ListingDetailsItemsContainerSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-items-container-skeleton'
import { ListingDetailsTargetsContainerSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-targets-container-skeleton'
import { UserDetailsSkeleton } from '@echo/ui/components/user/details/skeleton/user-details-skeleton'
import { type FunctionComponent } from 'react'

export const ListingDetailsSkeleton: FunctionComponent = () => (
  <ListingDetailsLayout>
    <ListingDetailsUserStateLayout role={undefined}>
      <UserDetailsSkeleton />
    </ListingDetailsUserStateLayout>
    <ListingDetailsItemsLayout>
      <ListingDetailsItemsContainerLayout>
        <ListingDetailsItemsContainerSkeleton />
      </ListingDetailsItemsContainerLayout>
      <ItemsSeparator />
      <ListingDetailsTargetsContainerLayout>
        <ListingDetailsTargetsContainerSkeleton />
      </ListingDetailsTargetsContainerLayout>
    </ListingDetailsItemsLayout>
  </ListingDetailsLayout>
)
