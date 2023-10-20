'use client'
import { type Nft } from '@echo/model/types/nft'
import { traitFilterEquals } from '@echo/ui/comparators/trait-filter-equals'
import { NftFiltersContainer } from '@echo/ui/components/nft/layout/container/nft-filters-container'
import { SelectableNftsContainer } from '@echo/ui/components/nft/layout/container/selectable-nfts-container'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/layout/nfts-and-filters-layout'
import { NftFilterCollections, NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { enable } from '@echo/ui/helpers/disableable/enable'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/get-collection-filters-for-nfts'
import { getTraitFiltersForNfts } from '@echo/ui/helpers/nft/get-trait-filters-for-nfts'
import { setNftDisabledPropFromCollectionFilter } from '@echo/ui/helpers/nft/set-nft-disabled-prop-from-collection-filter'
import { setNftDisabledPropFromTraitFilters } from '@echo/ui/helpers/nft/set-nft-disabled-prop-from-trait-filters'
import { getSelection } from '@echo/ui/helpers/selection/get-selection'
import { getSelectionCount } from '@echo/ui/helpers/selection/get-selection-count'
import { removeSelectionWhenDisabled } from '@echo/ui/helpers/selection/remove-selection-when-disabled'
import { toggleSelectionInList } from '@echo/ui/helpers/selection/toggle-selection-in-list'
import { type CollectionFilter } from '@echo/ui/types/collection-filter'
import { type DisableableType } from '@echo/ui/types/disableable'
import { type NftFilterType } from '@echo/ui/types/nft-filter-type'
import { type SelectableType } from '@echo/ui/types/selectable'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { includes, map, omit, pipe, propEq } from 'ramda'
import { type FunctionComponent, useEffect, useMemo, useState } from 'react'

interface Props {
  nfts: Nft[]
  availableFilters: NonEmptyArray<NftFilterType>
  btnLabel: string
  onButtonClick?: (nfts: Nft[]) => unknown
}

export const SelectableNftsAndFiltersContainer: FunctionComponent<Props> = ({
  nfts,
  availableFilters,
  btnLabel,
  onButtonClick
}) => {
  const [nftsWithProps, setNftsWithProps] = useState(nfts as DisableableType<SelectableType<Nft>>[])
  const [collectionFilters, setCollectionFilters] = useState(
    includes(NftFilterCollections, availableFilters) ? getCollectionFiltersForNfts(nfts) : []
  )
  const [traitFilters, setTraitFilters] = useState(
    includes(NftFilterTraits, availableFilters) ? getTraitFiltersForNfts(nfts) : []
  )
  const onTraitFilterToggleSelection = (filter: TraitFilter) => {
    setTraitFilters(toggleSelectionInList<TraitFilter>(traitFilterEquals(filter)))
  }
  const onCollectionFilterToggleSelection = (filter: CollectionFilter) => {
    setCollectionFilters(toggleSelectionInList<CollectionFilter>(propEq(filter.id, 'id')))
  }
  const onNftToggleSelection = (nft: Nft) => {
    setNftsWithProps(toggleSelectionInList<SelectableType<Nft>>(propEq(nft.id, 'id')))
  }
  const nftSelectionCount = useMemo(() => getSelectionCount(nftsWithProps), [nftsWithProps])

  // update NFTs disabled state according to filters selection
  useEffect(() => {
    setNftsWithProps(
      map(
        pipe(
          enable,
          setNftDisabledPropFromTraitFilters(traitFilters),
          setNftDisabledPropFromCollectionFilter(collectionFilters),
          removeSelectionWhenDisabled
        )
      )
    )
  }, [collectionFilters, traitFilters])

  return (
    <NftsAndFiltersLayout>
      <NftFiltersContainer
        nftSelectionCount={nftSelectionCount}
        btnLabel={btnLabel}
        collectionFilters={collectionFilters}
        traitFilters={traitFilters}
        onButtonClick={() => {
          onButtonClick?.(pipe(getSelection, map(omit(['selected', 'disabled'])))(nftsWithProps))
        }}
        onTraitSelectionToggle={onTraitFilterToggleSelection}
        onCollectionSelectionToggle={onCollectionFilterToggleSelection}
      />
      <SelectableNftsContainer
        nfts={nftsWithProps}
        selectionCount={nftSelectionCount}
        onToggleSelection={onNftToggleSelection}
      />
    </NftsAndFiltersLayout>
  )
}
