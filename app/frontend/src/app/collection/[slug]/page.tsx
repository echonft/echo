import { GetNftCollectionResponse, nftCollectionApiUrl } from '@echo/api-public'
import { mapNftCollection } from '@echo/ui-model'
import { getData } from '@echo/utils'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}
const CollectionPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  const nftCollectionResponse = await getData<GetNftCollectionResponse>(nftCollectionApiUrl(slug))
  if (isNil(nftCollectionResponse)) {
    notFound()
  }
  const mappedCollection = mapNftCollection(nftCollectionResponse.collection)
  return <p>{`collection: ${JSON.stringify(mappedCollection)}`}</p>
}

export default CollectionPage
