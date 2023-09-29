import { allCollectionsApiUrl } from '@echo/api/routing/all-collections-api-url'
import { allSwapsApiUrl } from '@echo/api/routing/all-swaps-api-url'
import { GetCollectionsResponse } from '@echo/api/types/responses/get-collections-response'
import { GetOffersResponse } from '@echo/api/types/responses/get-offers-response'
import { Home } from '@echo/ui/components/home/home'
import { CollectionTileDetails } from '@echo/ui/types/model/collection-tile-details'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { fetcher } from '@helpers/fetcher'
import { mapCollectionFiltersToQueryParams } from '@helpers/request/map-collection-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { notFound } from 'next/navigation'
import { isNil, mergeLeft } from 'ramda'
import type { FunctionComponent } from 'react'

const HomePage: FunctionComponent = async () => {
  const collectionsConstraintsQueryParams = mapQueryConstraintsToQueryParams({
    select: ['id', 'slug', 'profilePictureUrl', 'name'],
    orderBy: [{ field: 'swapsCount', direction: 'desc' }, { field: 'name' }],
    limit: 10
  })
  const collectionFiltersQueryParam = mapCollectionFiltersToQueryParams({ includeSwapsCount: true })
  const { data: collectionsData } = await fetcher(allCollectionsApiUrl())
    .revalidate(3600)
    .query(mergeLeft(collectionsConstraintsQueryParams, collectionFiltersQueryParam))
    .fetch<GetCollectionsResponse>()

  const swapsConstraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'updatedAt', direction: 'desc' }],
    limit: 5
  })
  const { data: swapsData } = await fetcher(allSwapsApiUrl())
    .revalidate(3600)
    .query(swapsConstraintsQueryParams)
    .fetch<GetOffersResponse>()

  // TODO manage errors
  if (isNil(collectionsData) || isNil(swapsData)) {
    notFound()
  }

  return (
    <Home
      collections={collectionsData.collections as unknown as NonEmptyArray<CollectionTileDetails>}
      offers={swapsData.offers}
    />
  )
}

export default HomePage
