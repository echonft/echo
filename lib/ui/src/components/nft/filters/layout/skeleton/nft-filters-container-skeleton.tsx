import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { CollectionFilterPanelSkeleton } from '@echo/ui/components/nft/filters/by-collection/skeleton/collection-filter-panel-skeleton'
import { TraitFilterPanelSkeleton } from '@echo/ui/components/nft/filters/by-traits/skeleton/trait-filter-panel-skeleton'
import { NftFiltersPanelContainerLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-container-layout'
import { NftsFiltersContainerButtonSkeleton } from '@echo/ui/components/nft/filters/layout/skeleton/nfts-filters-container-button-skeleton'
import { NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { type NftFilterType } from '@echo/ui/types/nft-filter-type'
import { includes } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  availableFilters: NftFilterType[]
}

export const NftFiltersContainerSkeleton: FunctionComponent<Props> = ({ availableFilters }) => {
  const includeTraitFilter = includes(NFT_FILTER_TRAITS, availableFilters)
  const includeCollectionFilter = includes(NFT_FILTER_COLLECTIONS, availableFilters)

  return (
    <NftFiltersPanelContainerLayout>
      <NftsFiltersContainerButtonSkeleton />
      <ShowIf condition={includeCollectionFilter}>
        <CollectionFilterPanelSkeleton />
      </ShowIf>
      <ShowIf condition={includeTraitFilter}>
        <TraitFilterPanelSkeleton />
      </ShowIf>
    </NftFiltersPanelContainerLayout>
  )
}
