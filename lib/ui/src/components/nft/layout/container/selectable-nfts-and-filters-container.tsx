'use client'
import { NftFiltersContainer } from '@echo/ui/components/nft/layout/container/nft-filters-container'
import { SelectableNftsContainer } from '@echo/ui/components/nft/layout/container/selectable-nfts-container'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/layout/nfts-and-filters-layout'
import { filterNftsByCollection } from '@echo/ui/helpers/nft/filter-nfts-by-collection'
import { filterNftsByTraits } from '@echo/ui/helpers/nft/filter-nfts-by-traits'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { Nft } from '@echo/ui/types/model/nft'
import type { NftTraits } from '@echo/ui/types/model/nft-traits'
import type { NftFilter } from '@echo/ui/types/nft-filter'
import { isIn } from '@echo/utils/fp/is-in'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { filter, map, partialRight, pipe, prop } from 'ramda'
import { type FunctionComponent, useEffect, useMemo, useState } from 'react'

interface Props {
  nfts: NonEmptyArray<Nft>
  availableFilters: NonEmptyArray<NftFilter>
  btnLabel: string
  onMakeOffer?: (selectedIds: string[]) => unknown
}

export const SelectableNftsAndFiltersContainer: FunctionComponent<Props> = ({
  nfts,
  availableFilters,
  btnLabel,
  onMakeOffer
}) => {
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
        btnLabel={btnLabel}
        onButtonClick={() => onMakeOffer?.(nftSelection)}
        onTraitSelectionUpdate={setTraitSelection}
        onCollectionSelectionUpdate={setCollectionFilterSelection}
      />
      <SelectableNftsContainer nfts={filteredNfts} selection={nftSelection} onSelectionUpdate={setNftSelection} />
    </NftsAndFiltersLayout>
  )
}
