import { CollectionDetails } from '../collection-details'
import { GetNftCollectionResponse } from '@echo/api'
import { mapNftCollection } from '@echo/ui-model'
import { FunctionComponent } from 'react'

interface Props {
  response: GetNftCollectionResponse
}

export const CollectionDetailsApiProvided: FunctionComponent<Props> = ({ response }) => {
  const { bannerUrl, totalSupply, name, description, profilePictureUrl, twitterUsername, discordUrl, websiteUrl } =
    mapNftCollection(response.collection)
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
}
