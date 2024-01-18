import { type Collection } from '@echo/model/types/collection'
import { CollectionDetails } from '@echo/ui/components/collection/details/collection-details'
import { type FunctionComponent } from 'react'

interface Props {
  collection: Collection
}

export const CollectionDetailsApiProvided: FunctionComponent<Props> = ({ collection }) => {
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
  } = collection
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
    />
  )
}
