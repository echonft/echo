import { userNftsApiUrl } from '@echo/api/routing/user-nfts-api-url'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { fetcher } from '@echo/frontend/lib/helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { UserNftsApiProvided } from '@echo/ui/components/user/api-provided/user-nfts-api-provided'
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
