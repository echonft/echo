import { getListingsForCollection } from '@echo/firestore/crud/listing/get-listings-for-collection'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { CollectionListingsApiProvided } from '@echo/ui/components/collection/api-provided/collection-listings-api-provided'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<Record<'slug', string>>>

async function render({ params: { slug }, user }: Params) {
  const listings = await getListingsForCollection(
    slug,
    { notState: READ_ONLY_LISTING_STATES },
    {
      orderBy: [{ field: 'expiresAt', direction: 'asc' }]
    }
  )
  // TODO instead of passing the user here, map the listings to ListingWithRole
  return <CollectionListingsApiProvided collectionSlug={slug} listings={listings} user={user} />
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
