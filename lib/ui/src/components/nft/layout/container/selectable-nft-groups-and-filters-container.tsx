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
import { isIn, NonEmptyArray, propIsEmpty, propIsNotEmpty } from '@echo/utils'
import {
  add,
  assoc,
  filter,
  find,
  isNil,
  length,
  map,
  modify,
  partialRight,
  pipe,
  prop,
  propEq,
  reduce,
  reject,
  unless
} from 'ramda'
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

  // adjust disabled state according to groupSelection
  const validGroups = useMemo(() => {
    // get the group that has a selected NFT
    const selectedGroup = find(propIsNotEmpty('selection'), groupSelection)
    if (isNil(selectedGroup)) {
      return filteredGroups
    }
    // disable all the other groups
    return map(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      unless(propEq(selectedGroup.id, 'id'), assoc('disabled', true)),
      filteredGroups
    ) as NonEmptyArray<Group<Nft>>
  }, [filteredGroups, groupSelection])

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
        groups={validGroups}
        selection={groupSelection}
        onSelectionUpdate={setGroupSelection}
      />
    </NftsAndFiltersLayout>
  )
}
