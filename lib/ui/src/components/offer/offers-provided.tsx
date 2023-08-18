import { Offer } from '../../types/offer'
import { PaddedContainer } from '../layout/padded-container'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OffersProvidedProps {
  offers: Offer[]
}

export const OffersProvided: FunctionComponent<OffersProvidedProps> = ({ offers }) => {
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'gap-14')}>
        {/*<CollectionNftsAndFiltersContainer*/}
        {/*  nfts={nfts}*/}
        {/*  traits={traits}*/}
        {/*  isFetchingNfts={isFetchingNfts}*/}
        {/*  onMakeOfferForNft={onMakeOfferForNft}*/}
        {/*  onTraitSelectionUpdate={onTraitSelectionUpdate}*/}
        {/*/>*/}
        {/*<CollectionDetails*/}
        {/*    description={description}*/}
        {/*    size={totalSupply}*/}
        {/*    collectionName={name}*/}
        {/*    pictureUrl={profilePictureUrl}*/}
        {/*    bannerUrl={bannerUrl}*/}
        {/*    discordUrl={discordUrl}*/}
        {/*    websiteUrl={websiteUrl}*/}
        {/*    twitterUsername={twitterUsername}*/}
        {/*/>*/}
      </div>
    </PaddedContainer>
  )
}
