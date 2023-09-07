import { fetcher } from '../../../../../lib/helpers/fetcher'
import { mapListingFiltersToQueryParams } from '../../../../../lib/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '../../../../../lib/helpers/request/map-query-constraints-to-query-params'
import { ErrorStatus } from '../../../../../lib/server/constants/error-status'
import { collectionListingsApiUrl, GetListingsResponse } from '@echo/api'
import { CollectionListingsApiProvided } from '@echo/ui'
import { notFound } from 'next/navigation'
import { isNil, mergeLeft } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionListingsPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: { field: 'expiresAt' }
  })
  const filtersQueryParam = mapListingFiltersToQueryParams({ states: ['OPEN'] })

  const { data, error } = await fetcher(collectionListingsApiUrl(slug))
    .revalidate(3600)
    .query(mergeLeft(constraintsQueryParams, filtersQueryParam))
    .fetch<GetListingsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      if (error.status === ErrorStatus.NOT_FOUND) {
        notFound()
      }
      throw Error(error.message)
    }
    throw Error()
  }

  return <CollectionListingsApiProvided collectionSlug={slug} responses={data.listings} />
}

export default CollectionListingsPage
