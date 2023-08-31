import { GetNftCollectionResponse, nftCollectionApiUrl } from '@echo/api-public'
import { CollectionDetails } from '@echo/ui'
import { mapNftCollection } from '@echo/ui-model'
import { getData } from '@echo/utils'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}
const CollectionPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  try {
    const nftCollectionResponse = await getData<GetNftCollectionResponse>(nftCollectionApiUrl(slug))
    const mappedCollection = mapNftCollection(nftCollectionResponse.collection)
    const { bannerUrl, totalSupply, name, description, profilePictureUrl, twitterUsername, discordUrl, websiteUrl } =
      mappedCollection
    return (
      <CollectionDetails
        bannerUrl={bannerUrl}
        size={totalSupply}
        collectionName={name}
        description={description}
        pictureUrl={profilePictureUrl}
        twitterUsername={twitterUsername}
        discordUrl={discordUrl}
        websiteUrl={websiteUrl}
      />
    )
  } catch (e) {
    notFound()
  }
}

export default CollectionPage
