import { linkProvider } from '@echo/api/services/routing/link-provider'
import { LISTING_FILTER_AS_ITEM } from '@echo/firestore/constants/listing/listing-filter-as'
import { getListingsForUser } from '@echo/firestore/crud/listing/get-listings-for-user'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/auth/redirect-if-not-logged-in'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { ProfileListingsCreatedApiProvided } from '@echo/ui/components/profile/api-provided/profile-listings-created-api-provided'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render({ user }: NextUserParams) {
  redirectIfNotLoggedIn(user, linkProvider.profile.listingsCreated.getUrl())
  const listings = await getListingsForUser(
    user.username,
    { as: LISTING_FILTER_AS_ITEM },
    {
      orderBy: [{ field: 'expiresAt', direction: 'desc' }]
    }
  )
  return <ProfileListingsCreatedApiProvided listings={listings} />
}

export default pipe(withLocale<NextUserParams, Promise<ReactElement>>, withUser)(render)
