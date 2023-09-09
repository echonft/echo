'use client'
import { filterNftsByCollection } from '../../../../helpers/nft/filter-nfts-by-collection'
import { filterNftsByTraits } from '../../../../helpers/nft/filter-nfts-by-traits'
import { CollectionFilter } from '../../../../types/collection-filter'
import { NftFilter } from '../../../../types/nft-filter'
import { NftsAndFiltersLayout } from '../nfts-and-filters-layout'
import { NftFiltersContainer } from './nft-filters-container'
import { SelectableNftsContainer } from './selectable-nfts-container'
import { Nft, NftTraits } from '@echo/ui-model'
import { isIn, NonEmptyArray } from '@echo/utils'
import { filter, map, partialRight, pipe, prop } from 'ramda'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'

interface Props {
  nfts: NonEmptyArray<Nft>
  availableFilters: NonEmptyArray<NftFilter>
}

export const SelectableNftsAndFiltersContainer: FunctionComponent<Props> = ({ nfts, availableFilters }) => {
  const [nftSelection, setNftSelection] = useState<string[]>([])
  const [traitSelection, setTraitSelection] = useState<NftTraits>({})
  const [collectionFilterSelection, setCollectionFilterSelection] = useState<CollectionFilter[]>([])

  const filteredNfts = useMemo(
    () =>
      pipe(
        partialRight(filterNftsByCollection, [collectionFilterSelection]),
        partialRight(filterNftsByTraits, [traitSelection])
      )(nfts) as NonEmptyArray<Nft>,
    [nfts, collectionFilterSelection, traitSelection]
  )

  // check if the selection is still valid (if selected NFTs are still in the filtered NFTs) when receiving new NFTs
  useEffect(() => {
    const filteredNftsIds = map(prop('id'), filteredNfts)
    setNftSelection(filter(isIn(filteredNftsIds)))
  }, [filteredNfts])

  return (
    <NftsAndFiltersLayout>
      <NftFiltersContainer
        nfts={nfts}
        nftSelectionCount={nftSelection.length}
        availableFilters={availableFilters}
        traitSelection={traitSelection}
        collectionFilterSelection={collectionFilterSelection}
        onTraitSelectionUpdate={setTraitSelection}
        onCollectionSelectionUpdate={setCollectionFilterSelection}
      />
      <SelectableNftsContainer nfts={filteredNfts} selection={nftSelection} onSelectionUpdate={setNftSelection} />
    </NftsAndFiltersLayout>
  )
}
