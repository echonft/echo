import { authOptions } from '@constants/auth-options'
import { GetOffersResponse } from '@echo/api'
import { profileOffersApiUrl } from '@echo/api/src/routing/profile-offers-api-url'
import { OfferFilterAsSender } from '@echo/firestore-types'
import { fetcher } from '@helpers/fetcher'
import { mapOfferFiltersToQueryParams } from '@helpers/request/map-offer-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { isNil, mergeLeft } from 'ramda'
import type { FunctionComponent } from 'react'

const ProfileOffersCreatedPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)

  if (isNil(session) || isNil(session.user)) {
    // TODO redirect to login (modal I guess)
    notFound()
  }

  const filterParams = mapOfferFiltersToQueryParams({
    as: OfferFilterAsSender,
    notStates: ['COMPLETED'],
    includeExpired: true
  })
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: { field: 'createdAt' }
  })
  const { data, error } = await fetcher(profileOffersApiUrl())
    .revalidate(3600)
    .query(mergeLeft(filterParams, queryParams))
    .fetch<GetOffersResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }
  return <p>{JSON.stringify(data)}</p>
  // return <ProfileOffersCreatedApiProvided responses={data.offers} />
}

export default ProfileOffersCreatedPage
