import type { CollectionResponse } from '@echo/api/types/responses/model/collection-response'
import { CollectionDetails } from '@echo/ui/components/collection/details/collection-details'
import { SizeLG } from '@echo/ui/constants/size'
import { type FunctionComponent } from 'react'

interface Props {
  response: CollectionResponse
}

export const CollectionDetailsApiProvided: FunctionComponent<Props> = ({ response }) => {
  const {
    bannerUrl,
    totalSupply,
    name,
    description,
    profilePictureUrl,
    twitterUsername,
    discordUrl,
    websiteUrl,
    verified
  } = response
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
      verified={verified}
      size={SizeLG}
    />
  )
}
