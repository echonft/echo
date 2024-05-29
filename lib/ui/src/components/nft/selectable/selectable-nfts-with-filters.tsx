'use client'
import type { Nft } from '@echo/model/types/nft'
import { CollectionFilterPanel } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { TraitFilterPanelVisibilityManager } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel-visibility-manager'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { SelectableNfts, type SelectableNftsProps } from '@echo/ui/components/nft/selectable/selectable-nfts'
import { SelectableNftsActionButton } from '@echo/ui/components/nft/selectable/selectable-nfts-action-button'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import type { NftSortBy } from '@echo/ui/types/nft-sort-by'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends Pick<SelectableNftsProps, 'action' | 'options' | 'style'> {
  nfts: Nft[]
  sortBy: NftSortBy
  onSelectionAction?: (selection: Nft[]) => void
}

export const SelectableNftsWithFilters: FunctionComponent<Props> = ({
  action,
  options,
  sortBy,
  style,
  nfts,
  onSelectionAction
}) => {
  const {
    filteredByNfts,
    selection,
    toggleTraitFilterSelection,
    toggleCollectionFilterSelection,
    selectNft,
    unselectNft
  } = useNfts({
    nfts,
    sortBy
  })

  return (
    <NftsAndFiltersLayout>
      <NftFiltersPanelsLayout>
        <SelectableNftsActionButton
          action={action}
          count={selection.nfts.length}
          onClick={() => {
            onSelectionAction?.(selection.nfts)
          }}
        />
        <CollectionFilterPanel
          nfts={nfts}
          selection={selection.collectionFilter}
          onToggleSelection={toggleCollectionFilterSelection}
        />
        <TraitFilterPanelVisibilityManager
          show={!isNil(selection.collectionFilter)}
          nfts={filteredByNfts.byCollection}
          selection={selection.traitFilters}
          onToggleSelection={toggleTraitFilterSelection}
        />
      </NftFiltersPanelsLayout>
      <SelectableNfts
        nfts={filteredByNfts.byTraits}
        selection={selection.nfts}
        action={NFT_ACTION_OFFER}
        options={options}
        style={style}
        onAction={(nft) => {
          onSelectionAction?.([nft])
        }}
        onSelect={selectNft}
        onUnselect={unselectNft}
      />
    </NftsAndFiltersLayout>
  )
}
