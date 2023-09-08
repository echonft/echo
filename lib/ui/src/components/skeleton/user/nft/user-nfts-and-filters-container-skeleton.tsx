import { UserOfferButton } from '../../../user/user-offer-button'
import { TraitFilterPanelSkeleton } from '../../collection/filters/trait-filter-panel-skeleton'
import { NftThumbnailSkeleton } from '../../nft/nft-thumbnail-skeleton'
import { CollectionFilterPanelSkeleton } from '../filters/collection-filter-panel-skeleton'
import { NftsByCollectionDisclosureButtonSkeleton } from './nfts-by-collection-disclosure-button-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const UserNftsAndFiltersContainerSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-row', 'self-stretch', 'grow', 'gap-8')}>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4')}>
        <UserOfferButton count={0} />
        <CollectionFilterPanelSkeleton />
        <TraitFilterPanelSkeleton />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-4', 'h-max')}>
        <NftsByCollectionDisclosureButtonSkeleton />
        <div className={clsx('flex', 'flex-row', 'grow', 'flex-wrap', 'gap-6', 'h-max')}>
          <NftThumbnailSkeleton />
          <NftThumbnailSkeleton />
          <NftThumbnailSkeleton />
          <NftThumbnailSkeleton />
        </div>
      </div>
    </div>
  )
}
