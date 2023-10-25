import { userNftsApiUrl } from '@echo/api/routing/user-nfts-api-url'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { fetcher } from '@echo/frontend/lib/helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { ProfileNftsApiProvided } from '@echo/ui/components/profile/api-provided/profile-nfts-api-provided'
import { links } from '@echo/ui/constants/links'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileNftsPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.items)
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'tokenId' }]
  })
  const { data, error } = await fetcher(userNftsApiUrl(session.user.username))
    .revalidate(3600)
    .query(queryParams)
    .fetch<NftsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <ProfileNftsApiProvided nfts={data.nfts} user={session.user} />
}

export default ProfileNftsPage
