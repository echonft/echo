import { authOptions } from '@constants/auth-options'
import { profileOffersApiUrl } from '@echo/api/routing/profile-offers-api-url'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { OfferFilterAsSender } from '@echo/firestore/constants/offer-filter-as'
import { ProfileOffersCreatedApiProvided } from '@echo/ui/components/profile/api-provided/profile-offers-created-api-provided'
import { links } from '@echo/ui/constants/links'
import { OfferRoleSender } from '@echo/ui/constants/offer-role'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { redirectIfNotLoggedIn } from '@helpers/auth/redirect-if-not-logged-in'
import { fetcher } from '@helpers/fetcher'
import { mapOfferFiltersToQueryParams } from '@helpers/request/map-offer-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { getServerSession } from 'next-auth/next'
import { assoc, isNil, map, mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileOffersCreatedPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.offersCreated)
  const filterParams = mapOfferFiltersToQueryParams({
    as: OfferFilterAsSender,
    notStates: ['COMPLETED'],
    includeExpired: true
  })
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'createdAt' }]
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
    <ProfileOffersCreatedApiProvided
      offers={map(assoc('role', OfferRoleSender), data.offers) as OfferWithRole[]}
      user={session.user}
    />
  )
}

export default ProfileOffersCreatedPage
