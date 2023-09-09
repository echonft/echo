'use client'
import { NftFilterCollections, NftFilterTraits } from '../../../../constants/nft-filter'
import { filterNftsByCollection } from '../../../../helpers/nft/filter-nfts-by-collection'
import { filterNftsByTraits } from '../../../../helpers/nft/filter-nfts-by-traits'
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
import { FunctionComponent, useMemo } from 'react'

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

  // adjust filters according to other selected
  const nftsFilteredByCollection = useMemo(
    () => filterNftsByCollection(nfts, collectionFilterSelection),
    [nfts, collectionFilterSelection]
  )
  const nftsFilteredByTraits = useMemo(() => filterNftsByTraits(nfts, traitSelection), [nfts, traitSelection])

  return (
    <NftFiltersPanelLayout>
      <MakeOfferButton count={nftSelectionCount} />
      <ShowIf condition={includeCollectionFilter}>
        <CollectionFilterPanel
          nfts={nftsFilteredByTraits}
          selection={collectionFilterSelection}
          onSelectionUpdate={onCollectionSelectionUpdate}
        />
      </ShowIf>
      <ShowIf condition={includeTraitFilter}>
        <TraitFilterPanel
          nfts={nftsFilteredByCollection}
          selection={traitSelection}
          onSelectionUpdate={onTraitSelectionUpdate}
        />
      </ShowIf>
    </NftFiltersPanelLayout>
  )
}
