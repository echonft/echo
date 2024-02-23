'use client'
import { type Nft } from '@echo/model/types/nft'
import { traitFilterEquals } from '@echo/ui/comparators/trait-filter-equals'
import { NftFiltersContainer } from '@echo/ui/components/nft/filters/layout/nft-filters-container'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { SelectableNftGroupsContainer } from '@echo/ui/components/nft/group/layout/selectable-nft-groups-container'
import { NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { disable } from '@echo/ui/helpers/disableable/disable'
import { enable } from '@echo/ui/helpers/disableable/enable'
import { disableAction } from '@echo/ui/helpers/nft/disable-action'
import { enableAction } from '@echo/ui/helpers/nft/enable-action'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/get-collection-filters-for-nfts'
import { getTraitFiltersForNfts } from '@echo/ui/helpers/nft/get-trait-filters-for-nfts'
import { getGroupsSelection } from '@echo/ui/helpers/nft/group/get-groups-selection'
import { getGroupsSelectionCount } from '@echo/ui/helpers/nft/group/get-groups-selection-count'
import { groupNftsByCollection } from '@echo/ui/helpers/nft/group/group-nfts-by-collection'
import { toggleSelectionInGroup } from '@echo/ui/helpers/nft/group/toggle-selection-for-nft-in-group'
import { unselectNftGroupsFromItems } from '@echo/ui/helpers/nft/group/unselect-nfts-group-from-items'
import { setSelectableNftDisabledPropFromCollectionFilter } from '@echo/ui/helpers/nft/set-selectable-nft-disabled-prop-from-collection-filter'
import { getSelectionCount } from '@echo/ui/helpers/selectable/get-selection-count'
import { removeSelectionWhenDisabled } from '@echo/ui/helpers/selectable/remove-selection-when-disabled'
import { toggleSelectionInList } from '@echo/ui/helpers/selectable/toggle-selection-in-list'
import { useNewListingStore } from '@echo/ui/hooks/use-new-listing-store'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { type CollectionFilter } from '@echo/ui/types/collection-filter'
import { type NftFilterType } from '@echo/ui/types/nft-filter-type'
import { type NftGroup } from '@echo/ui/types/nft-group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { find, includes, isNil, lt, map, modify, pipe, prop, propEq, unless } from 'ramda'
import { type FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react'

interface Props {
  nfts: SelectableNft[]
  availableFilters: NftFilterType[]
  btnLabel: string
  hideOwner?: boolean
  onButtonClick?: (nfts: SelectableNft[]) => unknown
}

export const SelectableNftGroupsAndFiltersContainer: FunctionComponent<Props> = ({
  nfts,
  availableFilters,
  btnLabel,
  hideOwner,
  onButtonClick
}) => {
  const [groups, setGroups] = useState<NftGroup<SelectableNft>[]>(groupNftsByCollection(nfts))
  const { senderItems } = useNewOfferStore()
  const { items } = useNewListingStore()
  // Reset state when offer changes
  useEffect(() => {
    setGroups((prevState) => unselectNftGroupsFromItems(prevState, senderItems))
  }, [senderItems])
  // Reset state when listing changes
  useEffect(() => {
    setGroups((prevState) => unselectNftGroupsFromItems(prevState, items))
  }, [items])

  const [collectionFilters, setCollectionFilters] = useState(
    includes(NFT_FILTER_COLLECTIONS, availableFilters) ? getCollectionFiltersForNfts(nfts) : []
  )
  const [traitFilters, setTraitFilters] = useState(
    includes(NFT_FILTER_TRAITS, availableFilters) ? getTraitFiltersForNfts(nfts) : []
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
      const selectedGroup = find(pipe(prop('items'), getSelectionCount, lt(0)), updatedGroups)
      if (isNil(selectedGroup)) {
        setGroups(
          map(
            modify(
              'items',
              map(
                pipe(
                  enable,
                  setSelectableNftDisabledPropFromTraitFilters(traitFilters),
                  setSelectableNftDisabledPropFromCollectionFilter(collectionFilters),
                  removeSelectionWhenDisabled,
                  enableAction
                )
              )
            ),
            updatedGroups
          )
        )
      } else {
        // if one group has a selection, disable all the items of the other groups
        setGroups(
          map<NftGroup<SelectableNft>, NftGroup<SelectableNft>>(
            pipe(
              modify('items', map(disableAction)),
              unless<NftGroup<SelectableNft>, NftGroup<SelectableNft>>(
                propEq(selectedGroup.id, 'id'),
                modify('items', map(disable<SelectableNft>))
              )
            ),
            updatedGroups
          )
        )
      }
    },
    [groups, collectionFilters, traitFilters]
  )
  const selectionCount = useMemo(() => getGroupsSelectionCount(groups), [groups])

  // update NFTs disabled state according to filters selection
  useEffect(() => {
    setGroups(
      map(
        modify(
          'items',
          map(
            pipe(
              enable,
              setSelectableNftDisabledPropFromTraitFilters(traitFilters),
              setSelectableNftDisabledPropFromCollectionFilter(collectionFilters),
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
        selectionCount={selectionCount}
        btnLabel={btnLabel}
        collectionFilters={collectionFilters}
        traitFilters={traitFilters}
        onButtonClick={() => {
          onButtonClick?.(getGroupsSelection(groups))
        }}
        onTraitSelectionToggle={onTraitFilterToggleSelection}
        onCollectionSelectionToggle={onCollectionFilterToggleSelection}
      />
      <SelectableNftGroupsContainer
        groups={groups}
        hideOwner={hideOwner}
        onToggleSelection={onNftToggleSelection}
        onAction={(nft) => {
          onButtonClick?.([nft])
        }}
      />
    </NftsAndFiltersLayout>
  )
}
