import { CollectionDetails } from '../collection-details'
import { GetNftCollectionResponse } from '@echo/api-public'
import { mapNftCollection } from '@echo/ui-model'
import { FunctionComponent } from 'react'

export interface CollectionDetailsServerComponentProps {
  collectionResponse: GetNftCollectionResponse
}

export const CollectionDetailsApiProvided: FunctionComponent<CollectionDetailsServerComponentProps> = ({
  collectionResponse
}) => {
  const { bannerUrl, totalSupply, name, description, profilePictureUrl, twitterUsername, discordUrl, websiteUrl } =
    mapNftCollection(collectionResponse.collection)
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
