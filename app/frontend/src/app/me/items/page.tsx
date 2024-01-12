import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { getCookieHeader } from '@echo/frontend/lib/helpers/auth/get-cookie-header'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { ProfileNftsApiProvided } from '@echo/ui/components/profile/api-provided/profile-nfts-api-provided'
import { unstable_setRequestLocale } from 'next-intl/server'
import { RouteChangesProvider } from 'nextjs-router-events'
import { type FunctionComponent } from 'react'

const ProfileNftsPage: FunctionComponent = async () => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  redirectIfNotLoggedIn(user, linkProvider.profile.items.getUrl())
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'tokenId', direction: 'asc' }]
  })
  const response = await nextFetch.get<NftsResponse>(apiUrlProvider.user.nfts.getUrl({ username: user.username }), {
    cookie: getCookieHeader(),
    params: queryParams
  })
  assertNextFetchResponse(response)
  return (
    <RouteChangesProvider>
      <ProfileNftsApiProvided nfts={response.data.nfts} user={user} />
    </RouteChangesProvider>
  )
}

export default ProfileNftsPage
