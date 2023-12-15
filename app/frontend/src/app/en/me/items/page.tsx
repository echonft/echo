import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { ProfileNftsApiProvided } from '@echo/ui/components/profile/api-provided/profile-nfts-api-provided'
import { getServerSession } from 'next-auth/next'
import { type FunctionComponent } from 'react'

const ProfileNftsPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, linkProvider.profile.items.getUrl())
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'tokenId', direction: 'asc' }]
  })
  const response = await nextFetch.get<NftsResponse>(
    apiUrlProvider.user.nfts.getUrl({ username: session.user.username }),
    {
      params: queryParams
    }
  )
  assertNextFetchResponse(response)
  return <ProfileNftsApiProvided nfts={response.data.nfts} user={session.user} />
}

export default ProfileNftsPage
