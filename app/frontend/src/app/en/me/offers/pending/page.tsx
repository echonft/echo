import { profileOffersApiUrl } from '@echo/api/routing/profile-offers-api-url'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { OfferFilterAsReceiver } from '@echo/firestore/constants/offer-filter-as'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { fetcher } from '@echo/frontend/lib/helpers/fetcher'
import { mapOfferFiltersToQueryParams } from '@echo/frontend/lib/helpers/request/map-offer-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { ProfileOffersReceivedApiProvided } from '@echo/ui/components/profile/api-provided/profile-offers-received-api-provided'
import { links } from '@echo/ui/constants/links'
import { OfferRoleReceiver } from '@echo/ui/constants/offer-role'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { getServerSession } from 'next-auth/next'
import { assoc, isNil, map, mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileOffersReceivedPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.offersReceived)
  const filterParams = mapOfferFiltersToQueryParams({
    as: OfferFilterAsReceiver,
    states: ['OPEN', 'ACCEPTED']
  })
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'desc' }]
  })
  const { data, error } = await fetcher(profileOffersApiUrl())
    .revalidate(3600)
    .query(mergeLeft(filterParams, queryParams))
    .bearerToken(session.user.sessionToken)
    .fetch<OffersResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return (
    <ProfileOffersReceivedApiProvided
      offers={map(assoc('role', OfferRoleReceiver), data.offers) as OfferWithRole[]}
      user={session.user}
    />
  )
}

export default ProfileOffersReceivedPage
