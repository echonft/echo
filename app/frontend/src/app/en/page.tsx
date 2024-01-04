import { mapCollectionFiltersToQueryParams } from '@echo/api/helpers/request/map-collection-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type CollectionsResponse } from '@echo/api/types/responses/collections-response'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { Home } from '@echo/ui/components/home/home'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { unstable_setRequestLocale } from 'next-intl/server'
import { mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

const HomePage: FunctionComponent = async () => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
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
  const collectionsResponse = await nextFetch.get<CollectionsResponse>(apiUrlProvider.collection.all.getUrl(), {
    params: mergeLeft(collectionsConstraintsQueryParams, collectionFiltersQueryParam)
  })
  const swapsResponse = await nextFetch.get<OffersResponse>(apiUrlProvider.swap.all.getUrl(), {
    params: swapsConstraintsQueryParams
  })
  assertNextFetchResponse(collectionsResponse)
  assertNextFetchResponse(swapsResponse)
  return (
    <PageLayout headerProps={{ user, absolute: true }} bg={'transparent'}>
      <Home collections={collectionsResponse.data.collections} offers={swapsResponse.data.offers} />
    </PageLayout>
  )
}

export default HomePage
