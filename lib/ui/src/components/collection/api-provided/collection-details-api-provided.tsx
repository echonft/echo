import { SizeLG } from '../../../constants/size'
import { CollectionDetails } from '../details/collection-details'
import { GetNftCollectionResponse } from '@echo/api'
import { mapNftCollection } from '@echo/ui-model'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  response: GetNftCollectionResponse
}

export const CollectionDetailsApiProvided: FunctionComponent<Props> = ({ response }) => {
  const collection = useMemo(() => mapNftCollection(response.collection), [response])
  const { bannerUrl, totalSupply, name, description, profilePictureUrl, twitterUsername, discordUrl, websiteUrl } =
    collection
  return (
    <CollectionDetails
      bannerUrl={bannerUrl}
      supplyCount={totalSupply}
      collectionName={name}
      description={description}
      pictureUrl={profilePictureUrl}
      twitterUsername={twitterUsername}
      discordUrl={discordUrl}
      websiteUrl={websiteUrl}
      size={SizeLG}
    />
  )
}
