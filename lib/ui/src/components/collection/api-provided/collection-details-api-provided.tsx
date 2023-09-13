import type { NftCollectionResponse } from '@echo/api/types/responses/model/nft-collection-response'
import { CollectionDetails } from '@echo/ui/components/collection/details/collection-details'
import { SizeLG } from '@echo/ui/constants/size'
import { mapNftCollection } from '@echo/ui/mappers/from-api/map-nft-collection'
import { type FunctionComponent, useMemo } from 'react'

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
