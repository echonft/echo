import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { OFFER_FILTER_AS_RECEIVER } from '@echo/firestore/constants/offer/offer-filter-as'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { getCookieHeader } from '@echo/frontend/lib/helpers/auth/get-cookie-header'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { OFFER_ROLE_RECEIVER } from '@echo/model/constants/offer-role'
import { OFFER_STATE_ACCEPTED, OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { ProfileOffersReceivedApiProvided } from '@echo/ui/components/profile/api-provided/profile-offers-received-api-provided'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { unstable_setRequestLocale } from 'next-intl/server'
import { assoc, map, mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileOffersReceivedPage: FunctionComponent = async () => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  redirectIfNotLoggedIn(user, linkProvider.profile.offersReceived.getUrl())
  const response = await nextFetch.get<OffersResponse>(apiUrlProvider.profile.offers.getUrl(), {
    cookie: getCookieHeader(),
    params: mergeLeft(
      {
        as: OFFER_FILTER_AS_RECEIVER,
        state: [OFFER_STATE_OPEN, OFFER_STATE_ACCEPTED]
      },
      mapQueryConstraintsToQueryParams({
        orderBy: [{ field: 'expiresAt', direction: 'desc' }]
      })
    )
  })
  assertNextFetchResponse(response)
  return (
    <ProfileOffersReceivedApiProvided
      offers={map(assoc('role', OFFER_ROLE_RECEIVER), response.data.offers) as OfferWithRole[]}
    />
  )
}

export default ProfileOffersReceivedPage
