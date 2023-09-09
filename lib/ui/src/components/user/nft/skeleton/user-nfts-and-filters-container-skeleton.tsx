import { CollectionFilterPanelSkeleton } from '../../../nft/filters/by-collection/skeleton/collection-filter-panel-skeleton'
import { TraitFilterPanelSkeleton } from '../../../nft/filters/by-traits/skeleton/trait-filter-panel-skeleton'
import { NftsByCollectionDisclosureButtonSkeleton } from '../../../nft/layout/group/by-collection/skeleton/nfts-by-collection-disclosure-button-skeleton'
import { NftFiltersPanelLayout } from '../../../nft/layout/nft-filters-panel-layout'
import { NftsAndFiltersLayout } from '../../../nft/layout/nfts-and-filters-layout'
import { NftsLayout } from '../../../nft/layout/nfts-layout'
import { NftThumbnailSkeleton } from '../../../nft/thumbnail/skeleton/nft-thumbnail-skeleton'
import { UserOfferButton } from '../user-offer-button'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const UserNftsAndFiltersContainerSkeleton: FunctionComponent = () => {
  return (
    <NftsAndFiltersLayout>
      <NftFiltersPanelLayout>
        <UserOfferButton count={0} />
        <CollectionFilterPanelSkeleton />
        <TraitFilterPanelSkeleton />
      </NftFiltersPanelLayout>
      <div className={clsx('flex', 'flex-col', 'gap-4', 'h-max')}>
        <NftsByCollectionDisclosureButtonSkeleton />
        <NftsLayout>
          <NftThumbnailSkeleton />
          <NftThumbnailSkeleton />
          <NftThumbnailSkeleton />
          <NftThumbnailSkeleton />
        </NftsLayout>
      </div>
    </NftsAndFiltersLayout>
  )
}
