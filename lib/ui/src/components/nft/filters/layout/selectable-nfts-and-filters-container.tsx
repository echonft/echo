'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { type Nft } from '@echo/model/types/nft'
import { traitFilterEquals } from '@echo/ui/comparators/trait-filter-equals'
import { NftFiltersContainer } from '@echo/ui/components/nft/filters/layout/nft-filters-container'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { SelectableNftCardsContainer } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-cards-container'
import { NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { enable } from '@echo/ui/helpers/disableable/enable'
import { disableAction } from '@echo/ui/helpers/nft/disable-action'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/get-collection-filters-for-nfts'
import { getTraitFiltersForNfts } from '@echo/ui/helpers/nft/get-trait-filters-for-nfts'
import { setSelectableNftActionDisabledPropFromAuthUser } from '@echo/ui/helpers/nft/set-selectable-nft-action-disabled-prop-from-auth-user'
import { setSelectableNftDisabledPropFromCollectionFilter } from '@echo/ui/helpers/nft/set-selectable-nft-disabled-prop-from-collection-filter'
import { setSelectableNftDisabledPropFromOwner } from '@echo/ui/helpers/nft/set-selectable-nft-disabled-prop-from-owner'
import { setSelectableNftDisabledPropFromTraitFilters } from '@echo/ui/helpers/nft/set-selectable-nft-disabled-prop-from-trait-filters'
import { unselectNftsFromItems } from '@echo/ui/helpers/nft/unselect-nfts-from-items'
import { getSelection } from '@echo/ui/helpers/selection/get-selection'
import { getSelectionCount } from '@echo/ui/helpers/selection/get-selection-count'
import { removeSelectionWhenDisabled } from '@echo/ui/helpers/selection/remove-selection-when-disabled'
import { toggleSelectionInList } from '@echo/ui/helpers/selection/toggle-selection-in-list'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { type CollectionFilter } from '@echo/ui/types/collection-filter'
import { type NftFilterType } from '@echo/ui/types/nft-filter-type'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { includes, map, pipe, propEq } from 'ramda'
import { type FunctionComponent, useEffect, useMemo, useState } from 'react'

interface Props {
  nfts: SelectableNft[]
  availableFilters: NftFilterType[]
  btnLabel: string
  emptyBtnLabel: string
  user: AuthUser | undefined
  onButtonClick?: (nfts: SelectableNft[]) => unknown
  onEmptyButtonClick?: VoidFunction
}

export const SelectableNftsAndFiltersContainer: FunctionComponent<Props> = ({
  nfts,
  availableFilters,
  btnLabel,
  emptyBtnLabel,
  user,
  onButtonClick,
  onEmptyButtonClick
}) => {
  const [selectableNfts, setSelectableNfts] = useState(nfts)
  const { receiverItems } = useNewOfferStore()
  // Reset state when offer changes
  useEffect(() => {
    setSelectableNfts((prevState) => unselectNftsFromItems(prevState, receiverItems))
  }, [receiverItems])

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
  const onNftToggleSelection = (nft: Nft) => {
    const updatedNfts = toggleSelectionInList<SelectableNft>(propEq(nft.id, 'id'))(selectableNfts)
    const updatedSelectionCount = getSelectionCount(updatedNfts)
    if (updatedSelectionCount === 0) {
      setSelectableNfts(map(pipe(enable, setSelectableNftActionDisabledPropFromAuthUser(user)), updatedNfts))
    } else if (updatedSelectionCount === 1) {
      setSelectableNfts(map(pipe(setSelectableNftDisabledPropFromOwner(nft.owner), disableAction), updatedNfts))
    } else {
      setSelectableNfts(updatedNfts)
    }
  }
  const selectionCount = useMemo(() => getSelectionCount(selectableNfts), [selectableNfts])

  // update NFTs disabled state according to filters selection
  useEffect(() => {
    setSelectableNfts(
      map(
        pipe(
          enable,
          setSelectableNftDisabledPropFromTraitFilters(traitFilters),
          setSelectableNftDisabledPropFromCollectionFilter(collectionFilters),
          removeSelectionWhenDisabled
        )
      )
    )
  }, [collectionFilters, traitFilters])

  return (
    <NftsAndFiltersLayout>
      <NftFiltersContainer
        selectionCount={selectionCount === 0 ? undefined : selectionCount}
        btnLabel={selectionCount === 0 ? emptyBtnLabel : btnLabel}
        collectionFilters={collectionFilters}
        traitFilters={traitFilters}
        onButtonClick={() =>
          selectionCount === 0 ? onEmptyButtonClick?.() : onButtonClick?.(getSelection(selectableNfts))
        }
        onTraitSelectionToggle={onTraitFilterToggleSelection}
        onCollectionSelectionToggle={onCollectionFilterToggleSelection}
      />
      <SelectableNftCardsContainer
        nfts={selectableNfts}
        onToggleSelection={onNftToggleSelection}
        onAction={(nft) => {
          onButtonClick?.([nft])
        }}
      />
    </NftsAndFiltersLayout>
  )
}
