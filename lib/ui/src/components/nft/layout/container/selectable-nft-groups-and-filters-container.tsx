'use client'
import { getItemsFromGroups } from '../../../../helpers/get-items-from-groups'
import { filterNftsByCollection } from '../../../../helpers/nft/filter-nfts-by-collection'
import { filterNftsByTraits } from '../../../../helpers/nft/filter-nfts-by-traits'
import { CollectionFilter } from '../../../../types/collection-filter'
import { Group } from '../../../../types/group'
import { GroupSelection } from '../../../../types/group-selection'
import { NftFilter } from '../../../../types/nft-filter'
import { NftsAndFiltersLayout } from '../nfts-and-filters-layout'
import { NftFiltersContainer } from './nft-filters-container'
import { SelectableNftGroupsContainer } from './selectable-nft-groups-container'
import { Nft, NftTraits } from '@echo/ui-model'
import { isIn, NonEmptyArray, propIsEmpty } from '@echo/utils'
import { add, filter, length, map, modify, partialRight, pipe, prop, reduce, reject } from 'ramda'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'

interface Props {
  groups: NonEmptyArray<Group<Nft>>
  availableFilters: NonEmptyArray<NftFilter>
}

export const SelectableNftGroupsAndFiltersContainer: FunctionComponent<Props> = ({ groups, availableFilters }) => {
  const [groupSelection, setGroupSelection] = useState<GroupSelection[]>([])
  const [traitSelection, setTraitSelection] = useState<NftTraits>({})
  const [collectionFilterSelection, setCollectionFilterSelection] = useState<CollectionFilter[]>([])

  const filteredGroups = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pipe(
        map(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          modify(
            'items',
            pipe(
              partialRight(filterNftsByCollection, [collectionFilterSelection]),
              partialRight(filterNftsByTraits, [traitSelection])
            )
          )
        ),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        reject(propIsEmpty('items'))
      )(groups) as NonEmptyArray<Group<Nft>>,
    [groups, collectionFilterSelection, traitSelection]
  )
  const nfts = useMemo(() => getItemsFromGroups(groups), [groups])
  const nftSelectionCount = useMemo(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => pipe(map(pipe(prop('selection'), length)), reduce(add, 0))(groupSelection),
    [groupSelection]
  ) as number

  // check if the selection is still valid (if selected NFTs are still in the filtered NFTs) when receiving new NFTs
  useEffect(() => {
    const filteredNftsIds = pipe(getItemsFromGroups, map(prop('id')))(filteredGroups)
    setGroupSelection(filter(pipe(prop('selection'), isIn(filteredNftsIds))))
  }, [filteredGroups])

  return (
    <NftsAndFiltersLayout>
      <NftFiltersContainer
        nfts={nfts}
        nftSelectionCount={nftSelectionCount}
        availableFilters={availableFilters}
        traitSelection={traitSelection}
        collectionFilterSelection={collectionFilterSelection}
        onTraitSelectionUpdate={setTraitSelection}
        onCollectionSelectionUpdate={setCollectionFilterSelection}
      />
      <SelectableNftGroupsContainer
        groups={filteredGroups}
        selection={groupSelection}
        onSelectionUpdate={setGroupSelection}
      />
    </NftsAndFiltersLayout>
  )
}
