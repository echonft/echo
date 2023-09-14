'use client'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { CollectionFilterPanel } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { TraitFilterPanel } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { FiltersPanelButton } from '@echo/ui/components/nft/layout/filters-panel-button'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/layout/nft-filters-panel-layout'
import { NftFilterCollections, NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { filterNftsByCollection } from '@echo/ui/helpers/nft/filter-nfts-by-collection'
import { filterNftsByTraits } from '@echo/ui/helpers/nft/filter-nfts-by-traits'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { Nft } from '@echo/ui/types/model/nft'
import type { NftTraits } from '@echo/ui/types/model/nft-traits'
import type { NftFilter } from '@echo/ui/types/nft-filter'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { includes } from 'ramda'
import { type FunctionComponent, type MouseEventHandler, useMemo } from 'react'

interface Props {
  nfts: Array<Nft>
  nftSelectionCount: number
  availableFilters: NonEmptyArray<NftFilter>
  traitSelection: NftTraits
  collectionFilterSelection: CollectionFilter[]
  btnLabel: string
  onButtonClick?: MouseEventHandler
  onTraitSelectionUpdate?: (selection: NftTraits) => unknown
  onCollectionSelectionUpdate?: (selection: CollectionFilter[]) => unknown
}

export const NftFiltersContainer: FunctionComponent<Props> = ({
  nfts,
  nftSelectionCount,
  availableFilters,
  traitSelection,
  collectionFilterSelection,
  btnLabel,
  onButtonClick,
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
      <FiltersPanelButton count={nftSelectionCount} label={btnLabel} onClick={onButtonClick} />
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
