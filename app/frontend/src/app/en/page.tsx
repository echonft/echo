import { authOptions } from '@constants/auth-options'
import { allCollectionsApiUrl } from '@echo/api/routing/all-collections-api-url'
import { allSwapsApiUrl } from '@echo/api/routing/all-swaps-api-url'
import { CollectionsResponse } from '@echo/api/types/responses/collections-response'
import { OffersResponse } from '@echo/api/types/responses/offers-response'
import { HomePage } from '@echo/ui/components/home/layout/home-page'
import { fetcher } from '@helpers/fetcher'
import { mapCollectionFiltersToQueryParams } from '@helpers/request/map-collection-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { isNil, mergeLeft } from 'ramda'
import type { FunctionComponent } from 'react'

const Home: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  const collectionsConstraintsQueryParams = mapQueryConstraintsToQueryParams({
    select: ['id', 'slug', 'profilePictureUrl', 'name'],
    orderBy: [{ field: 'swapsCount', direction: 'desc' }, { field: 'name' }],
    limit: 10
  })
  const collectionFiltersQueryParam = mapCollectionFiltersToQueryParams({ includeSwapsCount: true })
  const { data: collectionsData } = await fetcher(allCollectionsApiUrl())
    .revalidate(600)
    .query(mergeLeft(collectionsConstraintsQueryParams, collectionFiltersQueryParam))
    .fetch<CollectionsResponse>()

  const swapsConstraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'updatedAt', direction: 'desc' }],
    limit: 5
  })
  const { data: swapsData } = await fetcher(allSwapsApiUrl())
    .revalidate(600)
    .query(swapsConstraintsQueryParams)
    .fetch<OffersResponse>()

  // TODO manage errors
  if (isNil(collectionsData) || isNil(swapsData)) {
    notFound()
  }

  return <HomePage user={session?.user} collections={collectionsData.collections} offers={swapsData.offers} />
}

export default Home
