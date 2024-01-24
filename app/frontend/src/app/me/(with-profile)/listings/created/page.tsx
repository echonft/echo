import { LISTING_FILTER_AS_ITEM } from '@echo/firestore/constants/listing/listing-filter-as'
import { getListingsForUser } from '@echo/firestore/crud/listing/get-listings-for-user'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import { ProfileListingsCreatedApiProvided } from '@echo/ui/components/profile/api-provided/profile-listings-created-api-provided'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render({ user }: NextAuthUserParams) {
  const listings = await getListingsForUser(
    user.username,
    { as: LISTING_FILTER_AS_ITEM },
    {
      orderBy: [{ field: 'expiresAt', direction: 'desc' }]
    }
  )
  return <ProfileListingsCreatedApiProvided listings={listings} />
}

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withUser)(render)
