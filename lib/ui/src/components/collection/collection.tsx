import { PaddedContainer } from '../layout/padded-container'
import { CollectionDetails } from './collection-details'
import { CollectionNftsAndFiltersContainer } from './collection-nfts-and-filters-container'
import { Nft, NftCollection, NftTraits } from '@echo/model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface CollectionProps {
  collection: NftCollection
  nfts: Nft[]
  traits: NftTraits
  isFetchingNfts?: boolean
  onTraitSelectionChanged?: (selection: NftTraits) => unknown
  onMakeOfferForNft?: (id: string) => unknown
}

export const Collection: FunctionComponent<CollectionProps> = ({
  collection,
  nfts,
  traits,
  isFetchingNfts,
  onTraitSelectionChanged,
  onMakeOfferForNft
}) => {
  const { description, twitterUsername, name, discordUrl, websiteUrl, bannerUrl, profilePictureUrl, totalSupply } =
    collection
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow')}>
        <CollectionDetails
          description={description}
          size={totalSupply}
          collectionName={name}
          pictureUrl={profilePictureUrl}
          bannerUrl={bannerUrl}
          discordUrl={discordUrl}
          websiteUrl={websiteUrl}
          twitterUsername={twitterUsername}
        />
      </div>
      <CollectionNftsAndFiltersContainer
        nfts={nfts}
        traits={traits}
        isFetchingNfts={isFetchingNfts}
        onMakeOfferForNft={onMakeOfferForNft}
        onTraitSelectionChanged={onTraitSelectionChanged}
      />
    </PaddedContainer>
  )
}
