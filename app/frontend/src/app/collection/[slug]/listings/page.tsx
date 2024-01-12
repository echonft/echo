import { mapListingFiltersToQueryParams } from '@echo/api/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { ListingsResponse } from '@echo/api/types/responses/listings-response'
import { getCookieHeader } from '@echo/frontend/lib/helpers/auth/get-cookie-header'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { LISTING_STATE_OPEN } from '@echo/model/constants/listing-states'
import { CollectionListingsApiProvided } from '@echo/ui/components/collection/api-provided/collection-listings-api-provided'
import { unstable_setRequestLocale } from 'next-intl/server'
import { mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionListingsPage: FunctionComponent<Props> = async ({ params }) => {
  unstable_setRequestLocale('en')
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'asc' }]
  })
  const filtersQueryParam = mapListingFiltersToQueryParams({ state: [LISTING_STATE_OPEN] })
  const response = await nextFetch.get<ListingsResponse>(apiUrlProvider.collection.listings.getUrl(params), {
    cookie: getCookieHeader(),
    params: mergeLeft(constraintsQueryParams, filtersQueryParam)
  })
  assertNextFetchResponse(response)
  return <CollectionListingsApiProvided collectionSlug={params.slug} listings={response.data.listings} />
}

export default CollectionListingsPage
