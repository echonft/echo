import { mapCollectionFiltersToQueryParams } from '@echo/api/helpers/request/map-collection-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type CollectionsResponse } from '@echo/api/types/responses/collections-response'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { HomePage } from '@echo/ui/components/home/layout/home-page'
import { getServerSession } from 'next-auth/next'
import { mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

const Home: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  const collectionsConstraintsQueryParams = mapQueryConstraintsToQueryParams({
    select: ['id', 'slug', 'profilePictureUrl', 'name'],
    orderBy: [
      { field: 'swapsCount', direction: 'desc' },
      { field: 'name', direction: 'asc' }
    ],
    limit: 10
  })
  const collectionFiltersQueryParam = mapCollectionFiltersToQueryParams({ includeSwapsCount: true })
  const swapsConstraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'updatedAt', direction: 'desc' }],
    limit: 5
  })
  const collectionsResponse = await nextFetch.get<CollectionsResponse>(apiUrlProvider.collection.all.get(), {
    params: mergeLeft(collectionsConstraintsQueryParams, collectionFiltersQueryParam)
  })
  const swapsResponse = await nextFetch.get<OffersResponse>(apiUrlProvider.swap.all.get(), {
    params: swapsConstraintsQueryParams
  })
  assertNextFetchResponse(collectionsResponse)
  assertNextFetchResponse(swapsResponse)
  return (
    <HomePage
      user={session?.user}
      collections={collectionsResponse.data.collections}
      offers={swapsResponse.data.offers}
    />
  )
}

export default Home
