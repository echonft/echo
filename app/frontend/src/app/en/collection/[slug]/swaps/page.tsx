import { collectionSwapsApiUrl } from '@echo/api/routing/collection-swaps-api-url'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { fetcher } from '@echo/frontend/lib/helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { CollectionSwapsApiProvided } from '@echo/ui/components/collection/api-provided/collection-swaps-api-provided'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionSwapsPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  const session = await getServerSession(authOptions)
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt' }]
  })

  const { data, error } = await fetcher(collectionSwapsApiUrl(slug))
    .revalidate(3600)
    .query(constraintsQueryParams)
    .fetch<OffersResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <CollectionSwapsApiProvided collectionSlug={slug} offers={data.offers} user={session?.user} />
}

export default CollectionSwapsPage
