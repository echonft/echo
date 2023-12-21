import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { CollectionNftsApiProvided } from '@echo/ui/components/collection/api-provided/collection-nfts-api-provided'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionNftsPage: FunctionComponent<Props> = async ({ params }) => {
  const user = await getAuthUser()
  const query = mapQueryConstraintsToQueryParams({
    orderBy: [
      { field: 'owner.discord.username', direction: 'asc' },
      { field: 'tokenId', direction: 'asc' }
    ]
  })
  const response = await nextFetch.get<NftsResponse>(apiUrlProvider.collection.nfts.getUrl(params), {
    params: query
  })
  assertNextFetchResponse(response)
  return <CollectionNftsApiProvided collectionSlug={params.slug} nfts={response.data.nfts} user={user} />
}

export default CollectionNftsPage
