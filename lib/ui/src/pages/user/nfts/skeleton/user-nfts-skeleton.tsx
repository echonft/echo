import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { NftFilterPanelSkeleton } from '@echo/ui/components/nft/filters/skeleton/nft-filter-panel-skeleton'
import { NftGroupsSkeleton } from '@echo/ui/components/nft/group/skeleton/nft-groups-skeleton'
import { NftSelectionButtonSkeleton } from '@echo/ui/components/nft/selection/skeleton/nft-selection-button-skeleton'
import { type FunctionComponent } from 'react'

export const UserNftsSkeleton: FunctionComponent = () => {
  return (
    <NftsAndFiltersLayout>
      <NftFiltersPanelsLayout>
        <NftSelectionButtonSkeleton />
        <NftFilterPanelSkeleton />
      </NftFiltersPanelsLayout>
      <NftGroupsSkeleton />
    </NftsAndFiltersLayout>
  )
}
