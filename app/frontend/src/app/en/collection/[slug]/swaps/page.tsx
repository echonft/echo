import { fetcher } from '../../../../../lib/helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '../../../../../lib/helpers/request/map-query-constraints-to-query-params'
import { ErrorStatus } from '../../../../../lib/server/constants/error-status'
import { GetOffersResponse } from '@echo/api'
import { collectionSwapsApiUrl } from '@echo/api/src/routing/collection-swaps-api-url'
import { CollectionSwapsApiProvided } from '@echo/ui'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

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
      if (error.status === ErrorStatus.NOT_FOUND) {
        notFound()
      }
      throw Error(error.message)
    }
    throw Error()
  }

  return <CollectionSwapsApiProvided collectionSlug={slug} responses={data.offers} />
}

export default CollectionSwapsPage
