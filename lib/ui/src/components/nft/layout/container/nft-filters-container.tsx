'use client'
import { NftFilterCollections, NftFilterTraits } from '../../../../constants/nft-filter'
import { CollectionFilter } from '../../../../types/collection-filter'
import { NftFilter } from '../../../../types/nft-filter'
import { ShowIf } from '../../../base/utils/show-if'
import { CollectionFilterPanel } from '../../filters/by-collection/collection-filter-panel'
import { TraitFilterPanel } from '../../filters/by-traits/trait-filter-panel'
import { MakeOfferButton } from '../make-offer-button'
import { NftFiltersPanelLayout } from '../nft-filters-panel-layout'
import { Nft, NftTraits } from '@echo/ui-model'
import { NonEmptyArray } from '@echo/utils'
import { includes } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  nfts: Array<Nft>
  nftSelectionCount: number
  availableFilters: NonEmptyArray<NftFilter>
  traitSelection: NftTraits
  collectionFilterSelection: CollectionFilter[]
  onTraitSelectionUpdate?: (selection: NftTraits) => unknown
  onCollectionSelectionUpdate?: (selection: CollectionFilter[]) => unknown
}

export const NftFiltersContainer: FunctionComponent<Props> = ({
  nfts,
  nftSelectionCount,
  availableFilters,
  traitSelection,
  collectionFilterSelection,
  onTraitSelectionUpdate,
  onCollectionSelectionUpdate
}) => {
  const includeTraitFilter = includes(NftFilterTraits, availableFilters)
  const includeCollectionFilter = includes(NftFilterCollections, availableFilters)

  return (
    <NftFiltersPanelLayout>
      <MakeOfferButton count={nftSelectionCount} />
      <ShowIf condition={includeCollectionFilter}>
        <CollectionFilterPanel
          nfts={nfts}
          selection={collectionFilterSelection}
          onSelectionUpdate={onCollectionSelectionUpdate}
        />
      </ShowIf>
      <ShowIf condition={includeTraitFilter}>
        <TraitFilterPanel nfts={nfts} selection={traitSelection} onSelectionUpdate={onTraitSelectionUpdate} />
      </ShowIf>
    </NftFiltersPanelLayout>
  )
}
