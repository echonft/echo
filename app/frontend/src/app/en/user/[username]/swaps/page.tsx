import { fetcher } from '../../../../../lib/helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '../../../../../lib/helpers/request/map-query-constraints-to-query-params'
import { GetOffersResponse } from '@echo/api'
import { userSwapsApiUrl } from '@echo/api/src/routing/user-swaps-api-url'
import { UserSwapsApiProvided } from '@echo/ui/src/components/user/api-provided/user-swaps-api-provided'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

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
