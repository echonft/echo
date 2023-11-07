import { allCollectionsApiUrl } from '@echo/api/routing/all-collections-api-url'
import { allSwapsApiUrl } from '@echo/api/routing/all-swaps-api-url'
import { type CollectionsResponse } from '@echo/api/types/responses/collections-response'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { mapCollectionFiltersToQueryParams } from '@echo/frontend/lib/helpers/request/map-collection-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { assertFetchResult } from '@echo/frontend/lib/services/fetcher/assert-fetch-result'
import { fetcher } from '@echo/frontend/lib/services/fetcher/fetcher'
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
  const collectionsResult = await fetcher(allCollectionsApiUrl())
    .query(mergeLeft(collectionsConstraintsQueryParams, collectionFiltersQueryParam))
    .fetch<CollectionsResponse>()
  const swapsConstraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'updatedAt', direction: 'desc' }],
    limit: 5
  })
  const swapsResult = await fetcher(allSwapsApiUrl()).query(swapsConstraintsQueryParams).fetch<OffersResponse>()
  assertFetchResult(collectionsResult)
  assertFetchResult(swapsResult)
  return (
    <HomePage user={session?.user} collections={collectionsResult.data.collections} offers={swapsResult.data.offers} />
  )
}

export default Home
