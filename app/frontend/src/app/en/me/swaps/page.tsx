import { authOptions } from '@constants/auth-options'
import { userSwapsApiUrl } from '@echo/api/routing/user-swaps-api-url'
import type { GetOffersResponse } from '@echo/api/types/responses/get-offers-response'
import { ProfileSwapsApiProvided } from '@echo/ui/components/profile/api-provided/profile-swaps-api-provided'
import { links } from '@echo/ui/constants/links'
import { OfferRoleReceiver, OfferRoleSender } from '@echo/ui/constants/offer-role'
import { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { redirectIfNotLoggedIn } from '@helpers/auth/redirect-if-not-logged-in'
import { fetcher } from '@helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { getServerSession } from 'next-auth/next'
import { assoc, ifElse, isNil, map, pathEq } from 'ramda'
import type { FunctionComponent } from 'react'

const ProfileSwapsPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.swaps)
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt' }]
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

  return (
    <ProfileSwapsApiProvided
      offers={
        map(
          ifElse(
            pathEq(session.user.id, ['sender', 'id']),
            assoc('role', OfferRoleReceiver),
            assoc('role', OfferRoleSender)
          ),
          data.offers
        ) as OfferWithRole[]
      }
      user={session.user}
    />
  )
}

export default ProfileSwapsPage
