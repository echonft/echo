import { authOptions } from '@constants/auth-options'
import { GetOffersResponse } from '@echo/api'
import { userSwapsApiUrl } from '@echo/api/src/routing/user-swaps-api-url'
import { ProfileSwapsApiProvided } from '@echo/ui/src/components/profile/api-provided/profile-swaps-api-provided'
import { fetcher } from '@helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

const ProfileSwapsPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)

  if (isNil(session) || isNil(session.user)) {
    // TODO redirect to login (modal I guess)
    notFound()
  }

  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: { field: 'expiresAt' }
  })
  const { data, error } = await fetcher(userSwapsApiUrl(session.user.username))
    .revalidate(3600)
    .query(queryParams)
    .fetch<GetOffersResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <ProfileSwapsApiProvided userId={session.user.id} responses={data.offers} />
}

export default ProfileSwapsPage
