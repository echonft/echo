import { userListingsApiUrl } from '@echo/api/routing/user-listings-api-url'
import type { GetListingsResponse } from '@echo/api/types/responses/get-listings-response'
import { UserListingsApiProvided } from '@echo/ui/components/user/api-provided/user-listings-api-provided'
import { fetcher } from '@helpers/fetcher'
import { mapListingFiltersToQueryParams } from '@helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { isNil, mergeLeft } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserListingsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: { field: 'expiresAt' }
  })
  const filtersQueryParam = mapListingFiltersToQueryParams({ states: ['OPEN'] })

  const { data, error } = await fetcher(userListingsApiUrl(username))
    .revalidate(3600)
    .query(mergeLeft(constraintsQueryParams, filtersQueryParam))
    .fetch<GetListingsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <UserListingsApiProvided username={username} responses={data.listings} />
}

export default UserListingsPage
