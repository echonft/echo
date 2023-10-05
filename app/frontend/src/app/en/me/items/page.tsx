import { authOptions } from '@constants/auth-options'
import { userNftsApiUrl } from '@echo/api/routing/user-nfts-api-url'
import { GetNftsResponse } from '@echo/api/types/responses/get-nfts-response'
import { ProfileNftsApiProvided } from '@echo/ui/components/profile/api-provided/profile-nfts-api-provided'
import { links } from '@echo/ui/constants/links'
import { redirectIfNotLoggedIn } from '@helpers/auth/redirect-if-not-logged-in'
import { fetcher } from '@helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

const ProfileNftsPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.items)
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'tokenId' }]
  })
  const { data, error } = await fetcher(userNftsApiUrl(session.user.username))
    .revalidate(3600)
    .query(queryParams)
    .fetch<GetNftsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <ProfileNftsApiProvided responses={data.nfts} user={session.user} />
}

export default ProfileNftsPage
