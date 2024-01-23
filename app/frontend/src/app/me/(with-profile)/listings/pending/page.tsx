import { linkProvider } from '@echo/api/services/routing/link-provider'
import { LISTING_FILTER_AS_TARGET } from '@echo/firestore/constants/listing/listing-filter-as'
import { getListingsForUser } from '@echo/firestore/crud/listing/get-listings-for-user'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/auth/redirect-if-not-logged-in'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { ProfileListingsReceivedApiProvided } from '@echo/ui/components/profile/api-provided/profile-listings-received-api-provided'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render({ user }: NextUserParams) {
  redirectIfNotLoggedIn(user, linkProvider.profile.listingsReceived.getUrl())
  const listings = await getListingsForUser(
    user.username,
    {
      as: LISTING_FILTER_AS_TARGET,
      notState: READ_ONLY_LISTING_STATES
    },
    {
      // creator.username is needed for the query to work - do not remove
      orderBy: [
        { field: 'creator.username', direction: 'asc' },
        { field: 'expiresAt', direction: 'desc' }
      ]
    }
  )
  return <ProfileListingsReceivedApiProvided listings={listings} />
}

export default pipe(withLocale<NextUserParams, Promise<ReactElement>>, withUser)(render)
