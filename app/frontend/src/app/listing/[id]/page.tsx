import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { ListingDetailsPage } from '@echo/ui/pages/listing/listing-details-page'
import { notFound } from 'next/navigation'
import { isNil, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextAuthUserParams<NextParams<Record<'id', string>>>

async function render({ params: { id }, user }: Params) {
  const listing = await findListingById(id)
  if (isNil(listing)) {
    notFound()
  }
  // TODO Add userTargetNfts to listing
  return <ListingDetailsPage listing={listing} user={user} userTargetNfts={[]} />
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
