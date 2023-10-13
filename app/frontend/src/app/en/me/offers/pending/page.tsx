import { authOptions } from '@constants/auth-options'
import { profileOffersApiUrl } from '@echo/api/routing/profile-offers-api-url'
import type { GetOffersResponse } from '@echo/api/types/responses/get-offers-response'
import { OfferFilterAsReceiver } from '@echo/firestore/constants/offer-filter-as'
import { ProfileOffersReceivedApiProvided } from '@echo/ui/components/profile/api-provided/profile-offers-received-api-provided'
import { links } from '@echo/ui/constants/links'
import { OfferRoleReceiver } from '@echo/ui/constants/offer-role'
import { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { redirectIfNotLoggedIn } from '@helpers/auth/redirect-if-not-logged-in'
import { fetcher } from '@helpers/fetcher'
import { mapOfferFiltersToQueryParams } from '@helpers/request/map-offer-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { getServerSession } from 'next-auth/next'
import { assoc, isNil, map, mergeLeft } from 'ramda'
import type { FunctionComponent } from 'react'

const ProfileOffersReceivedPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.offersReceived)
  const filterParams = mapOfferFiltersToQueryParams({
    as: OfferFilterAsReceiver,
    states: ['OPEN', 'ACCEPTED']
  })
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt' }]
  })
  const { data, error } = await fetcher(profileOffersApiUrl())
    .revalidate(3600)
    .query(mergeLeft(filterParams, queryParams))
    .bearerToken(session.user.sessionToken)
    .fetch<GetOffersResponse>()

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
