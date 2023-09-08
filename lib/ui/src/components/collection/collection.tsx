import { PaddedContainer } from '../layout/padded-container'
import { CollectionDetails } from './collection-details'
import { CollectionNftsAndFiltersContainer } from './collection-nfts-and-filters-container'
import { Nft, NftCollection, NftTraits, SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  collection: NftCollection
  nfts: Nft[]
  traits: NftTraits
  onMakeOfferForNft?: (id: string) => unknown
}

export const Collection: FunctionComponent<Props> = ({ collection, nfts, traits, onMakeOfferForNft }) => {
  const { description, twitterUsername, name, discordUrl, websiteUrl, bannerUrl, profilePictureUrl, totalSupply } =
    collection
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'gap-14')}>
        <CollectionDetails
          description={description}
          supplyCount={totalSupply}
          collectionName={name}
          pictureUrl={profilePictureUrl}
          bannerUrl={bannerUrl}
          discordUrl={discordUrl}
          websiteUrl={websiteUrl}
          twitterUsername={twitterUsername}
          size={SizeLG}
        />
        <CollectionNftsAndFiltersContainer
          collectionSlug={collection.slug}
          nfts={nfts}
          traits={traits}
          onMakeOfferForNft={onMakeOfferForNft}
        />
      </div>
    </PaddedContainer>
  )
}
