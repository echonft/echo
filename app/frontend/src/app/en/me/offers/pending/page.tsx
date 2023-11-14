import { mapOfferFiltersToQueryParams } from '@echo/api/helpers/request/map-offer-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrl } from '@echo/api/routing/api-url'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { OFFER_FILTER_AS_RECEIVER } from '@echo/firestore/constants/offer/offer-filter-as'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { OfferRoleReceiver } from '@echo/model/constants/offer-role'
import { ProfileOffersReceivedApiProvided } from '@echo/ui/components/profile/api-provided/profile-offers-received-api-provided'
import { links } from '@echo/ui/constants/links'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { getServerSession } from 'next-auth/next'
import { assoc, map, mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileOffersReceivedPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.offersReceived)
  const filterParams = mapOfferFiltersToQueryParams({
    as: OFFER_FILTER_AS_RECEIVER,
    state: ['OPEN', 'ACCEPTED']
  })
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'desc' }]
  })
  const response = await nextFetch.get<OffersResponse>(apiUrl.profile.offers, {
    bearerToken: session.user.sessionToken,
    params: mergeLeft(filterParams, queryParams)
  })
  assertNextFetchResponse(response)
  return (
    <ProfileOffersReceivedApiProvided
      offers={map(assoc('role', OfferRoleReceiver), response.data.offers) as OfferWithRole[]}
      user={session.user}
    />
  )
}

export default ProfileOffersReceivedPage
