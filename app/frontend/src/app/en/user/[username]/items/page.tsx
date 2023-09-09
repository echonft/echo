import { fetcher } from '../../../../../lib/helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '../../../../../lib/helpers/request/map-query-constraints-to-query-params'
import { ErrorStatus } from '../../../../../lib/server/constants/error-status'
import { GetNftsResponse, userNftsApiUrl } from '@echo/api'
import { UserNftsApiProvided } from '@echo/ui'
import { notFound } from 'next/navigation'
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
      if (error.status === ErrorStatus.NOT_FOUND) {
        notFound()
      }
      throw Error(error.message)
    }
    throw Error()
  }

  return <UserNftsApiProvided username={username} responses={data.nfts} />
}

export default UserNftsPage
