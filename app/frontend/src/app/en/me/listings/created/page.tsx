import { authOptions } from '@constants/auth-options'
import { GetListingsResponse } from '@echo/api'
import { userListingsApiUrl } from '@echo/api/src/routing/user-listings-api-url'
import { ProfileListingsCreatedApiProvided } from '@echo/ui/src/components/profile/api-provided/profile-listings-created-api-provided'
import { fetcher } from '@helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

const ProfileListingsCreatedPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)

  if (isNil(session) || isNil(session.user)) {
    // TODO redirect to login (modal I guess)
    notFound()
  }

  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: { field: 'expiresAt' }
  })
  const { data, error } = await fetcher(userListingsApiUrl(session.user.username))
    .revalidate(3600)
    .query(queryParams)
    .fetch<GetListingsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <ProfileListingsCreatedApiProvided responses={data.listings} />
}

export default ProfileListingsCreatedPage
