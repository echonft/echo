import { userListingsApiUrl } from '@echo/api/routing/user-listings-api-url'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { ListingFilterAsItem } from '@echo/firestore/constants/listing-filter-as'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { mapListingFiltersToQueryParams } from '@echo/frontend/lib/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { assertFetchResult } from '@echo/frontend/lib/services/fetcher/assert-fetch-result'
import { fetcher } from '@echo/frontend/lib/services/fetcher/fetcher'
import { ProfileListingsCreatedApiProvided } from '@echo/ui/components/profile/api-provided/profile-listings-created-api-provided'
import { links } from '@echo/ui/constants/links'
import { getServerSession } from 'next-auth/next'
import { mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileListingsCreatedPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.listingsCreated)
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'desc' }]
  })
  const filtersQueryParam = mapListingFiltersToQueryParams({ as: ListingFilterAsItem, includeExpired: true })
  const result = await fetcher(userListingsApiUrl(session.user.username))
    .query(mergeLeft(constraintsQueryParams, filtersQueryParam))
    .fetch<ListingsResponse>()
  assertFetchResult(result)
  return <ProfileListingsCreatedApiProvided listings={result.data.listings} user={session.user} />
}

export default ProfileListingsCreatedPage
