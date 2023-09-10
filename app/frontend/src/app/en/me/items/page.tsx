import { authOptions } from '../../../../lib/constants/auth-options'
import { fetcher } from '../../../../lib/helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '../../../../lib/helpers/request/map-query-constraints-to-query-params'
import { GetNftsResponse, userNftsApiUrl } from '@echo/api'
import { ProfileNftsApiProvided } from '@echo/ui/src/components/profile/api-provided/profile-nfts-api-provided'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

const ProfileNftsPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)

  if (isNil(session) || isNil(session.user)) {
    // TODO redirect to login (modal I guess)
    notFound()
  }

  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: { field: 'tokenId' }
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

  return <ProfileNftsApiProvided responses={data.nfts} />
}

export default ProfileNftsPage
