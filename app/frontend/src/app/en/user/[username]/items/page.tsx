import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { UserNftsApiProvided } from '@echo/ui/components/user/api-provided/user-nfts-api-provided'
import { logger } from '@echo/utils/services/logger'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserNftsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  const session = await getServerSession(authOptions)
  if (session?.user?.username === username) {
    redirect(linkProvider.profile.items.get())
  }
  const params = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'tokenId', direction: 'asc' }]
  })
  logger.debug(`path ${apiUrlProvider.user.nfts.getUrl({ username })}`)
  const response = await nextFetch.get<NftsResponse>(apiUrlProvider.user.nfts.getUrl({ username }), { params })
  assertNextFetchResponse(response)
  return <UserNftsApiProvided username={username} nfts={response.data.nfts} user={session?.user} />
}

export default UserNftsPage
