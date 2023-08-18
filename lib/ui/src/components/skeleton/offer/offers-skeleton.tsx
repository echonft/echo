import { PaddedContainer } from '../../layout/padded-container'
import { CollectionDetailsSkeleton } from '../collection/collection-details-skeleton'
import { CollectionNftsAndFiltersContainerSkeleton } from '../collection/collection-nfts-and-filters-container-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const OffersSkeleton: FunctionComponent = () => {
  return (
    <PaddedContainer>
      <div className={clsx('h-full', 'w-full', 'flex', 'flex-col', 'gap-14')}>
        {/*  TODO */}
        <CollectionDetailsSkeleton />
        <CollectionNftsAndFiltersContainerSkeleton />
      </div>
    </PaddedContainer>
  )
}
