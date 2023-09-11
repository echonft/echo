import { collectionNftsApiUrl, GetNftsResponse } from '@echo/api'
import { CollectionNftsApiProvided } from '@echo/ui/src/components/collection/api-provided/collection-nfts-api-provided'
import { fetcher } from '@helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionNftsPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  const queryParams = mapQueryConstraintsToQueryParams({
    select: [
      'id',
      'attributes',
      'balance',
      'blurUrl',
      'collection.id',
      'collection.name',
      'collection.slug',
      'name',
      'openSeaUrl',
      'owner',
      'pictureUrl',
      'thumbnailUrl',
      'tokenId',
      'tokenType'
    ],
    orderBy: [{ field: 'owner.discordUsername' }, { field: 'tokenId' }]
  })
  const { data, error } = await fetcher(collectionNftsApiUrl(slug))
    .revalidate(3600)
    .query(queryParams)
    .fetch<GetNftsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <CollectionNftsApiProvided collectionSlug={slug} responses={data.nfts} />
}

export default CollectionNftsPage
