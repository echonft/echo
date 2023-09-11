import { NftFilterCollections, NftFilterTraits } from '../../../../../constants/nft-filter'
import { NftFilter } from '../../../../../types/nft-filter'
import { ShowIf } from '../../../../base/utils/show-if'
import { CollectionFilterPanelSkeleton } from '../../../filters/by-collection/skeleton/collection-filter-panel-skeleton'
import { TraitFilterPanelSkeleton } from '../../../filters/by-traits/skeleton/trait-filter-panel-skeleton'
import { FiltersPanelButton } from '../../filters-panel-button'
import { NftFiltersPanelLayout } from '../../nft-filters-panel-layout'
import { NonEmptyArray } from '@echo/utils'
import { includes } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  availableFilters: NonEmptyArray<NftFilter>
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
