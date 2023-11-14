import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrl } from '@echo/api/routing/api-url'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { UserNftsApiProvided } from '@echo/ui/components/user/api-provided/user-nfts-api-provided'
import { getServerSession } from 'next-auth/next'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserNftsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  const session = await getServerSession(authOptions)
  const params = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'tokenId', direction: 'asc' }]
  })
  const response = await nextFetch.get<NftsResponse>(apiUrl.user.nfts(username), { params })
  assertNextFetchResponse(response)
  return <UserNftsApiProvided username={username} nfts={response.data.nfts} user={session?.user} />
}

export default UserNftsPage
