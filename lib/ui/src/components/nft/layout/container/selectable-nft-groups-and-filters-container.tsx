'use client'
import { type Nft } from '@echo/model/types/nft'
import { traitFilterEquals } from '@echo/ui/comparators/trait-filter-equals'
import { NftFiltersContainer } from '@echo/ui/components/nft/layout/container/nft-filters-container'
import { SelectableNftGroupsContainer } from '@echo/ui/components/nft/layout/container/selectable-nft-groups-container'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/layout/nfts-and-filters-layout'
import { NftFilterCollections, NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { disable } from '@echo/ui/helpers/disableable/disable'
import { enable } from '@echo/ui/helpers/disableable/enable'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/get-collection-filters-for-nfts'
import { getTraitFiltersForNfts } from '@echo/ui/helpers/nft/get-trait-filters-for-nfts'
import { groupNftsByCollection } from '@echo/ui/helpers/nft/group-nfts-by-collection'
import { setNftDisabledPropFromCollectionFilter } from '@echo/ui/helpers/nft/set-nft-disabled-prop-from-collection-filter'
import { setNftDisabledPropFromTraitFilters } from '@echo/ui/helpers/nft/set-nft-disabled-prop-from-trait-filters'
import { getGroupsSelection } from '@echo/ui/helpers/selection/get-groups-selection'
import { getGroupsSelectionCount } from '@echo/ui/helpers/selection/get-groups-selection-count'
import { getSelectionCount } from '@echo/ui/helpers/selection/get-selection-count'
import { removeSelectionWhenDisabled } from '@echo/ui/helpers/selection/remove-selection-when-disabled'
import { toggleSelectionInGroup } from '@echo/ui/helpers/selection/toggle-selection-in-group'
import { toggleSelectionInList } from '@echo/ui/helpers/selection/toggle-selection-in-list'
import { type CollectionFilter } from '@echo/ui/types/collection-filter'
import { type DisableableType } from '@echo/ui/types/disableable'
import { type Group } from '@echo/ui/types/group'
import { type NftFilterType } from '@echo/ui/types/nft-filter-type'
import { type SelectableType } from '@echo/ui/types/selectable'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { find, includes, isNil, lt, map, modify, omit, pipe, prop, propEq, unless } from 'ramda'
import { type FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react'

interface Props {
  nfts: Nft[]
  availableFilters: NftFilterType[]
  btnLabel: string
  hideOwner?: boolean
  onButtonClick?: (nfts: Nft[]) => unknown
}

export const SelectableNftGroupsAndFiltersContainer: FunctionComponent<Props> = ({
  nfts,
  availableFilters,
  btnLabel,
  hideOwner,
  onButtonClick
}) => {
  const [groups, setGroups] = useState<Group<DisableableType<SelectableType<Nft>>>[]>(groupNftsByCollection(nfts))
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

  const onNftToggleSelection = useCallback(
    (nft: Nft, groupId: string) => {
      const updatedGroups = toggleSelectionInGroup(groupId, propEq(nft.id, 'id'), groups)
      // if one group has a selection, disable all the items of the other groups
      const selectedGroup = find(pipe(prop('items'), getSelectionCount, lt(0)), updatedGroups)
      if (!isNil(selectedGroup)) {
        setGroups(
          map(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            unless(propEq(selectedGroup.id, 'id'), modify('items', map(disable))),
            updatedGroups
          ) as Group<DisableableType<SelectableType<Nft>>>[]
        )
      } else {
        setGroups(
          map(
            modify(
              'items',
              map(
                pipe(
                  enable,
                  setNftDisabledPropFromTraitFilters(traitFilters),
                  setNftDisabledPropFromCollectionFilter(collectionFilters),
                  removeSelectionWhenDisabled
                )
              )
            ),
            updatedGroups
          )
        )
      }
    },
    [groups, collectionFilters, traitFilters]
  )
  const nftSelectionCount = useMemo(() => getGroupsSelectionCount(groups), [groups])

  // update NFTs disabled state according to filters selection
  useEffect(() => {
    setGroups(
      map(
        modify(
          'items',
          map(
            pipe(
              enable,
              setNftDisabledPropFromTraitFilters(traitFilters),
              setNftDisabledPropFromCollectionFilter(collectionFilters),
              removeSelectionWhenDisabled
            )
          )
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
          onButtonClick?.(pipe(getGroupsSelection, omit(['selected', 'disabled']))(groups))
        }}
        onTraitSelectionToggle={onTraitFilterToggleSelection}
        onCollectionSelectionToggle={onCollectionFilterToggleSelection}
      />
      <SelectableNftGroupsContainer groups={groups} hideOwner={hideOwner} onToggleSelection={onNftToggleSelection} />
    </NftsAndFiltersLayout>
  )
}
