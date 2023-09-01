import { ErrorStatus, GetNftCollectionNftsResponse, nftCollectionNftsApiUrl } from '@echo/api-public'
import { CollectionNftsApiProvided } from '@echo/ui'
import { fetcher } from '@lib/helpers/fetcher'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionNftsPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  const { data, error } = await fetcher(nftCollectionNftsApiUrl(slug))
    .revalidate(3600)
    .fetch<GetNftCollectionNftsResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      if (error.status === ErrorStatus.NOT_FOUND) {
        notFound()
      }
      throw Error(error.message)
    }
    throw Error()
  }

  return <CollectionNftsApiProvided nftResponses={data.nfts} />
}

export default CollectionNftsPage
