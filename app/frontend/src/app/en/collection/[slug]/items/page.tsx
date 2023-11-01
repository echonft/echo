import { collectionNftsApiUrl } from '@echo/api/routing/collection-nfts-api-url'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { assertFetchResult } from '@echo/frontend/lib/services/fetcher/assert-fetch-result'
import { fetcher } from '@echo/frontend/lib/services/fetcher/fetcher'
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
  const queryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'owner.discord.username' }, { field: 'tokenId' }]
  })
  const result = await fetcher(collectionNftsApiUrl(slug)).query(queryParams).fetch<NftsResponse>()
  assertFetchResult(result)
  return <CollectionNftsApiProvided collectionSlug={slug} nfts={result.data.nfts} user={session?.user} />
}

export default CollectionNftsPage
