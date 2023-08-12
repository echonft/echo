import { PaddedContainer } from '../layout/padded-container'
import { CollectionDetails } from './collection-details'
import { CollectionNftsAndFiltersContainer } from './collection-nfts-and-filters-container'
import { Nft, NftCollection, NftTraits } from '../../../../ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface CollectionProvidedProps {
  collection: NftCollection
  nfts: Nft[]
  traits: NftTraits
  isFetchingNfts?: boolean
  onTraitSelectionUpdate?: (selection: NftTraits) => unknown
  onMakeOfferForNft?: (id: string) => unknown
}

export const CollectionProvided: FunctionComponent<CollectionProvidedProps> = ({
  collection,
  nfts,
  traits,
  isFetchingNfts,
  onTraitSelectionUpdate,
  onMakeOfferForNft
}) => {
  const { description, twitterUsername, name, discordUrl, websiteUrl, bannerUrl, profilePictureUrl, totalSupply } =
    collection
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'gap-14')}>
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
        <CollectionNftsAndFiltersContainer
          nfts={nfts}
          traits={traits}
          isFetchingNfts={isFetchingNfts}
          onMakeOfferForNft={onMakeOfferForNft}
          onTraitSelectionUpdate={onTraitSelectionUpdate}
        />
      </div>
    </PaddedContainer>
  )
}
