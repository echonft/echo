import { NftCardsSkeleton } from '@echo/ui/components/nft/card/layout/skeleton/nft-cards-skeleton'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { NftFilterPanelSkeleton } from '@echo/ui/components/nft/filters/skeleton/nft-filter-panel-skeleton'
import { SelectableNftsActionButtonSkeleton } from '@echo/ui/components/nft/selectable/skeleton/selectable-nfts-action-button-skeleton'
import { type FunctionComponent } from 'react'

export const ProfileNftsSkeleton: FunctionComponent = () => {
  return (
    <NftsAndFiltersLayout>
      <NftFiltersPanelsLayout>
        <SelectableNftsActionButtonSkeleton />
        <NftFilterPanelSkeleton />
      </NftFiltersPanelsLayout>
      <NftCardsSkeleton />
    </NftsAndFiltersLayout>
  )
}
