import { mapListingFiltersToQueryParams } from '@echo/api/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { LISTING_FILTER_AS_ITEM } from '@echo/firestore/constants/listing/listing-filter-as'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { ProfileListingsCreatedApiProvided } from '@echo/ui/components/profile/api-provided/profile-listings-created-api-provided'
import { getServerSession } from 'next-auth/next'
import { mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileListingsCreatedPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, linkProvider.profile.listingsCreated.get())
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'desc' }]
  })
  const filtersQueryParam = mapListingFiltersToQueryParams({ as: LISTING_FILTER_AS_ITEM, includeExpired: true })
  const response = await nextFetch.get<ListingsResponse>(
    apiUrlProvider.user.listings.getUrl({ username: session.user.username }),
    {
      params: mergeLeft(constraintsQueryParams, filtersQueryParam)
    }
  )
  assertNextFetchResponse(response)
  return <ProfileListingsCreatedApiProvided listings={response.data.listings} user={session.user} />
}

export default ProfileListingsCreatedPage
