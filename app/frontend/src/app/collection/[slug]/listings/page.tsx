import { getPendingListingsForCollection } from '@echo/firestore/crud/listing/get-pending-listings-for-collection'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { CollectionListingsApiProvided } from '@echo/ui/components/collection/api-provided/collection-listings-api-provided'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<Record<'slug', string>>>

async function render({ params: { slug }, user }: Params) {
  const listings = await getPendingListingsForCollection(slug)
  return <CollectionListingsApiProvided collectionSlug={slug} listings={listings} user={user} />
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
