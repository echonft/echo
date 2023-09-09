import { fetcher } from '../../../../../lib/helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '../../../../../lib/helpers/request/map-query-constraints-to-query-params'
import { ErrorStatus } from '../../../../../lib/server/constants/error-status'
import { collectionNftsApiUrl, GetNftsResponse } from '@echo/api'
import { CollectionNftsApiProvided } from '@echo/ui'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

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
      if (error.status === ErrorStatus.NOT_FOUND) {
        notFound()
      }
      throw Error(error.message)
    }
    throw Error()
  }

  return <CollectionNftsApiProvided collectionSlug={slug} responses={data.nfts} />
}

export default CollectionNftsPage
