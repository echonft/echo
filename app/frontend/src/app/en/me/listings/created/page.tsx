import { authOptions } from '@constants/auth-options'
import { userListingsApiUrl } from '@echo/api/routing/user-listings-api-url'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { ProfileListingsCreatedApiProvided } from '@echo/ui/components/profile/api-provided/profile-listings-created-api-provided'
import { links } from '@echo/ui/constants/links'
import { redirectIfNotLoggedIn } from '@helpers/auth/redirect-if-not-logged-in'
import { fetcher } from '@helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileListingsCreatedPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.listingsCreated)
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt' }]
  })
  const { data, error } = await fetcher(userListingsApiUrl(session.user.username))
    .revalidate(3600)
    .query(queryParams)
    .fetch<ListingsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <ProfileListingsCreatedApiProvided listings={data.listings} user={session.user} />
}

export default ProfileListingsCreatedPage
