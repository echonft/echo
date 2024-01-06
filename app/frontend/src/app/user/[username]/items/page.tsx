import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { getCookieHeader } from '@echo/frontend/lib/helpers/auth/get-cookie-header'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { UserNftsApiProvided } from '@echo/ui/components/user/api-provided/user-nfts-api-provided'
import { redirect } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserNftsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  if (user?.username === username) {
    redirect(linkProvider.profile.items.get())
  }
  const params = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'tokenId', direction: 'asc' }]
  })
  const response = await nextFetch.get<NftsResponse>(apiUrlProvider.user.nfts.getUrl({ username }), {
    cookie: getCookieHeader(),
    params
  })
  assertNextFetchResponse(response)
  return <UserNftsApiProvided username={username} nfts={response.data.nfts} user={user} />
}

export default UserNftsPage
