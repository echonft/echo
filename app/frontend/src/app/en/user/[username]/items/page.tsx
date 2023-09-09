import { fetcher } from '../../../../../lib/helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '../../../../../lib/helpers/request/map-query-constraints-to-query-params'
import { GetNftsResponse, userNftsApiUrl } from '@echo/api'
import { UserNftsApiProvided } from '@echo/ui'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserNftsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: { field: 'tokenId' }
  })
  const { data, error } = await fetcher(userNftsApiUrl(username))
    .revalidate(3600)
    .query(queryParams)
    .fetch<GetNftsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <UserNftsApiProvided username={username} responses={data.nfts} />
}

export default UserNftsPage
