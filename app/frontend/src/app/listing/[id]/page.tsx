import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { setListingRoleForUser } from '@echo/ui/helpers/listing/set-listing-role-for-user'
import { ListingDetailsPage } from '@echo/ui/pages/listing/listing-details-page'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { notFound } from 'next/navigation'
import { andThen, isNil, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextAuthUserParams<NextParams<Record<'id', string>>>

async function render({ params: { id }, user }: Params) {
  // TODO Fetch user target nfts and listing's offers
  const listing = await pipe(findListingById, andThen(unlessNil(setListingRoleForUser(user))))(id)

  if (isNil(listing)) {
    notFound()
  }
  // TODO Add userTargetNfts and listing's offers
  return <ListingDetailsPage listing={listing} user={user} userTargetNfts={[]} offers={[]} />
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
