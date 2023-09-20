import { userSwapsApiUrl } from '@echo/api/routing/user-swaps-api-url'
import type { GetOffersResponse } from '@echo/api/types/responses/get-offers-response'
import { UserSwapsApiProvided } from '@echo/ui/components/user/api-provided/user-swaps-api-provided'
import { fetcher } from '@helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserSwapsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: { field: 'expiresAt' }
  })

  const { data, error } = await fetcher(userSwapsApiUrl(username))
    .revalidate(3600)
    .query(constraintsQueryParams)
    .fetch<GetOffersResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <UserSwapsApiProvided username={username} responses={data.offers} />
}

export default UserSwapsPage
