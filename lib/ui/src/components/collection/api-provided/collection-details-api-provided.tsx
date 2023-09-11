import { SizeLG } from '../../../constants/size'
import { CollectionDetails } from '../details/collection-details'
import type { NftCollectionResponse } from '@echo/api/types'
import { mapNftCollection } from '@echo/ui-model'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  response: Partial<NftCollectionResponse>
}

export const CollectionDetailsApiProvided: FunctionComponent<Props> = ({ response }) => {
  const collection = useMemo(() => mapNftCollection(response), [response])
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
