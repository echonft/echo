import { authOptions } from '@constants/auth-options'
import { userListingsApiUrl } from '@echo/api/routing/user-listings-api-url'
import type { GetListingsResponse } from '@echo/api/types/responses/get-listings-response'
import { ProfileListingsCreatedApiProvided } from '@echo/ui/components/profile/api-provided/profile-listings-created-api-provided'
import { links } from '@echo/ui/constants/links'
import { redirectIfNotLoggedIn } from '@helpers/auth/redirect-if-not-logged-in'
import { fetcher } from '@helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

const ProfileListingsCreatedPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.listingsCreated)
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt' }]
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

  return <ProfileListingsCreatedApiProvided responses={data.listings} user={session.user} />
}

export default ProfileListingsCreatedPage
