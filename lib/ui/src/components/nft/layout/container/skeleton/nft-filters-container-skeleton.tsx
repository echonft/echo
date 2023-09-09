import { NftFilterCollections, NftFilterTraits } from '../../../../../constants/nft-filter'
import { NftFilter } from '../../../../../types/nft-filter'
import { ShowIf } from '../../../../base/utils/show-if'
import { CollectionFilterPanelSkeleton } from '../../../filters/by-collection/skeleton/collection-filter-panel-skeleton'
import { TraitFilterPanelSkeleton } from '../../../filters/by-traits/skeleton/trait-filter-panel-skeleton'
import { MakeOfferButton } from '../../make-offer-button'
import { NftFiltersPanelLayout } from '../../nft-filters-panel-layout'
import { NonEmptyArray } from '@echo/utils'
import { includes } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  availableFilters: NonEmptyArray<NftFilter>
}

export const NftFiltersContainerSkeleton: FunctionComponent<Props> = ({ availableFilters }) => {
  const includeTraitFilter = includes(NftFilterTraits, availableFilters)
  const includeCollectionFilter = includes(NftFilterCollections, availableFilters)

  return (
    <NftFiltersPanelLayout>
      <MakeOfferButton count={0} />
      <ShowIf condition={includeCollectionFilter}>
        <CollectionFilterPanelSkeleton />
      </ShowIf>
      <ShowIf condition={includeTraitFilter}>
        <TraitFilterPanelSkeleton />
      </ShowIf>
    </NftFiltersPanelLayout>
  )
}
