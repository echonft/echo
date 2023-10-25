import { userListingsApiUrl } from '@echo/api/routing/user-listings-api-url'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { ListingFilterAsTarget } from '@echo/firestore/constants/listing-filter-as'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { fetcher } from '@echo/frontend/lib/helpers/fetcher'
import { mapListingFiltersToQueryParams } from '@echo/frontend/lib/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { ProfileListingsReceivedApiProvided } from '@echo/ui/components/profile/api-provided/profile-listings-received-api-provided'
import { links } from '@echo/ui/constants/links'
import { getServerSession } from 'next-auth/next'
import { isNil, mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileListingsReceivedPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.listingsReceived)
  const filterParams = mapListingFiltersToQueryParams({
    as: ListingFilterAsTarget,
    states: ['OPEN']
  })
  const queryParams = mapQueryConstraintsToQueryParams({
    // creator.username is needed for the query to work - do not remove
    orderBy: [{ field: 'creator.username' }, { field: 'expiresAt', direction: 'desc' }]
  })
  const { data, error } = await fetcher(userListingsApiUrl(session.user.username))
    .revalidate(3600)
    .query(mergeLeft(queryParams, filterParams))
    .fetch<ListingsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <ProfileListingsReceivedApiProvided listings={data.listings} user={session.user} />
}

export default ProfileListingsReceivedPage
