import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { CollectionSwapsApiProvided } from '@echo/ui/components/collection/api-provided/collection-swaps-api-provided'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionSwapsPage: FunctionComponent<Props> = async ({ params }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'asc' }]
  })
  const response = await nextFetch.get<OffersResponse>(apiUrlProvider.collection.swaps.getUrl(params), {
    params: constraintsQueryParams
  })
  assertNextFetchResponse(response)
  return <CollectionSwapsApiProvided collectionSlug={params.slug} offers={response.data.offers} user={user} />
}

export default CollectionSwapsPage
