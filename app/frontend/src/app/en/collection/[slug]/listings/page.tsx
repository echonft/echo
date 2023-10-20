import { authOptions } from '@constants/auth-options'
import { collectionListingsApiUrl } from '@echo/api/routing/collection-listings-api-url'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { CollectionListingsApiProvided } from '@echo/ui/components/collection/api-provided/collection-listings-api-provided'
import { fetcher } from '@helpers/fetcher'
import { mapListingFiltersToQueryParams } from '@helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { getServerSession } from 'next-auth/next'
import { isNil, mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionListingsPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  const session = await getServerSession(authOptions)
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt' }]
  })
  const filtersQueryParam = mapListingFiltersToQueryParams({ states: ['OPEN'] })

  const { data, error } = await fetcher(collectionListingsApiUrl(slug))
    .revalidate(3600)
    .query(mergeLeft(constraintsQueryParams, filtersQueryParam))
    .fetch<ListingsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <CollectionListingsApiProvided collectionSlug={slug} listings={data.listings} user={session?.user} />
}

export default CollectionListingsPage
