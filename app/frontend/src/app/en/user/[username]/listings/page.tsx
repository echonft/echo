import { authOptions } from '@constants/auth-options'
import { userListingsApiUrl } from '@echo/api/routing/user-listings-api-url'
import type { ListingsResponse } from '@echo/api/types/responses/listings-response'
import { UserListingsApiProvided } from '@echo/ui/components/user/api-provided/user-listings-api-provided'
import { fetcher } from '@helpers/fetcher'
import { mapListingFiltersToQueryParams } from '@helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { getServerSession } from 'next-auth/next'
import { isNil, mergeLeft } from 'ramda'
import type { FunctionComponent } from 'react'

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

  const { data, error } = await fetcher(userListingsApiUrl(username))
    .revalidate(3600)
    .query(mergeLeft(constraintsQueryParams, filtersQueryParam))
    .fetch<ListingsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <UserListingsApiProvided username={username} listings={data.listings} user={session?.user} />
}

export default UserListingsPage
