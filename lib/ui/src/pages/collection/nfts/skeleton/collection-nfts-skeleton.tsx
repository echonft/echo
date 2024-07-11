import { CardsSkeleton } from '@echo/ui/components/base/card/skeleton/cards-skeleton'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { NftFilterPanelSkeleton } from '@echo/ui/components/nft/filters/skeleton/nft-filter-panel-skeleton'
import { SelectableNftsActionButtonSkeleton } from '@echo/ui/components/nft/selectable/skeleton/selectable-nfts-action-button-skeleton'
import { type FunctionComponent } from 'react'

export const CollectionNftsSkeleton: FunctionComponent = () => {
  return (
    <NftsAndFiltersLayout>
      <NftFiltersPanelsLayout>
        <SelectableNftsActionButtonSkeleton />
        <NftFilterPanelSkeleton />
      </NftFiltersPanelsLayout>
      <CardsSkeleton />
    </NftsAndFiltersLayout>
  )
}
