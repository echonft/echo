import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { OFFER_ROLE_RECEIVER, OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import { ProfileSwapsApiProvided } from '@echo/ui/components/profile/api-provided/profile-swaps-api-provided'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { getServerSession } from 'next-auth/next'
import { assoc, ifElse, map, pathEq } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileSwapsPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, linkProvider.profile.swaps.get())
  const params = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'desc' }]
  })
  const response = await nextFetch.get<OffersResponse>(
    apiUrlProvider.user.swaps.getUrl({ username: session.user.username }),
    {
      params
    }
  )
  assertNextFetchResponse(response)
  return (
    <ProfileSwapsApiProvided
      offers={
        map(
          ifElse(
            pathEq(session.user.id, ['sender', 'id']),
            assoc('role', OFFER_ROLE_RECEIVER),
            assoc('role', OFFER_ROLE_SENDER)
          ),
          response.data.offers
        ) as OfferWithRole[]
      }
      user={session.user}
    />
  )
}

export default ProfileSwapsPage
