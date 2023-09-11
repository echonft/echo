import collectionSwapsApiUrl from '@echo/api/routing/collection-swaps-api-url'
import type { GetOffersResponse } from '@echo/api/types'
import { CollectionSwapsApiProvided } from '@echo/ui/src/components/collection/api-provided/collection-swaps-api-provided'
import { fetcher } from '@helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionSwapsPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: { field: 'expiresAt' }
  })

  const { data, error } = await fetcher(collectionSwapsApiUrl(slug))
    .revalidate(3600)
    .query(constraintsQueryParams)
    .fetch<GetOffersResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <CollectionSwapsApiProvided collectionSlug={slug} responses={data.offers} />
}

export default CollectionSwapsPage
