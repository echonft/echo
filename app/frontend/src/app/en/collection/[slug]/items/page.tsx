import { collectionNftsApiUrl } from '@echo/api/routing/collection-nfts-api-url'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { fetcher } from '@echo/frontend/lib/helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { CollectionNftsApiProvided } from '@echo/ui/components/collection/api-provided/collection-nfts-api-provided'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
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
  const { data, error } = await fetcher(collectionNftsApiUrl(slug))
    .revalidate(3600)
    .query(queryParams)
    .fetch<NftsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <CollectionNftsApiProvided collectionSlug={slug} nfts={data.nfts} user={session?.user} />
}

export default CollectionNftsPage
