import { mapOfferFiltersToQueryParams } from '@echo/api/helpers/request/map-offer-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { OFFER_FILTER_AS_SENDER } from '@echo/firestore/constants/offer/offer-filter-as'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import { ProfileOffersCreatedApiProvided } from '@echo/ui/components/profile/api-provided/profile-offers-created-api-provided'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { assoc, map, mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileOffersCreatedPage: FunctionComponent = async () => {
  const user = await getAuthUser()
  redirectIfNotLoggedIn(user, linkProvider.profile.offersCreated.getUrl())
  const filterParams = mapOfferFiltersToQueryParams({
    as: OFFER_FILTER_AS_SENDER,
    includeExpired: true
  })
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'createdAt', direction: 'desc' }]
  })
  const response = await nextFetch.get<OffersResponse>(apiUrlProvider.profile.offers.getUrl(), {
    bearerToken: user.sessionToken,
    params: mergeLeft(filterParams, queryParams)
  })
  assertNextFetchResponse(response)
  return (
    <ProfileOffersCreatedApiProvided
      offers={map(assoc('role', OFFER_ROLE_SENDER), response.data.offers) as OfferWithRole[]}
      user={user}
    />
  )
}

export default ProfileOffersCreatedPage
