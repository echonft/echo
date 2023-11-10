import { apiUrl } from '@echo/api/routing/api-url'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { CollectionSwapsApiProvided } from '@echo/ui/components/collection/api-provided/collection-swaps-api-provided'
import { getServerSession } from 'next-auth/next'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionSwapsPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  const session = await getServerSession(authOptions)
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'asc' }]
  })
  const response = await nextFetch.get<OffersResponse>(apiUrl.collection.swaps(slug), {
    params: constraintsQueryParams
  })
  assertNextFetchResponse(response)
  return <CollectionSwapsApiProvided collectionSlug={slug} offers={response.data.offers} user={session?.user} />
}

export default CollectionSwapsPage
