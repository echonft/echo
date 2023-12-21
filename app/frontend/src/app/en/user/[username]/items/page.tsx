import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { UserNftsApiProvided } from '@echo/ui/components/user/api-provided/user-nfts-api-provided'
import { logger } from '@echo/utils/services/logger'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserNftsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  const user = await getAuthUser()
  if (user?.username === username) {
    redirect(linkProvider.profile.items.get())
  }
  const params = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'tokenId', direction: 'asc' }]
  })
  logger.debug(`path ${apiUrlProvider.user.nfts.getUrl({ username })}`)
  const response = await nextFetch.get<NftsResponse>(apiUrlProvider.user.nfts.getUrl({ username }), { params })
  assertNextFetchResponse(response)
  return <UserNftsApiProvided username={username} nfts={response.data.nfts} user={user} />
}

export default UserNftsPage
