import userNftsApiUrl from '@echo/api/routing/user-nfts-api-url'
import { GetNftsResponse } from '@echo/api/types'
import { UserNftsApiProvided } from '@echo/ui/src/components/user/api-provided/user-nfts-api-provided'
import { fetcher } from '@helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

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
