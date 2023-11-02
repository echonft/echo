import { userListingsApiUrl } from '@echo/api/routing/user-listings-api-url'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { mapListingFiltersToQueryParams } from '@echo/frontend/lib/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { assertFetchResult } from '@echo/frontend/lib/services/fetcher/assert-fetch-result'
import { fetcher } from '@echo/frontend/lib/services/fetcher/fetcher'
import { UserListingsApiProvided } from '@echo/ui/components/user/api-provided/user-listings-api-provided'
import { getServerSession } from 'next-auth/next'
import { mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserListingsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  const session = await getServerSession(authOptions)
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt' }]
  })
  const filtersQueryParam = mapListingFiltersToQueryParams({ states: ['OPEN'] })
  const result = await fetcher(userListingsApiUrl(username))
    .query(mergeLeft(constraintsQueryParams, filtersQueryParam))
    .fetch<ListingsResponse>()
  assertFetchResult(result)
  return <UserListingsApiProvided username={username} listings={result.data.listings} user={session?.user} />
}

export default UserListingsPage
