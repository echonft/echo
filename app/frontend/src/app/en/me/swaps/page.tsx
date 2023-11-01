import { userSwapsApiUrl } from '@echo/api/routing/user-swaps-api-url'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { assertFetchResult } from '@echo/frontend/lib/services/fetcher/assert-fetch-result'
import { fetcher } from '@echo/frontend/lib/services/fetcher/fetcher'
import { OfferRoleReceiver, OfferRoleSender } from '@echo/model/constants/offer-role'
import { ProfileSwapsApiProvided } from '@echo/ui/components/profile/api-provided/profile-swaps-api-provided'
import { links } from '@echo/ui/constants/links'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { getServerSession } from 'next-auth/next'
import { assoc, ifElse, map, pathEq } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileSwapsPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.swaps)
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'desc' }]
  })
  const result = await fetcher(userSwapsApiUrl(session.user.username)).query(queryParams).fetch<OffersResponse>()
  assertFetchResult(result)
  return (
    <ProfileSwapsApiProvided
      offers={
        map(
          ifElse(
            pathEq(session.user.id, ['sender', 'id']),
            assoc('role', OfferRoleReceiver),
            assoc('role', OfferRoleSender)
          ),
          result.data.offers
        ) as OfferWithRole[]
      }
      user={session.user}
    />
  )
}

export default ProfileSwapsPage
