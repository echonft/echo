import { authOptions } from '@constants/auth-options'
import { userListingsApiUrl } from '@echo/api/routing/user-listings-api-url'
import type { ListingsResponse } from '@echo/api/types/responses/listings-response'
import { ListingFilterAsTarget } from '@echo/firestore/constants/listing-filter-as'
import { ProfileListingsReceivedApiProvided } from '@echo/ui/components/profile/api-provided/profile-listings-received-api-provided'
import { links } from '@echo/ui/constants/links'
import { redirectIfNotLoggedIn } from '@helpers/auth/redirect-if-not-logged-in'
import { fetcher } from '@helpers/fetcher'
import { mapListingFiltersToQueryParams } from '@helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { getServerSession } from 'next-auth/next'
import { isNil, mergeLeft } from 'ramda'
import type { FunctionComponent } from 'react'

const ProfileListingsReceivedPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.listingsReceived)
  const filterParams = mapListingFiltersToQueryParams({
    as: ListingFilterAsTarget,
    states: ['OPEN']
  })
  const queryParams = mapQueryConstraintsToQueryParams({
    // creator.username is needed for the query to work - do not remove
    orderBy: [{ field: 'creator.username' }, { field: 'expiresAt' }]
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
