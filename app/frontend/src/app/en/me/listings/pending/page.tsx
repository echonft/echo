import { mapListingFiltersToQueryParams } from '@echo/api/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrl } from '@echo/api/routing/api-url'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { LISTING_FILTER_AS_TARGET } from '@echo/firestore/constants/listing/listing-filter-as'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { LISTING_STATE_CANCELLED, LISTING_STATE_FULFILLED } from '@echo/model/constants/listing-states'
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
    notState: [LISTING_STATE_FULFILLED, LISTING_STATE_CANCELLED]
  })
  const queryParams = mapQueryConstraintsToQueryParams({
    // creator.username is needed for the query to work - do not remove
    orderBy: [
      { field: 'creator.username', direction: 'asc' },
      { field: 'expiresAt', direction: 'desc' }
    ]
  })
  const response = await nextFetch.get<ListingsResponse>(apiUrl.user.listings(session.user.username), {
    params: mergeLeft(queryParams, filterParams)
  })
  assertNextFetchResponse(response)
  return <ProfileListingsReceivedApiProvided listings={response.data.listings} user={session.user} />
}

export default ProfileListingsReceivedPage
