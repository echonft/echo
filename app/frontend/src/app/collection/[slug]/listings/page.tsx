import { getPendingListingsForCollection } from '@echo/firestore/crud/listing/get-pending-listings-for-collection'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setListingRole } from '@echo/frontend/lib/helpers/listing/set-listing-role'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { WithSlug } from '@echo/model/types/with-slug'
import { NAVIGATION_LISTINGS } from '@echo/ui/constants/navigation-item'
import { CollectionListings } from '@echo/ui/pages/collection/listings/collection-listings'
import { CollectionNavigationLayout } from '@echo/ui/pages/collection/navigation/collection-navigation-layout'
import { andThen, pipe } from 'ramda'

async function render({ params: { slug }, user }: PropsWithUser<NextParams<WithSlug>>) {
  const listings = await pipe(getPendingListingsForCollection, andThen(setListingRole(user)))(slug)
  return (
    <CollectionNavigationLayout slug={slug} activeNavigationItem={NAVIGATION_LISTINGS}>
      <CollectionListings listings={listings} />
    </CollectionNavigationLayout>
  )
}

export default withUser(render)
