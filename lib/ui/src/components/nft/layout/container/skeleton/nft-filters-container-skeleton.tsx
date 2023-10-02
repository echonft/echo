import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { CollectionFilterPanelSkeleton } from '@echo/ui/components/nft/filters/by-collection/skeleton/collection-filter-panel-skeleton'
import { TraitFilterPanelSkeleton } from '@echo/ui/components/nft/filters/by-traits/skeleton/trait-filter-panel-skeleton'
import { FiltersPanelButton } from '@echo/ui/components/nft/layout/filters-panel-button'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/layout/nft-filters-panel-layout'
import { NftFilterCollections, NftFilterTraits } from '@echo/ui/constants/nft-filter'
import type { NftFilterType } from '@echo/ui/types/nft-filter-type'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { includes } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  availableFilters: NonEmptyArray<NftFilterType>
  btnLabel: string
}

export const NftFiltersContainerSkeleton: FunctionComponent<Props> = ({ availableFilters, btnLabel }) => {
  const includeTraitFilter = includes(NftFilterTraits, availableFilters)
  const includeCollectionFilter = includes(NftFilterCollections, availableFilters)

  return (
    <NftFiltersPanelLayout>
      <FiltersPanelButton count={0} label={btnLabel} />
      <ShowIf condition={includeCollectionFilter}>
        <CollectionFilterPanelSkeleton />
      </ShowIf>
      <ShowIf condition={includeTraitFilter}>
        <TraitFilterPanelSkeleton />
      </ShowIf>
    </NftFiltersPanelLayout>
  )
}
