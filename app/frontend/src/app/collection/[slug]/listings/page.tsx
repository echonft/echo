import { getPendingListingsForCollection } from '@echo/firestore/crud/listing/get-pending-listings-for-collection'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setListingRole } from '@echo/frontend/lib/helpers/listing/set-listing-role'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { NAVIGATION_LISTINGS } from '@echo/ui/constants/navigation-item'
import { CollectionListings } from '@echo/ui/pages/collection/listings/collection-listings'
import { CollectionNavigationLayout } from '@echo/ui/pages/collection/navigation/collection-navigation-layout'
import { andThen, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<Record<'slug', string>>>

async function render({ params: { slug }, user }: Params) {
  const listings = await pipe(getPendingListingsForCollection, andThen(setListingRole(user)))(slug)
  return (
    <CollectionNavigationLayout slug={slug} activeNavigationItem={NAVIGATION_LISTINGS}>
      <CollectionListings listings={listings} />
    </CollectionNavigationLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
