import { mapListingFiltersToQueryParams } from '@echo/api/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrl } from '@echo/api/routing/api-url'
import type { ListingsResponse } from '@echo/api/types/responses/listings-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { CollectionListingsApiProvided } from '@echo/ui/components/collection/api-provided/collection-listings-api-provided'
import { getServerSession } from 'next-auth/next'
import { mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionListingsPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  const session = await getServerSession(authOptions)
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'asc' }]
  })
  const filtersQueryParam = mapListingFiltersToQueryParams({ state: ['OPEN'] })
  const response = await nextFetch.get<ListingsResponse>(apiUrl.collection.listings(slug), {
    params: mergeLeft(constraintsQueryParams, filtersQueryParam)
  })
  assertNextFetchResponse(response)
  return <CollectionListingsApiProvided collectionSlug={slug} listings={response.data.listings} user={session?.user} />
}

export default CollectionListingsPage
