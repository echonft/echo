import { userListingsApiUrl } from '@echo/api/routing/user-listings-api-url'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { LISTING_FILTER_AS_TARGET } from '@echo/firestore/constants/listing/listing-filter-as'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { mapListingFiltersToQueryParams } from '@echo/frontend/lib/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { assertFetchResult } from '@echo/frontend/lib/services/fetcher/assert-fetch-result'
import { fetcher } from '@echo/frontend/lib/services/fetcher/fetcher'
import { ProfileListingsReceivedApiProvided } from '@echo/ui/components/profile/api-provided/profile-listings-received-api-provided'
import { links } from '@echo/ui/constants/links'
import { getServerSession } from 'next-auth/next'
import { mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileListingsReceivedPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.listingsReceived)
  const filterParams = mapListingFiltersToQueryParams({
    as: LISTING_FILTER_AS_TARGET,
    notState: ['FULFILLED', 'CANCELLED']
  })
  const queryParams = mapQueryConstraintsToQueryParams({
    // creator.username is needed for the query to work - do not remove
    orderBy: [
      { field: 'creator.username', direction: 'asc' },
      { field: 'expiresAt', direction: 'desc' }
    ]
  })
  const result = await fetcher(userListingsApiUrl(session.user.username))
    .query(mergeLeft(queryParams, filterParams))
    .fetch<ListingsResponse>()
  assertFetchResult(result)
  return <ProfileListingsReceivedApiProvided listings={result.data.listings} user={session.user} />
}

export default ProfileListingsReceivedPage
