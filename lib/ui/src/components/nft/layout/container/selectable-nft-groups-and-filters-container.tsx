'use client'
import { NftFiltersContainer } from '@echo/ui/components/nft/layout/container/nft-filters-container'
import { SelectableNftGroupsContainer } from '@echo/ui/components/nft/layout/container/selectable-nft-groups-container'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/layout/nfts-and-filters-layout'
import { getItemsFromGroups } from '@echo/ui/helpers/get-items-from-groups'
import { filterNftsByCollection } from '@echo/ui/helpers/nft/filter-nfts-by-collection'
import { filterNftsByTraits } from '@echo/ui/helpers/nft/filter-nfts-by-traits'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { Group } from '@echo/ui/types/group'
import type { GroupSelection } from '@echo/ui/types/group-selection'
import type { Nft } from '@echo/ui/types/model/nft'
import type { NftTraits } from '@echo/ui/types/model/nft-traits'
import type { NftFilter } from '@echo/ui/types/nft-filter'
import { isIn } from '@echo/utils/fp/is-in'
import { propIsEmpty } from '@echo/utils/fp/prop-is-empty'
import { propIsNotEmpty } from '@echo/utils/fp/prop-is-not-empty'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
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
import { type FunctionComponent, type MouseEventHandler, useEffect, useMemo, useState } from 'react'

interface Props {
  groups: NonEmptyArray<Group<Nft>>
  availableFilters: NonEmptyArray<NftFilter>
  btnLabel: string
  hideOwner?: boolean
  onButtonClick?: MouseEventHandler
}

export const SelectableNftGroupsAndFiltersContainer: FunctionComponent<Props> = ({
  groups,
  availableFilters,
  btnLabel,
  hideOwner,
  onButtonClick
}) => {
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
        btnLabel={btnLabel}
        onButtonClick={onButtonClick}
        onTraitSelectionUpdate={setTraitSelection}
        onCollectionSelectionUpdate={setCollectionFilterSelection}
      />
      <SelectableNftGroupsContainer
        groups={validGroups}
        selection={groupSelection}
        hideOwner={hideOwner}
        onSelectionUpdate={setGroupSelection}
      />
    </NftsAndFiltersLayout>
  )
}
