import { GetNftCollectionNftsResponse, nftCollectionNftsApiUrl } from '@echo/api-public'
import { CollectionNftsApiProvided } from '@echo/ui'
import { getData } from '@echo/utils'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionNftsPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  try {
    const collectionNftsResponse = await getData<GetNftCollectionNftsResponse>(nftCollectionNftsApiUrl(slug))
    return <CollectionNftsApiProvided nftResponses={collectionNftsResponse.nfts} />
  } catch (e) {
    notFound()
  }
}

export default CollectionNftsPage
