import { apiUrl } from '@echo/api/routing/api-url'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { ProfileNftsApiProvided } from '@echo/ui/components/profile/api-provided/profile-nfts-api-provided'
import { links } from '@echo/ui/constants/links'
import { getServerSession } from 'next-auth/next'
import { type FunctionComponent } from 'react'

const ProfileNftsPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.items)
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'tokenId', direction: 'asc' }]
  })
  const response = await nextFetch.get<NftsResponse>(apiUrl.user.nfts(session.user.username), {
    params: queryParams
  })
  assertNextFetchResponse(response)
  return <ProfileNftsApiProvided nfts={response.data.nfts} user={session.user} />
}

export default ProfileNftsPage
