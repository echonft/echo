import { TraitFilterButtonSkeleton } from '@echo/ui/components/nft/filters/by-traits/skeleton/trait-filter-button-skeleton'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { type FunctionComponent } from 'react'

export const CollectionFilterPanelSkeleton: FunctionComponent = () => {
  return (
    <NftFiltersPanelLayout title={''}>
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
    </NftFiltersPanelLayout>
  )
}
