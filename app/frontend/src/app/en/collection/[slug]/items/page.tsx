import { apiUrl } from '@echo/api/routing/api-url'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { CollectionNftsApiProvided } from '@echo/ui/components/collection/api-provided/collection-nfts-api-provided'
import { getServerSession } from 'next-auth/next'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionNftsPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  const session = await getServerSession(authOptions)
  const params = mapQueryConstraintsToQueryParams({
    orderBy: [
      { field: 'owner.discord.username', direction: 'asc' },
      { field: 'tokenId', direction: 'asc' }
    ]
  })
  const response = await nextFetch.get<NftsResponse>(apiUrl.collection.nfts(slug), {
    params
  })
  assertNextFetchResponse(response)
  return <CollectionNftsApiProvided collectionSlug={slug} nfts={response.data.nfts} user={session?.user} />
}

export default CollectionNftsPage
