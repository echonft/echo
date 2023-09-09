import { fetcher } from '../../../../../lib/helpers/fetcher'
import { mapListingFiltersToQueryParams } from '../../../../../lib/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '../../../../../lib/helpers/request/map-query-constraints-to-query-params'
import { GetListingsResponse } from '@echo/api'
import { userListingsApiUrl } from '@echo/api/src/routing/user-listings-api-url'
import { UserListingsApiProvided } from '@echo/ui'
import { isNil, mergeLeft } from 'ramda'
import { FunctionComponent } from 'react'

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
