import { mapListingFiltersToQueryParams } from '@echo/api/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { ListingsResponse } from '@echo/api/types/responses/listings-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { LISTING_STATE_OPEN } from '@echo/model/constants/listing-states'
import { CollectionListingsApiProvided } from '@echo/ui/components/collection/api-provided/collection-listings-api-provided'
import { getServerSession } from 'next-auth/next'
import { mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionListingsPage: FunctionComponent<Props> = async ({ params }) => {
  const session = await getServerSession(authOptions)
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'asc' }]
  })
  const filtersQueryParam = mapListingFiltersToQueryParams({ state: [LISTING_STATE_OPEN] })
  const response = await nextFetch.get<ListingsResponse>(apiUrlProvider.collection.listings.getUrl(params), {
    params: mergeLeft(constraintsQueryParams, filtersQueryParam)
  })
  assertNextFetchResponse(response)
  return (
    <CollectionListingsApiProvided
      collectionSlug={params.slug}
      listings={response.data.listings}
      user={session?.user}
    />
  )
}

export default CollectionListingsPage
