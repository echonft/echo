import { authOptions } from '@constants/auth-options'
import { userNftsApiUrl } from '@echo/api/routing/user-nfts-api-url'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { UserNftsApiProvided } from '@echo/ui/components/user/api-provided/user-nfts-api-provided'
import { fetcher } from '@helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserNftsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  const session = await getServerSession(authOptions)
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'tokenId' }]
  })
  const { data, error } = await fetcher(userNftsApiUrl(username))
    .revalidate(3600)
    .query(queryParams)
    .fetch<NftsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <UserNftsApiProvided username={username} nfts={data.nfts} user={session?.user} />
}

export default UserNftsPage
