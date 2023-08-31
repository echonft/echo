import { CollectionNftsContainer } from '../../collection/collection-nfts-container'
import { CollectionOfferButton } from '../../collection/collection-offer-button'
import { PaddedContainer } from '../../layout/padded-container'
import { TraitFilterPanelSkeleton } from './filters/trait-filter-panel-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const CollectionNftsSkeleton: FunctionComponent = () => {
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'grow', 'gap-8')}>
        <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4')}>
          <CollectionOfferButton count={0} />
          <TraitFilterPanelSkeleton />
        </div>
        <CollectionNftsContainer nfts={[]} />
      </div>
    </PaddedContainer>
  )
}
